import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsb3kxMzE1IiwiYSI6ImNtMm11NzNxZzByNG8yanNna25tMnEzeHcifQ.ZziuaEr21WcrTMfjQf58Ww';

const PlaceFinder = ({ lat1, long1, lat2, long2 }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);  // Reference for the map container
  const mapRef = useRef(null);           // Reference to hold the map instance

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const routeResponse = await axios.get(`http://localhost:3000/api/place`, {
          params: {
            sourceLat: lat1,
            sourceLng: long1,
            destLat: lat2,
            destLng: long2,
          },
        });

        const routeData = routeResponse.data;
        setPlaces(routeData);
      } catch (err) {
        setError('Failed to fetch places');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [lat1, long1, lat2, long2]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Ensure mapContainerRef is properly attached to the DOM before initializing the map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, // This needs to be a valid DOM element
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        center: [(long1 + long2) / 2, (lat1 + lat2) / 2], // Center map between the two points
        zoom: 12,  // Set an initial zoom level
      });
    }

    if (places.length > 0 && mapRef.current) {
      // Add markers for each place
      places.forEach((place) => {
        const { center, text, place_name, properties } = place;

        // Create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'marker';  // You can style this in your CSS for custom icons
        el.style.backgroundImage = 'url(https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = '100%';

        // Create the popup with place info
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>${text}</h3>
          <p><strong>Place Name:</strong> ${place_name}</p>
          <p><strong>Category:</strong> ${properties?.category}</p>
        `);

        // Add marker to the map
        new mapboxgl.Marker(el)
          .setLngLat([center[0], center[1]])  // Set the marker at the place's coordinates
          .setPopup(popup)  // Attach the popup
          .addTo(mapRef.current);  // Add to map

        // Show the popup on hover
        el.addEventListener('mouseenter', () => popup.addTo(mapRef.current));
        el.addEventListener('mouseleave', () => popup.remove());
      });
    }
  }, [places]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Places Along Your Route</h2>
      <div ref={mapContainerRef} style={{
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        width: '100%', 
        height: '100%',
        overflow: 'hidden'  
      }}  />  
    </div>
  );
};

export default PlaceFinder;
