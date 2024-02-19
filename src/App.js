import React, { useState} from 'react';
import './App.css';
import Table from './components/table';
import Loader from './components/Loader/Loader';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = '1feede71a2271463ae7226024f8c03c6';

  const handleSearchChange = (event) => {
    setCity(event.target.value);

  };

  const fetchWeatherData = async (lat, lon) => {
    setIsLoading(true);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    const data = await response.json();
    //const filteredData = data.list.filter((item, index) => index % 8 === 0);
    const filteredData = filterFirstRecordOfEachDay(data.list);
    setWeatherData(filteredData);
   // console.log(data);
    setIsLoading(false);
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try{

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      const cityData = data[0]
      fetchWeatherData(cityData.lat,cityData.lon);
    }catch(error){
     // alert("invalidCityName")
      setWeatherData([])
    }
    };

    const filterFirstRecordOfEachDay = (data) => {
      const filteredData = [];
      const sameDates = {};
      data.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!sameDates[date]) {
          sameDates[date] = true;
          filteredData.push(item);
        }
      });
      return filteredData;
    };
  return (
    <div className="App"  >
      <h1>Weather in {city}</h1>
      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search by city:
          <input type="text" value={city} onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>
             <div style={{display:"flex", flexWrap:"wrap", gap:"16px", margin:"24px", justifyContent:"center" }} >
              {isLoading ? <Loader/> :
              weatherData.map((data,i)=> (
              <Table key={i} data={data} />)
              )}

            </div>
    </div>
  );
}

export default App;