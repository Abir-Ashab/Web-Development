import React from 'react';
import ImageUpload from './Components/ImageUpload'; 
import ImageSearch from './Components/ImageSearch'; 

const App = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Trip Album Image Uploader</h1>
            <ImageUpload /> 
            <h2>Search Images</h2>
            <ImageSearch />
        </div>
    );
};

export default App;
