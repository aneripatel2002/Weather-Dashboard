document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
      getWeatherData(city);
      addToHistory(city);
      document.getElementById('cityInput').value = '';
    }
  });
  
  function getWeatherData(city) {
    const apiKey = 'd2fbc1537d4d3c3dfad692246b76ced7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
  
       
        getForecast(city);
      })
      .catch(error => console.log('Error fetching weather data:', error));
  }
  
  function getForecast(city) {
    const apiKey = 'd2fbc1537d4d3c3dfad692246b76ced7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayForecast(data))
      .catch(error => console.log('Error fetching forecast data:', error));
  }
  
  function displayWeather(data) {
    const { name, weather, main, wind } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
      <div class="weather-card">
        <h2>${name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Weather: ${weather[0].description}</p>
        <img src="${iconUrl}" alt="${weather[0].description}">
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity} %</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
      </div>
    `;
  }
  
  function displayForecast(data) {
    const forecast = document.createElement('div');
    forecast.classList.add('weather-card');
  
    data.list.forEach(item => {
      const { dt_txt, weather, main, wind } = item;
      const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  
      forecast.innerHTML += `
        <div class="forecast">
          <div class="forecast-item">
            <p>Date: ${new Date(dt_txt).toLocaleDateString()}</p>
            <img src="${iconUrl}" alt="${weather[0].description}">
            <p>Temperature: ${main.temp} °C</p>
            <p>Humidity: ${main.humidity} %</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
          </div>
        </div>
      `;
    });
  
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.appendChild(forecast);
  }
  
  function addToHistory(city) {
    const searchHistory = document.getElementById('searchHistory');
    const historyItem = document.createElement('div');
    historyItem.textContent = city;
    historyItem.classList.add('history-item');
    historyItem.addEventListener('click', () => {
      getWeatherData(city);
    });
    searchHistory.appendChild(historyItem);
  }