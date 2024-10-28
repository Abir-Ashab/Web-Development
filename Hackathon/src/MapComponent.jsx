import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline';

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsb3kxMzE1IiwiYSI6ImNtMm11NzNxZzByNG8yanNna25tMnEzeHcifQ.ZziuaEr21WcrTMfjQf58Ww';

const MapComponent = (props) => {
  const {lat1, long1, lat2, long2} = props
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [90.4125, 23.8103], 
        zoom: 8
      });

      map.on('load', async () => {
        const routeResponse = await fetch(`http://localhost:3000/api/route?sourceLat=${lat1}&sourceLng=${long1}&destLat=${lat2}&destLng=${long2}`);
        // 91.8692, 24.8949
        const routeData = await routeResponse.json();

        // Decode polyline geometry to coordinates
        const decodedCoordinates = polyline.decode(routeData.geometry);

        // Add the decoded route to the map
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: decodedCoordinates.map(coord => [coord[1], coord[0]]) // Flip to [lng, lat]
            }
          }
        });
        map.addLayer({
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
      });
      setMap(map);
    };

    if (!map) initializeMap();
  }, [map]);

  return (
    <div 
      id="map-container" 
      style={{
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        width: '100%', 
        height: '100%',
        overflow: 'hidden'  
      }} 
    />
  );
};

export default MapComponent;
