const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = 'faf9183d368df8773c309ebb769c84e9';

const getWeatherForecast = async ({ lat, lon }) => {
    try {
        if (!lat || !lon) {
            throw new Error('Latitude and longitude are required');
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);

        // Handle the response data here
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error('Error in getWeatherForecast:', error);
        throw error;
    }
};

router.post('/getWeather', async (req, res) => {
    try {
        const { lat, lon } = req.body;
        const weatherData = await getWeatherForecast({ lat, lon });
        res.json(weatherData);
    } catch (error) {
        console.error('Error in getWeather route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
