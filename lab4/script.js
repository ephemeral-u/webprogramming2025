let cities = [];

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
    console.log('Обновить всё');
});

document.querySelector('.save').addEventListener('click', () => {
    const city = document.querySelector('.city-input').value.trim();
    
    cities.push({
        id: Date.now().toString(),
        name: city
    });
    
    renderCards();
    document.querySelector('.modal').classList.remove('show');
    document.querySelector('.city-input').value = '';
});

function renderCards() {
    cardsContainer.innerHTML = '';
    
    cities.forEach(city => {
        const card = template.content.cloneNode(true).querySelector('.card');
        card.dataset.id = city.id;
        card.querySelector('.city-name').textContent = city.name;
        
        if (city.id === 'geo') {
            card.querySelector('.delete').style.display = 'none';
        }
        
        card.querySelector('.delete').addEventListener('click', () => {
            cities = cities.filter(c => c.id !== city.id);
            renderCards();
        });
        
        card.querySelector('.refresh-card').addEventListener('click', () => {
            console.log('Обновить город:', city.name);
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
            },
            () => {
                document.querySelector('.modal').classList.add('show');
            }
        );
    } else {
        document.querySelector('.modal').classList.add('show');
    }
}

getLocation();