import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);

  // This effect will call the API when the component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.post('http://localhost:8000/get', {
          mood: 'happy'  // Example mood
        });
        setSongs(response.data); // Set the fetched songs data in the state
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {songs.map((song, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 w-72 h-auto flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-2">{decodeHtmlEntities(song.title)}</h3>
            <img 
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={song.thumbnail} 
              alt={song.title} 
            />
            <p className="text-gray-600 text-sm flex-grow">{decodeHtmlEntities(song.description)}</p>
            <a 
              href={`https://www.youtube.com/watch?v=${song.videoId}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to decode HTML entities (e.g., &#39; -> ')
function decodeHtmlEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

export default YouTubeSongs;
