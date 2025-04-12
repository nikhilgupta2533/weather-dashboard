const express = require('express');
const router = express.Router();
const axios = require('axios');

// Array of major cities for suggestions
const cities = [
  "London", "New York", "Tokyo", "Paris", "Berlin", "Moscow", "Beijing",
  "Dubai", "Singapore", "Sydney", "Toronto", "Mumbai", "São Paulo",
  "Istanbul", "Rome", "Cairo", "Bangkok", "Seoul", "Mexico City",
  "Buenos Aires", "Madrid", "Vienna", "Stockholm", "Amsterdam"
];

// Get weather data by city name
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Basic validation
    if (!city) {
      return res.status(400).json({ error: 'Please enter a city name' });
    }

    const API_KEY = process.env.WEATHER_API_KEY;
    
    // Check if API key exists
    if (!API_KEY) {
      return res.status(500).json({ error: 'Weather API key not found' });
    }

    // Make request to OpenWeatherMap API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log('Fetching weather data from:', url.replace(API_KEY, 'HIDDEN')); // Log the URL (without API key)
    
    const response = await axios.get(url);
    console.log('Weather API response:', response.data); // Log the response

    res.json({
      current: response.data
    });

  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    
    // More specific error handling
    if (error.response) {
      // OpenWeatherMap API error
      if (error.response.status === 404) {
        return res.status(404).json({ error: 'City not found. Please check the city name and try again.' });
      }
      if (error.response.status === 401) {
        return res.status(401).json({ error: 'Invalid API key. Please check your OpenWeatherMap API key.' });
      }
      return res.status(error.response.status).json({ 
        error: error.response.data.message || 'Error from weather service' 
      });
    }
    
    // Network or other errors
    res.status(500).json({
      error: 'Failed to fetch weather data. Please try again later.'
    });
  }
});

// Get city suggestions
router.get('/suggestions/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const suggestions = cities
      .filter(city => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching city suggestions' });
  }
});

module.exports = router; 