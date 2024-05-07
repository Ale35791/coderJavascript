document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'af2edcad30cd43a88d1d1078dae3bfad';
    const weatherContainer = document.getElementById('weatherContainer');
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const errorContainer = document.getElementById('error');
  
    searchButton.addEventListener('click', searchWeather);
  
    function searchWeather() {
      const cityName = cityInput.value.trim();
      if (cityName !== '') {
        fetchWeather(cityName)
          .then(displayWeather)
          .catch(error => {
            console.error('Error al obtener datos del clima:', error);
            showError('La ciudad ingresada no fue encontrada');
          });
      } else {
        showError('Por favor ingrese una ciudad');
      }
    }
  
    async function fetchWeather(cityName) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('La ciudad ingresada no fue encontrada');
      }
      return response.json();
    }
  
    async function displayWeather(weatherData) {
      clearError(); 
      const { name, weather, main } = weatherData;
      const weatherDescription = await translateDescription(weather[0].description); 
      const temperature = main.temp;
      const feelsLike = main.feels_like;
  
      weatherContainer.innerHTML = `
        <h2>Clima en ${name}</h2>
        <p>Descripción: ${weatherDescription}</p>
        <p>Temperatura: ${temperature}°C</p>
        <p>Sensación térmica: ${feelsLike}°C</p>
      `;
    }
    async function translateDescription(description) {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURI(description)}`);
        const data = await response.json();
        return data[0][0][0];
      }
  