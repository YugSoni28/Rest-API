const API_KEY = 'c0a80a51624e46288f5210543261206'; 

// DOM Elements Selection
const locationSelect = document.getElementById('location-select');
const weatherCard = document.getElementById('weather-card');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const errorBox = document.getElementById('error-box');

// Event Listener for interactive dropdown changes
locationSelect.addEventListener('change', function() {
    const selectedCity = locationSelect.value;
    if (selectedCity) {
        fetchWeatherData(selectedCity);
    }
});

/**
 * Fetches data from WeatherAPI and updates the DOM
 * @param {string} city 
 */
function fetchWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok or API key is invalid.');
            }
            return response.json();
        })
        .then(data => {
            // Hide error box if a previous error occurred
            errorBox.style.display = 'none';

            // JS DOM Manipulation to display returned API data
            cityName.textContent = data.location.name;
            temperature.textContent = `${data.current.temp_c}°C`;
            description.textContent = data.current.condition.text;
            
            // Displaying image based on weather icon
            // Note: weatherapi.com icon URLs start with "//", so adding "https:" ensures it loads correctly
            weatherIcon.src = `https:${data.current.condition.icon}`;
            weatherIcon.alt = data.current.condition.text;

            // Make the results visible smoothly
            weatherCard.style.display = 'block';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Hide weather card and show error to user
            weatherCard.style.display = 'none';
            errorBox.textContent = 'Failed to load weather data. Please check your API key.';
            errorBox.style.display = 'block';
        });
}