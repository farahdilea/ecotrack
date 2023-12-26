const express = require('express');
const router = express.Router();
const axios = require('axios');

// Function to get weather map tile URL
function getWeatherMapTileUrl(layer, apiKey) {
  // Use fixed values for zoom, tileX, and tileY
  const zoom = 0;
  const tileX = 0;
  const tileY = 0;

  const apiUrl = `https://tile.openweathermap.org/map/${layer}/${zoom}/${tileX}/${tileY}.png?appid=${apiKey}`;
  return apiUrl;
}

// Route to get weather map tile for a specific layer
router.post('/', async (req, res, next) => {
  try {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'faf9183d368df8773c309ebb769c84e9';

    // Get layer from the request body
    const { layer } = req.body;

    const weatherMapTileUrl = getWeatherMapTileUrl(layer, apiKey);
    res.json({ imageUrl: weatherMapTileUrl });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
