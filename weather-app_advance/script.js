document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDetails = document.getElementById('weatherDetails');
    const weatherBackground = document.getElementById('weather-background');
    const apiKey = '0b90e35115aafae63d2ae348257d076c'; //OpenWeatherMap API key

    weatherDetails.innerHTML = ''; 

    if (city === '') {
        weatherDetails.innerHTML = '<p class="text-white text-center">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found. Please check the name and try again.');
        }

        const data = await response.json();

        // Background image 
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherBackground.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${weatherCondition}')`;

        // Cards Data
        const weatherCards = [
            { title: 'Weather', value: data.weather[0].description, icon: 'fas fa-cloud-sun', class: 'weather' },
            { title: 'Temperature', value: `${data.main.temp}°C`, icon: 'fas fa-thermometer-half', class: 'temperature' },
            { title: 'Feels Like', value: `${data.main.feels_like}°C`, icon: 'fas fa-temperature-low', class: 'feels-like' },
            { title: 'Humidity', value: `${data.main.humidity}%`, icon: 'fas fa-water', class: 'humidity' },
            { title: 'Pressure', value: `${data.main.pressure} hPa`, icon: 'fas fa-tachometer-alt', class: 'pressure' },
            { title: 'Visibility', value: `${data.visibility / 1000} km`, icon: 'fas fa-eye', class: 'visibility' },
            { title: 'Wind Speed', value: `${data.wind.speed} m/s`, icon: 'fas fa-wind', class: 'wind-speed' },
            { title: 'Sunrise', value: new Date(data.sys.sunrise * 1000).toLocaleTimeString(), icon: 'fas fa-sun', class: 'sunrise' },
            { title: 'Sunset', value: new Date(data.sys.sunset * 1000).toLocaleTimeString(), icon: 'fas fa-moon', class: 'sunset' },
        ];

        weatherDetails.innerHTML = weatherCards.map(card => `
            <div class="col-md-3 mb-4">
                <div class="card ${card.class}">
                    <div class="card-body">
                        <i class="${card.icon} icon"></i>
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.value}</p>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        weatherDetails.innerHTML = `<p class="text-danger text-center">${error.message}</p>`;
    }
});
