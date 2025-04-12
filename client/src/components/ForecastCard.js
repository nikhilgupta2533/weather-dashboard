import React from 'react';

function ForecastCard({ forecast }) {
  const date = new Date(forecast.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="forecast-card">
      <h3>{dayName}</h3>
      <p>{monthDay}</p>
      <img 
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt={forecast.weather[0].description}
      />
      <div className="forecast-temp">
        <p>{Math.round(forecast.main.temp)}°C</p>
        <p className="description">{forecast.weather[0].description}</p>
      </div>
      <div className="forecast-details">
        <small>Humidity: {forecast.main.humidity}%</small>
        <small>Wind: {forecast.wind.speed} m/s</small>
      </div>
    </div>
  );
}

export default ForecastCard; 