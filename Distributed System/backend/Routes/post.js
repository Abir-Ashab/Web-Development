const express = require("express"); 
const Post = require("../Models/Post");
const Notification = require("../Models/Notification");
const Minio = require('minio');  // MinIO client
require('dotenv').config();
const multer = require('multer');  // For handling file uploads
const router = express.Router();

// Initialize MinIO client
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ROOT_USER,
    secretKey: process.env.MINIO_ROOT_PASSWORD,
});

// Create a bucket if it doesn't exist
minioClient.bucketExists(process.env.MINIO_BUCKET, (err) => {
    if (err) {
        minioClient.makeBucket(process.env.MINIO_BUCKET, '', (err) => {
            if (err) console.log('Error creating bucket.', err);
            else console.log('Bucket created successfully');
        });
    } else {
        console.log('Bucket already exists');
    }
});

// Multer storage configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new post (either code or file can be uploaded)
router.post("/", upload.single('file'), async (req, res) => {
  const { description, code, userId } = req.body;
  const file = req.file;

  if (!description) {
    return res.status(400).send('Description is required.');
  }

  try {
    let postData = { description, user: userId };

    // Handle the code snippet (if provided)
    if (code) {
      const fileName = `${Date.now()}_post_code.txt`;

      // Upload code as a text file to MinIO
      await minioClient.putObject(process.env.MINIO_BUCKET, fileName, Buffer.from(code), (err, etag) => {
        if (err) {
          return res.status(500).send('Error uploading code to MinIO.');
        }
        postData.code = code;
        postData.fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${fileName}`;
      });
    }

    // Handle file upload (if provided)
    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;

      // Upload the file to MinIO
      await minioClient.putObject(process.env.MINIO_BUCKET, fileName, file.buffer, (err, etag) => {
        if (err) {
          return res.status(500).send('Error uploading file to MinIO.');
        }
        postData.fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${fileName}`;
      });
    }

    // Save the post in MongoDB (either code or file or both)
    const post = new Post(postData);
    await post.save();

    const notification = new Notification({
      message: "New post created",
      postId: post._id,
      user: userId  // Make sure to link the user to the notification
    });
    await notification.save();
    

    // Populate the user field in the post response
    const populatedPost = await Post.findById(post._id).populate("user", "email _id").exec();

    // Return the newly created post
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

// Get the post count (excluding the current user)
router.get("/count", async (req, res) => {
  const { userId } = req.query;
  try {
    // Count posts that don't belong to the current user
    const postCount = await Post.countDocuments({ user: { $ne: userId } });
    res.json({ count: postCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve post count" });
  }
});

// Get all posts (excluding the current user)
router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    // Find posts that don't belong to the current user and populate the user info
    const posts = await Post.find({ user: { $ne: userId } }).populate("user");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve posts" });
  }
});

// Get a specific post by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("user", "email _id");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve post" });
  }
});

// Delete all posts
router.delete("/all", async (req, res) => {
  try {
    const result = await Post.deleteMany({});
    
    if (result.deletedCount > 0) {
      res.json({ message: `${result.deletedCount} posts deleted.` });
    } else {
      res.json({ message: "No posts to delete." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete posts", error });
  }
});

module.exports = router;
