import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('Visakhapatnam');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = '1feede71a2271463ae7226024f8c03c6';

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
      setIsLoading(false);
    };

    fetchWeatherData();
  }, [city]);

  const handleSearchChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
   // fetchWeatherData();
  };

  return (
    <div className="App">
      <h1>Weather in {city}</h1>
      {isLoading && <p>Loading...</p>}
      {weatherData && (
        <div>
          {
          <p>Date: {weatherData.dt}</p>}
        </div>
      )}
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search by city:
          <input type="text" value={city} onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;