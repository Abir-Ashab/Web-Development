const express = require('express');
const cors = require('cors');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const app = express();
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoibmlsb3kxMzE1IiwiYSI6ImNtMm11NzNxZzByNG8yanNna25tMnEzeHcifQ.ZziuaEr21WcrTMfjQf58Ww';

app.use(cors());

const directionsService = mbxDirections({ accessToken: MAPBOX_ACCESS_TOKEN });
const geocodingService = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

const generateHighwayCoordinates = (start, end) => {
    return [
        { latitude: start.latitude, longitude: start.longitude },
        { latitude: (start.latitude + end.latitude) / 2, longitude: (start.longitude + end.longitude) / 2 },
        { latitude: end.latitude, longitude: end.longitude },
    ];
};

app.get('/api/route', async (req, res) => {
    try {
        const { sourceLat, sourceLng, destLat, destLng } = req.query;

        if (!sourceLat || !sourceLng || !destLat || !destLng) {
            return res.status(400).json({ error: 'Please provide source and destination coordinates' });
        }

        const start = { latitude: parseFloat(sourceLat), longitude: parseFloat(sourceLng) };
        const end = { latitude: parseFloat(destLat), longitude: parseFloat(destLng) };

        const highwayCoordinates = generateHighwayCoordinates(start, end);

        console.log('Fetching directions...');
        const response = await directionsService.getDirections({
            profile: 'driving',
            waypoints: highwayCoordinates.map(coord => ({
                coordinates: [coord.longitude, coord.latitude], // Mapbox requires [lng, lat]
            })),
        }).send();

        console.log(response);
        console.log('Directions response:', response.body);

        if (!response.body.routes || response.body.routes.length === 0) {
            return res.status(404).json({ error: 'No routes found' });
        }

        res.json(response.body.routes[0]);
    } catch (err) {
        console.error('Error fetching directions:', err);
        res.status(500).json({ error: 'Error fetching directions' });
    }
});

app.get('/api/place', async (req, res) => {
    try {
        const places = [];
        const { sourceLat, sourceLng, destLat, destLng } = req.query;

        const highwayCoordinates = generateHighwayCoordinates(
            { latitude: parseFloat(sourceLat), longitude: parseFloat(sourceLng) },
            { latitude: parseFloat(destLat), longitude: parseFloat(destLng) }
        );

        for (const coord of highwayCoordinates) {
            console.log(coord.longitude, coord.latitude);
            const response = await geocodingService.forwardGeocode({
                query: 'hotel, restaurant, Bangladesh', 
                proximity: [coord.longitude, coord.latitude],
                limit: 5,
            }).send();

            console.log(response);
            places.push(...response.body.features);
        }

        const uniquePlaces = Array.from(new Set(places.map(place => place.id)))
            .map(id => places.find(place => place.id === id));

        res.json(uniquePlaces);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching places' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
