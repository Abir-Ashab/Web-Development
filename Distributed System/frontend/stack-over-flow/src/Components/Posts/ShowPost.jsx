import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import { useLocation } from "react-router-dom";
import Alert from "../Notification/Alert";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // VSCode-like dark theme
import FetchAndDisplayFile from "./FetchAndDisplayFile";
import Navbar from "../Navbar";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const location = useLocation();
  const { id, flag } = location.state; 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/post", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const fetchFileContent = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl);
      return response.data; 
    } catch (error) {
      console.error("Error fetching file content:", error);
      return "";
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="flex mb-4 space-x-[80%]"> 
        <button onClick={handleCreatePost} className="bg-blue-500 text-white p-2 rounded">
          {showCreatePost ? "Close" : "Create New Post"}
        </button>
        <Alert id={id} flag={flag} />
      </div>
      {showCreatePost && <CreatePost userId={id} />}
      <div className="space-y-4 mt-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-semibold">{post.description}</p>
            {post.code ? (
              <SyntaxHighlighter
                language="javascript" 
                style={vscDarkPlus} 
                className="p-3 mt-2 rounded"
              >
                {post.code}
              </SyntaxHighlighter>
            )
            : (
              <div>
                <FetchAndDisplayFile fileUrl={post.fileUrl} />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">By: {post.user.email}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShowPost;
