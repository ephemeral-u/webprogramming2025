document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Создаем основной контейнер
    const main = document.createElement('main');
    const container = document.createElement('div');
    container.className = 'container';
    
    // Семантический header с заголовком
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Todo List';
    header.appendChild(h1);
    
    // Форма для добавления задач
    const form = document.createElement('form');
    form.id = 'todo-form';
    form.className = 'todo-form';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'todo-input';
    input.placeholder = 'Новая задача...';
    input.required = true;
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'todo-date';
    
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Добавить';
    
    form.append(input, dateInput, addButton);
    
    // Секция фильтров
    const filtersSection = document.createElement('section');
    filtersSection.className = 'filters';
    
    // Группа кнопок фильтрации
    const filterGroup = document.createElement('div');
    filterGroup.className = 'filter-group';
    
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'Все';
    
    const activeBtn = document.createElement('button');
    activeBtn.className = 'filter-btn';
    activeBtn.dataset.filter = 'active';
    activeBtn.textContent = 'Активные';
    
    const completedBtn = document.createElement('button');
    completedBtn.className = 'filter-btn';
    completedBtn.dataset.filter = 'completed';
    completedBtn.textContent = 'Выполненные';
    
    filterGroup.append(allBtn, activeBtn, completedBtn);
    
    // Поле поиска
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-input';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Поиск задач...';
    
    filtersSection.append(filterGroup, searchInput);
    
    // Секция списка задач
    const tasksSection = document.createElement('section');
    tasksSection.className = 'tasks';
    
    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';
    tasksList.className = 'tasks-list';
    
    tasksSection.appendChild(tasksList);
    
    // Собираем всю структуру
    container.append(header, form, filtersSection, tasksSection);
    main.appendChild(container);
    document.body.appendChild(main);
}