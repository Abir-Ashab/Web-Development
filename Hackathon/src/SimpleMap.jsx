import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsb3kxMzE1IiwiYSI6ImNtMm11NzNxZzByNG8yanNna25tMnEzeHcifQ.ZziuaEr21WcrTMfjQf58Ww';

const SimpleMap = () => {
  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map-container', // ID of the HTML element
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.4125, 23.8103], // Center map on Dhaka
      zoom: 8,
    });

    // Add a marker with a custom map icon
    const addMarker = (coords, popupHTML) => {
      const el = document.createElement('div');
      el.className = 'marker'; // Class for marker styling
      el.style.width = '30px'; // Width of the marker
      el.style.height = '30px'; // Height of the marker
      el.style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/a/a8/Map_marker.svg)'; // Map marker image
      el.style.backgroundSize = '100% 100%'; // Size of the image
      el.style.cursor = 'pointer'; // Cursor style on hover

      new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setHTML(popupHTML)) // Popup with information
        .addTo(map);
    };

    // Add a marker at a specific coordinate
    addMarker(
      [90.4125, 23.8103], // Coordinates for Dhaka
      '<h3>Dhaka</h3><p>Capital of Bangladesh</p>' // Popup content
    );

    // Optional: Clean up on component unmount
    return () => map.remove();
  }, []);

  return (
    <div
      id="map-container"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default SimpleMap;
