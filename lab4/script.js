let cities = [];

document.querySelector('.add-city').addEventListener('click', () => {
    document.querySelector('.modal-title').textContent = 'Добавить город';
    document.querySelector('.modal').classList.add('show');
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').classList.remove('show');
    document.querySelector('.city-input').value = '';
    document.querySelector('.error').textContent = '';
});

document.querySelector('.refresh-all').addEventListener('click', () => {
    console.log('Обновить всё');
});

document.querySelector('.save').addEventListener('click', () => {
    const city = document.querySelector('.city-input').value.trim();
    if (!city) {
        document.querySelector('.error').textContent = 'Введите название города';
        return;
    }
    
    cities.push({
        id: Date.now().toString(),
        name: city
    });
    
    console.log('Города:', cities);
    document.querySelector('.modal').classList.remove('show');
    document.querySelector('.city-input').value = '';
    document.querySelector('.error').textContent = '';
});

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
                console.log('Геолокация получена');
            },
            () => {
                document.querySelector('.modal-title').textContent = 'Введите ваш город';
                document.querySelector('.modal').classList.add('show');
            }
        );
    } else {
        document.querySelector('.modal-title').textContent = 'Введите ваш город';
        document.querySelector('.modal').classList.add('show');
    }
}

getLocation();