import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setError('');
    setWeatherData(null);
    
    try {
      console.log('Fetching weather for:', city);
      const response = await fetch(`http://localhost:5000/api/weather/${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setWeatherData(data.current);
      
      // Update recent searches
      const updatedSearches = [city, ...recentSearches.filter(s => s !== city)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch weather data. Please check if the server is running.');
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`App ${isDark ? 'dark' : ''}`}>
      <button 
        onClick={toggleTheme}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        {isDark ? '🌞 Light' : '🌙 Dark'}
      </button>

      <h1>Weather Dashboard</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Search Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <img 
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
          <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => {
                setCity(search);
                handleSubmit({ preventDefault: () => {} });
              }}
            >
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App; 