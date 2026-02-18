document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Создаем основной контейнер
    const main = document.createElement('main');
    const container = document.createElement('div');
    container.className = 'container';
    
    // Применяем стили через JavaScript
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';
    container.style.padding = '20px';
    container.style.backgroundColor = '#ffffff';
    container.style.borderRadius = '12px';
    container.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    
    // Семантический header с заголовком
    const header = document.createElement('header');
    header.style.textAlign = 'center';
    header.style.marginBottom = '24px';
    
    const h1 = document.createElement('h1');
    h1.textContent = 'Todo List';
    h1.style.color = '#333';
    h1.style.fontSize = '2rem';
    h1.style.margin = '0';
    header.appendChild(h1);
    
    // Форма для добавления задач
    const form = document.createElement('form');
    form.id = 'todo-form';
    form.className = 'todo-form';
    form.style.display = 'flex';
    form.style.gap = '12px';
    form.style.marginBottom = '24px';
    form.style.flexWrap = 'wrap';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'todo-input';
    input.placeholder = 'Новая задача...';
    input.required = true;
    // Стили через JavaScript
    input.style.flex = '2';
    input.style.minWidth = '200px';
    input.style.padding = '12px';
    input.style.border = '2px solid #e0e0e0';
    input.style.borderRadius = '8px';
    input.style.fontSize = '16px';
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'todo-date';
    dateInput.style.flex = '1';
    dateInput.style.minWidth = '140px';
    dateInput.style.padding = '12px';
    dateInput.style.border = '2px solid #e0e0e0';
    dateInput.style.borderRadius = '8px';
    dateInput.style.fontSize = '16px';
    
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Добавить';
    addButton.style.padding = '12px 24px';
    addButton.style.backgroundColor = '#4CAF50';
    addButton.style.color = 'white';
    addButton.style.border = 'none';
    addButton.style.borderRadius = '8px';
    addButton.style.fontSize = '16px';
    addButton.style.cursor = 'pointer';
    
    form.append(input, dateInput, addButton);
    
    // Секция фильтров
    const filtersSection = document.createElement('section');
    filtersSection.className = 'filters';
    filtersSection.style.display = 'flex';
    filtersSection.style.gap = '12px';
    filtersSection.style.marginBottom = '24px';
    filtersSection.style.flexWrap = 'wrap';
    filtersSection.style.justifyContent = 'space-between';
    filtersSection.style.alignItems = 'center';
    
    // Группа кнопок фильтрации
    const filterGroup = document.createElement('div');
    filterGroup.className = 'filter-group';
    filterGroup.style.display = 'flex';
    filterGroup.style.gap = '8px';
    filterGroup.style.flexWrap = 'wrap';
    
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'Все';
    allBtn.style.padding = '8px 16px';
    allBtn.style.backgroundColor = '#4CAF50';
    allBtn.style.color = 'white';
    allBtn.style.border = 'none';
    allBtn.style.borderRadius = '20px';
    allBtn.style.cursor = 'pointer';
    
    const activeBtn = document.createElement('button');
    activeBtn.className = 'filter-btn';
    activeBtn.dataset.filter = 'active';
    activeBtn.textContent = 'Активные';
    activeBtn.style.padding = '8px 16px';
    activeBtn.style.backgroundColor = '#f0f0f0';
    activeBtn.style.color = '#333';
    activeBtn.style.border = 'none';
    activeBtn.style.borderRadius = '20px';
    activeBtn.style.cursor = 'pointer';
    
    const completedBtn = document.createElement('button');
    completedBtn.className = 'filter-btn';
    completedBtn.dataset.filter = 'completed';
    completedBtn.textContent = 'Выполненные';
    completedBtn.style.padding = '8px 16px';
    completedBtn.style.backgroundColor = '#f0f0f0';
    completedBtn.style.color = '#333';
    completedBtn.style.border = 'none';
    completedBtn.style.borderRadius = '20px';
    completedBtn.style.cursor = 'pointer';
    
    filterGroup.append(allBtn, activeBtn, completedBtn);
    
    // Поле поиска
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-input';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Поиск задач...';
    searchInput.style.flex = '1';
    searchInput.style.minWidth = '200px';
    searchInput.style.padding = '8px 12px';
    searchInput.style.border = '2px solid #e0e0e0';
    searchInput.style.borderRadius = '20px';
    searchInput.style.fontSize = '14px';
    
    filtersSection.append(filterGroup, searchInput);
    
    // Секция списка задач
    const tasksSection = document.createElement('section');
    tasksSection.className = 'tasks';
    
    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';
    tasksList.className = 'tasks-list';
    tasksList.style.listStyle = 'none';
    tasksList.style.padding = '0';
    tasksList.style.margin = '0';
    
    tasksSection.appendChild(tasksList);
    
    // Собираем всю структуру
    container.append(header, form, filtersSection, tasksSection);
    main.appendChild(container);
    document.body.appendChild(main);
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    dateInput.value = new Date().toISOString().split('T')[0];
}