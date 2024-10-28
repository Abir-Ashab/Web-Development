import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsb3kxMzE1IiwiYSI6ImNtMm11NzNxZzByNG8yanNna25tMnEzeHcifQ.ZziuaEr21WcrTMfjQf58Ww';

const IntegratedMap = (props) => {
  const { lat1, long1, lat2, long2 } = props;
  const [places, setPlaces] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);  
  const mapRef = useRef(null);           

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
      // Initialize the map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, 
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: [(long1 + long2) / 2, (lat1 + lat2) / 2],
        zoom: 12,  
      });
      
      const loadRoute = async () => {
        const routeResponse = await fetch(`http://localhost:3000/api/route?sourceLat=${lat1}&sourceLng=${long1}&destLat=${lat2}&destLng=${long2}`);
        const routeData = await routeResponse.json();
        
        // Update distance and duration
        setDistance(routeData.distance);
        setDuration(routeData.duration);

        const decodedCoordinates = polyline.decode(routeData.geometry);

        mapRef.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: decodedCoordinates.map(coord => [coord[1], coord[0]]) 
            }
          }
        });
        mapRef.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#FF0000',
            'line-width': 5
          }
        });
      };

      loadRoute();
    }

    if (places.length > 0 && mapRef.current) {
      places.forEach((place) => {
        const { center, text, place_name, properties } = place;

        const el = document.createElement('div');
        el.className = 'marker';  
        el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-8a3 3 0 116 0 3 3 0 01-6 0z" clip-rule="evenodd" /></svg>';
        
        // Create the popup with place info
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>${text}</h3>
          <p><strong>Place Name:</strong> ${place_name}</p>
          <p><strong>Category:</strong> ${properties?.category}</p>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([center[0], center[1]])  
          .setPopup(popup) 
          .addTo(mapRef.current);  

        el.addEventListener('mouseenter', () => popup.addTo(mapRef.current));
        el.addEventListener('mouseleave', () => popup.remove());
      });
    }
  }, [places]);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative h-screen w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Places Along Your Route</h2>
      <p className="text-center text-lg mb-4">Distance: {distance ? `${(distance / 1000).toFixed(2)} km` : 'Loading...'} | Duration: {duration ? `${(duration / 60).toFixed(2)} min` : 'Loading...'}</p>
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />  
    </div>
  );
};

export default IntegratedMap;
