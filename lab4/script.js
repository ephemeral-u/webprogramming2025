let modalOpen = false;

document.querySelector('.add-city').addEventListener('click', () => {
    document.querySelector('.modal').classList.add('show');
    modalOpen = true;
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').classList.remove('show');
    modalOpen = false;
    document.querySelector('.city-input').value = '';
});

document.querySelector('.refresh-all').addEventListener('click', () => {
    console.log('Обновить всё');
});

document.querySelector('.save').addEventListener('click', () => {
    const city = document.querySelector('.city-input').value.trim();
    console.log('Город:', city);
    document.querySelector('.modal').classList.remove('show');
    document.querySelector('.city-input').value = '';
});