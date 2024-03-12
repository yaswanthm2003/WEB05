function getWeather() {
    const locationInput = document.getElementById('location');
    const locationName = locationInput.value.trim();

    if (locationName === '') {
        alert('Please enter a location.');
        return;
    }

    const apiKey = '62648262263caaa2972463dc988bf2bb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please check the console for details.');
        });
}

function updateWeather(data) {
    console.log('Weather data:', data);

    const locationName = document.getElementById('location-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const resultDiv = document.getElementById('result');

    if (data.cod === '404') {
        console.error('City not found:', data.message);
        alert('City not found. Please enter a valid location.');
        return;
    }

    locationName.textContent = data.name + ', ' + data.sys.country;
    temperature.textContent = 'Temperature: ' + data.main.temp + '°C';
    weatherDescription.textContent = 'Weather: ' + data.weather[0].description;

    resultDiv.classList.remove('hidden');
}
