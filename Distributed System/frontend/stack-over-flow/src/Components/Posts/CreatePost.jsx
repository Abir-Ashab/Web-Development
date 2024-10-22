import React, { useState } from "react";
import axios from "axios";

const CreatePost = (props) => {
  const [description, setDescription] = useState("");  // State for description
  const [code, setCode] = useState("");  // State for code
  const [file, setFile] = useState(null);  // State for file
  const [message, setMessage] = useState("");
  const { userId } = props;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Update file state when a file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to handle both code and file
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", description);
    
    if (code) {
      formData.append("code", code);  // Add code if provided
    }
    
    if (file) {
      formData.append("file", file);  // Add file if provided
    }

    try {
      const response = await axios.post("http://localhost:5000/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status === 201) {
        setMessage("Post created successfully!");
        setDescription(""); 
        setCode(""); 
        setFile(null);  // Reset file input
      } else {
        setMessage("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error); 
      setMessage("An error occurred while creating the post");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Description field */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write the description here..."
          required
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
        />

        {/* Code field */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here (if any)..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
        />

        {/* File field */}
        <input 
          type="file" 
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Post
        </button>
      </form>

      {/* Display message after submission */}
      {message && (
        <p className={`mt-4 text-sm ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreatePost;
