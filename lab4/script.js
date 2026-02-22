let cities = [];
const API_KEY = 'e20e6bb8-7b4e-410a-bc89-12cc1104ab4a'; 
const GEO_KEY = '1dd631c0-a5f8-426e-bc6b-3642ab2e885d';  
const template = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards');

document.querySelector('.add-city').addEventListener('click', () => {
    document.querySelector('.modal').classList.add('show');
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').classList.remove('show');
    document.querySelector('.city-input').value = '';
});

document.querySelector('.refresh-all').addEventListener('click', () => {
    cities.forEach(city => loadWeather(city.id));
});

document.querySelector('.save').addEventListener('click', async () => {
    const city = document.querySelector('.city-input').value.trim();
    const newId = Date.now().toString();  
    cities.push({id: newId, name: city, weatherData: null});
    renderCards();
    await loadWeather(newId); 
    document.querySelector('.modal').classList.remove('show');
    document.querySelector('.city-input').value = '';
});

function renderCards() {
    cardsContainer.innerHTML = '';
    
    cities.forEach(city => {
        const card = template.content.cloneNode(true).querySelector('.card');
        card.dataset.id = city.id;
        card.querySelector('.city-name').textContent = city.name;
        if (city.weatherData) {
            displayWeatherOnCard(card, city.weatherData);
            card.querySelector('.update-time').textContent = `обновлено: ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        }
        if (city.id === 'geo') {
            card.querySelector('.delete').style.display = 'none';
        }
        
        card.querySelector('.delete').addEventListener('click', () => {
            cities = cities.filter(c => c.id !== city.id);
            renderCards();
        });
        
        card.querySelector('.refresh-card').addEventListener('click', () => {
            loadWeather(city.id);
        });
        
        cardsContainer.appendChild(card);
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                cities.unshift({
                    id: 'geo',
                    name: 'Текущее местоположение',
                    coords: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                });
                renderCards();
                loadWeather('geo');
            },
            () => {
                document.querySelector('.modal').classList.add('show');
            }
        );
    } else {
        document.querySelector('.modal').classList.add('show');
    }
}

async function loadWeather(cityId) {
    const city = cities.find(c => c.id === cityId);
    if (!city) return;
    
    const card = document.querySelector(`[data-id="${cityId}"]`);
    if (!card) return;
    
    card.classList.add('loading');
    card.querySelector('.card-error').textContent = '';
    try {
        let url;
        let lat, lon;
        if (city.id === 'geo') {
            lat = city.coords.lat;
            lon = city.coords.lon;
        } else {
            const geoUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${GEO_KEY}&geocode=${city.name}&format=json`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
            
            const featureMember = geoData.response.GeoObjectCollection.featureMember;
            if (!featureMember || featureMember.length === 0) {
                throw new Error('Город не найден');
            }
            
            const pos = featureMember[0].GeoObject.Point.pos.split(' ');
            lon = pos[0];
            lat = pos[1];
        }
        const options = {
            headers: {
                'X-Yandex-Weather-Key': API_KEY  
            }
        };
        url = `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&lang=ru_RU&limit=3`;
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки погоды');
        }
        
        const data = await response.json();
        
        displayWeatherOnCard(card, data);
        card.querySelector('.update-time').textContent = `обновлено: ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        city.weatherData = data;
    } catch (error) {
        console.error(error);
        card.querySelector('.card-error').textContent = error.message;
    } finally {
        card.classList.remove('loading');
    }
}

function translateCondition(code) {
    const conditions = {
        'clear': 'ясно',
        'partly-cloudy': 'малооблачно',
        'cloudy': 'облачно',
        'overcast': 'пасмурно',
        'drizzle': 'морось',
        'light-rain': 'небольшой дождь',
        'rain': 'дождь',
        'moderate-rain': 'умеренный дождь',
        'heavy-rain': 'сильный дождь',
        'showers': 'ливень',
        'wet-snow': 'дождь со снегом',
        'light-snow': 'небольшой снег',
        'snow': 'снег',
        'snow-showers': 'снегопад',
        'hail': 'град',
        'thunderstorm': 'гроза',
        'thunderstorm-with-rain': 'дождь с грозой'
    };
    return conditions[code] || code;
}
function displayWeatherOnCard(card, data) {
    const weatherList = card.querySelector('.weather-list');
    weatherList.innerHTML = '';
    
    const fact = data.fact;
    const todayItem = document.createElement('div');
    todayItem.className = 'weather-item';
    todayItem.innerHTML = `
        <span>Сегодня</span>
        <span>${fact.temp}°C</span>
        <span>${translateCondition(fact.condition)}</span>
    `;
    weatherList.appendChild(todayItem);
    
    if (data.forecasts && data.forecasts.length > 1) {
        data.forecasts.slice(1, 3).forEach((day, index) => {
            const dayName = index === 0 ? 'Завтра' : new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            const dayPart = day.parts.day_short || day.parts.day;
            
            const item = document.createElement('div');
            item.className = 'weather-item';
            item.innerHTML = `
                <span>${dayName}</span>
                <span>${dayPart.temp}°C</span>
                <span>${translateCondition(dayPart.condition)}</span>
            `;
            weatherList.appendChild(item);
        });
    }
}
function saveToLocalStorage() {
    const citiesForStorage = cities.map(city => ({
        id: city.id,
        name: city.name,
        coords: city.coords,
        weatherData: city.weatherData
    }));
    localStorage.setItem('weatherCities', JSON.stringify(citiesForStorage));
}
getLocation();