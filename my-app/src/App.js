import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=21458bbee92c9a511f743f9d5c9f5295`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feel">
              {data.main ? (
                <p className="bold">
                  {Math.round(data.main.feels_like - 273.15)}°C
                </p>
              ) : null}
              <img
                src="https://img.icons8.com/external-justicon-lineal-justicon/64/000000/external-high-temperature-weather-justicon-lineal-justicon.png"
                height="30px"
              />
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{Math.round(data.main.humidity)}°C</p>
              ) : null}
              <img
                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-humidity-weather-those-icons-lineal-those-icons.png"
                height="30px"
              />
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <img
                src="https://img.icons8.com/ios/50/000000/speed.png"
                height="30px"
              />
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
