import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [album, setAlbum] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('album', album);
        
        // Log FormData contents
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const response = await axios.post('http://localhost:3000/upload', formData);
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album Name" />
            <button type="submit">Upload</button>
        </form>
    );
};
export default ImageUpload;
