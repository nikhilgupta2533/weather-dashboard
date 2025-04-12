import React from 'react';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-info">
        <div className="temperature">
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
        </div>
        <div className="weather-details">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="additional-info">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Pressure: {weather.main.pressure} hPa</p>
      </div>
    </div>
  );
}

export default WeatherCard; 