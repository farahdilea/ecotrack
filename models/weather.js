// weather_controller.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.post('/get-current-weather', async (req, res) => {
  const apiKey = '0d3f01224b3eda10dde97d5b23118a73';

  try {
    const city = req.body.city;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required in the request body' });
    }

    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
      },
    });

    if (response.status === 200) {
      const weatherData = response.data;
      // Process the weather data as needed
      res.json(weatherData);
    } else {
      console.error(`API request failed with status code ${response.status}`);
      res.status(response.status).json({ error: 'API request failed' });
    }
  } catch (error) {
    console.error('Error making API request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/get-forecast', async (req, res) => {
  const apiKey = '0d3f01224b3eda10dde97d5b23118a73';

  try {
    const city = req.body.city;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required in the request body' });
    }

    const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
      },
    });

    if (response.status === 200) {
      const forecastData = response.data;
      // Process the forecast data as needed
      res.json(forecastData);
    } else {
      console.error(`API request failed with status code ${response.status}`);
      res.status(response.status).json({ error: 'API request failed' });
    }
  } catch (error) {
    console.error('Error making API request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
