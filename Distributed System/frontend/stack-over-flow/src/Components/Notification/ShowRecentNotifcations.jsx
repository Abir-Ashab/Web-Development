import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NotificationAlert = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [newNotification, setNewNotification] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state; 
  
  const handleBack = () => {
    navigate("/post", { state: { id, flag: true } });
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // console.log("ShowNotification : ", id);  
        const response = await axios.get("http://localhost:5000/notification");
        console.log(response.length);
        
        const filteredNotifications = response.data.filter((notification) => notification.user._id !== id);
        console.log(filteredNotifications.length);
        const lastSevenDaysNotifications = filterLastSevenDays(filteredNotifications);
        console.log(lastSevenDaysNotifications);
        setNotifications(lastSevenDaysNotifications);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();

    const interval = setInterval(async () => {
      const response = await axios.get("http://localhost:5000/notification");
      const lastSevenDaysNotifications = filterLastSevenDays(response.data);

      if (lastSevenDaysNotifications.length > notifications.length) {
        setNewNotification(true);  
        setNotifications(lastSevenDaysNotifications); 
      }
    }, 10000); 

    return () => clearInterval(interval);
  }, [notifications]);

  const fetchPostById = async (postId) => {
    setLoading(true); 
    try {
      const response = await axios.get(`http://localhost:5000/post/${postId}`);
      setSelectedPost(response.data); 
    } catch (error) {
      console.error("Error fetching post", error);
    } finally {
      setLoading(false); 
    }
  };

  const filterLastSevenDays = (notifications) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return notifications.filter(notification => new Date(notification.createdAt) >= sevenDaysAgo);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };


  return (
    <div>
      {newNotification && (
        <div className="bg-yellow-500 text-white p-2 rounded-lg mb-4">
          New post created! Check out the latest notifications.
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
        <h2 className="text-xl font-semibold">Recent Notifications (Last 7 days)</h2>
        {notifications.length > 0 ? (
          notifications.map((notification) => (  
            <div key={notification._id} className="my-2 flex space-x-5">
              <p className="text text-gray-500">
                Created at: {formatTime(notification.createdAt)}
              </p>
              <button
                onClick={() => fetchPostById(notification.postId)} 
                className="text-blue-500 underline"
              >
                View Post
              </button>
            </div>
          ))
        ) : (
          <p>No new notifications</p>
        )}

        {loading ? (
          <p>Loading post...</p>
        ) : selectedPost ? (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow-lg">
            <p><strong>{selectedPost.description}</strong> </p>
            {selectedPost.code && (
              <pre className="bg-gray-200 p-3 mt-2 rounded">
                <code>{selectedPost.code}</code>
              </pre>
            )}
            {selectedPost.fileUrl && (
                <a href={`${selectedPost.fileUrl}`} download className="text-blue-500 underline">
                  Download File
                </a>
            )}
            <p className="text-sm text-gray-500 mt-2">By: {selectedPost.user.email}</p>
          </div>
        ) : null}
      </div>

      <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Back
      </button>
    </div>
  );
};

export default NotificationAlert;
