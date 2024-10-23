import React, { useState } from 'react';

const HoverImage = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null, rrs: null });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const generateRandomCoordinates = () => {
    const randomLat = (Math.random() * 180 - 90).toFixed(6); 
    const randomLon = (Math.random() * 360 - 180).toFixed(6); 
    const randomRrs = (Math.random() * (1e-2 - 1e-5) + 1e-5).toExponential(2); 
    return { lat: randomLat, lon: randomLon, rrs: randomRrs };
  };

  const handleMouseMove = (e) => {
    const newCoordinates = generateRandomCoordinates();
    setCoordinates(newCoordinates);
    
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    setMousePosition({ x, y });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <h2>Hover over the image to see random latitude, longitude, and Rrs</h2>
      <img
        src="./image.png"  // Path to your image
        alt="Chlorophyll-A Map"
        style={{ maxWidth: '100%', cursor: 'pointer' }}
        onMouseMove={handleMouseMove} 
      />
      {coordinates.lat && coordinates.lon && coordinates.rrs && (
        <div
          style={{
            position: 'absolute',
            top: mousePosition.y + 10, 
            left: mousePosition.x + 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            pointerEvents: 'none', 
            fontSize: '12px',
          }}
        >
          <p style={{ margin: 0 }}>Lat: {coordinates.lat}</p>
          <p style={{ margin: 0 }}>Lon: {coordinates.lon}</p>
          <p style={{ margin: 0 }}>Rrs: {coordinates.rrs}</p>
        </div>
      )}
    </div>
  );
};

export default HoverImage;
