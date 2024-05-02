const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())


// Define a route to handle GET requests for posts
app.get('/blog', async (req, res) => {
  try {
    const posts = await prisma.blog.findMany({
      include: {
        tags: true
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/blog', async (req, res) => {
  try {
    const { title, image, category, author, authorPic, publishedDate, readingTime, content, tags } = req.body;

    // Create the blog
    const blog = await prisma.blog.create({
      data: {
        title,
        image,
        category,
        author,
        authorPic,
        publishedDate,
        readingTime,
        content,
        tags: {
          // Create tags if they don't exist and associate them with the blog
          create: tags.map(tag => ({
            name: tag
          }))
        }
      },
      // Include the associated tags in the response
      include: {
        tags: true
      }
    });

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/blog/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id
      },
      include: {
        tags: true // Include the associated tags in the response
      }

    });
    if (blog) {
      res.json(blog); // Send the found blog post
    } else {
      res.status(404).json({ error: 'Blog post not found' }); // Send 404 if blog post is not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }); // Send 500 if there's an error
  }
});
// PUT request to update an existing blog post

// PUT request to update an existing blog post
app.put('/blog/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, image, category, author, authorPic, publishedDate, readingTime, content, tags } = req.body;
  
  try {
    // Find the existing blog post by ID
    const existingBlog = await prisma.blog.findUnique({
      where: {
        id: id
      },
      include: {
        tags: true
      }
    });

    // If the blog post doesn't exist, return a 404 error
    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Update the blog post with the new data
    const updatedBlog = await prisma.blog.update({
      where: {
        id: id
      },
      data: {
        title,
        image,
        category,
        author,
        authorPic,
        publishedDate,
        readingTime,
        content,
        tags: {
          // Create tags if they don't exist and associate them with the blog
          create: tags.map(tag => ({
            name: tag
          }))
        }
      },
      include: {
        tags: true
      }
    });

    // Return the updated blog post
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DELETE request to delete a blog post
app.delete('/blog/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Find the existing blog post by ID
    const existingBlog = await prisma.blog.findUnique({
      where: {
        id: id
      }
    });

    // If the blog post doesn't exist, return a 404 error
    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Delete the blog post
    await prisma.blog.delete({
      where: {
        id: id
      }
    });

    // Return success message
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});