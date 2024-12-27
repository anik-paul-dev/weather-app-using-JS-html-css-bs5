document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDetails = document.getElementById('weatherDetails');
    const apiKey = '0b90e35115aafae63d2ae348257d076c'; // Replace with your actual API key

    // Clear previous weather details
    weatherDetails.innerHTML = '';

    if (city === '') {
        weatherDetails.innerHTML = '<p class="text-danger">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the name and try again.');
            }
            throw new Error('Something went wrong. Please try again later.');
        }

        const data = await response.json();

        // Display weather details
        weatherDetails.innerHTML = `
            <div class="card mx-auto" style="max-width: 400px;">
                <div class="card-body">
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <h4>${data.weather[0].description.toUpperCase()}</h4>
                    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                    <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                </div>
            </div>
        `;
    } catch (error) {
        weatherDetails.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
});
