document.addEventListener('DOMContentLoaded', () => {
    createAppStructure();
    
    const taskManager = new TaskManager();
    
    const todoUI = new TodoUI(taskManager);
});

function createAppStructure() {
    const main = document.createElement('main');
    const container = document.createElement('div');
    container.className = 'container';
    
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Todo List';
    header.appendChild(h1);
    
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
    
    const filtersSection = document.createElement('section');
    filtersSection.className = 'filters';
    
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
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-input';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Поиск задач...';
    
    filtersSection.append(filterGroup, searchInput);
    
    const tasksSection = document.createElement('section');
    tasksSection.className = 'tasks';
    
    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';
    tasksList.className = 'tasks-list';
    
    tasksSection.appendChild(tasksList);
    
    container.append(header, form, filtersSection, tasksSection);
    main.appendChild(container);
    document.body.appendChild(main);
    
    dateInput.value = new Date().toISOString().split('T')[0];
}

class TaskManager {
}

class TodoUI {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.tasksList = document.getElementById('tasks-list');
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.dateInput = document.getElementById('todo-date');
        
        this.render();
    }
    
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = task.completed;
        
        const content = document.createElement('div');
        content.className = 'todo-content';
        
        const title = document.createElement('span');
        title.className = `todo-title ${task.completed ? 'completed' : ''}`;
        title.textContent = task.title;
        
        const date = document.createElement('span');
        date.className = 'todo-date';
        date.textContent = new Date(task.date).toLocaleDateString('ru-RU');
        
        content.append(title, date);
        
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '✎';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        
        actions.append(editBtn, deleteBtn);
        
        li.append(checkbox, content, actions);
        
        return li;
    }
    
    render() {
        let tasks = this.taskManager.getFilteredTasks(
            this.currentFilter, 
            this.searchQuery
        );
        
        tasks = this.taskManager.sortTasksByDate(tasks, true);
        
        this.tasksList.innerHTML = '';
        
        if (tasks.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Задач пока нет';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '20px';
            emptyMessage.style.color = '#999';
            this.tasksList.appendChild(emptyMessage);
            return;
        }
        
        tasks.forEach(task => {
            this.tasksList.appendChild(this.createTaskElement(task));
        });
    }
}