import React from 'react';

function SearchHistory({ history, onSelectCity }) {
  if (!history.length) return null;

  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      <ul className="history-list">
        {history.map((city, index) => (
          <li 
            key={index} 
            className="history-item"
            onClick={() => onSelectCity(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory; 