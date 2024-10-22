import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Alert = (props) => {
  const [newPostsCount, setNewPostsCount] = useState(0); 
  const [lastChecked, setLastChecked] = useState(0); 
  const [show, setShow] = useState(false); 
  const [notification, setNotification] = useState(false); 
  const navigate = useNavigate();
  const { id, flag } = props;  
  const fetchPostCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/post");
      
      // Filter posts that don't belong to the current user
      const filteredPosts = response.data.filter((post) => post.user._id !== id);
      
      // Count new posts
      const postCount = filteredPosts.length;
      
      // Update the new posts count only if it exceeds the last checked count
      if (lastChecked > 0) {
        setNewPostsCount(postCount - lastChecked);
      } else {
        setNewPostsCount(postCount);
      }
    } catch (error) {
      console.error("Error fetching post count:", error);
    }
  };

  // Use useEffect to fetch post count on mount
  useEffect(() => {
    fetchPostCount();
    const interval = setInterval(fetchPostCount, 10000);  // Reduced polling frequency to every 10 seconds
    return () => clearInterval(interval);  // Clean up interval on unmount
  }, [lastChecked]);  // Add lastChecked to dependencies to recalculate when it changes

  // Handle notification click
  const handleNotificationClick = async () => {
    try {
      const response = await axios.get("http://localhost:5000/post/count?userId=" + id);
      const postCount = response.data.count;

      // Set the last checked count to the current post count
      setLastChecked(postCount);

      // Hide notification count
      setShow(true);
      setNewPostsCount(0);  // Reset the notification count after click
    } catch (error) {
      console.error("Error fetching post count:", error);
    }
  };

  // Navigate to the notification page
  const handleNotification = () => {
    setNotification(!notification);
    navigate("/notification", { state: { id } });  // Navigates to the notification page
  };

  return (
    <div className="relative">
      <button onClick={() => { handleNotification(); handleNotificationClick(); }} className="relative">
        <FontAwesomeIcon icon={faBell} size="3x" /> 
        {/* Show notification badge only if there are new posts and show is false */}
        {newPostsCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
            {newPostsCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default Alert;
