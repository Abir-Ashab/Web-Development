const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const PORT = 8000;
app.use(cors())

// YouTube Data API key
const YOUTUBE_API_KEY = 'AIzaSyBnEDS6HnY98qOA5I0OYw8U-eIWmjaYCRY';

// Middleware to parse JSON
app.use(express.json());

// Route to get songs based on mood
app.post('/get', async (req, res) => {
    const { mood } = req.body;

    // Define search query based on mood
    const searchQuery = `songs for ${mood} mood`;

    try {
        // Call YouTube Data API
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: searchQuery,
                type: 'video',
                maxResults: 10,
                key: YOUTUBE_API_KEY
            }
        });

        // Extract video information
        const videos = response.data.items.map(item => ({
            title: item.snippet.title,
            description: item.snippet.description,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url
        }));

        // Send the list of videos as a response
        res.json(videos);

    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Error fetching songs based on mood' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
