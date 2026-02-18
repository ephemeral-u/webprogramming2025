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

    const sortGroup = document.createElement('div');
    sortGroup.className = 'sort-group';
    
    const sortLabel = document.createElement('label');
    sortLabel.htmlFor = 'sort-select';
    sortLabel.textContent = 'Сортировать по дате:';
    sortLabel.style.marginRight = '8px';
    
    const sortSelect = document.createElement('select');
    sortSelect.id = 'sort-select';
    sortSelect.className = 'sort-select';
    sortSelect.style.padding = '8px';
    sortSelect.style.borderRadius = '4px';
    sortSelect.style.border = '2px solid #e0e0e0';
    
    const optionAsc = document.createElement('option');
    optionAsc.value = 'asc';
    optionAsc.textContent = 'Сначала старые';
    
    const optionDesc = document.createElement('option');
    optionDesc.value = 'desc';
    optionDesc.textContent = 'Сначала новые';
    
    sortSelect.append(optionAsc, optionDesc);
    sortGroup.append(sortLabel, sortSelect);
    
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
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }
    
    loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        } else {
            this.tasks = [
                {
                    id: Date.now() - 1000000,
                    title: 'Изучить DOM API',
                    date: new Date().toISOString().split('T')[0],
                    completed: false
                },
                {
                    id: Date.now() - 2000000,
                    title: 'Сдать лабораторную работу',
                    date: new Date().toISOString().split('T')[0],
                    completed: true
                },
                {
                    id: Date.now() - 3000000,
                    title: 'Посмотреть лекцию по JavaScript',
                    date: new Date().toISOString().split('T')[0],
                    completed: false
                }
            ];
            this.saveTasks();
        }
    }
    
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    addTask(title, date) {
        const newTask = {
            id: Date.now(),
            title: title,
            date: date || new Date().toISOString().split('T')[0],
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }
    
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }
    
    updateTask(id, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
            this.saveTasks();
        }
    }
    
    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }
    
    getFilteredTasks(filter, searchQuery = '') {
        let filtered = [...this.tasks];
        
        // Фильтр по статусу
        if (filter === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }
        
        // Фильтр по поиску
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    }
    
    sortTasksByDate(tasks, ascending = true) {
        return tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return ascending ? dateA - dateB : dateB - dateA;
        });
    }
    
    reorderTasks(newOrder) {
        this.tasks = newOrder;
        this.saveTasks();
    }

    sortTasksByDate(tasks, ascending = true) {
        return tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return ascending ? dateA - dateB : dateB - dateA;
        });
    }
}

class TodoUI {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.sortOrder = 'asc';
        this.tasksList = document.getElementById('tasks-list');
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.dateInput = document.getElementById('todo-date');
        this.sortSelect = document.getElementById('sort-select');
        this.initDragAndDrop();
        
        this.addEventListeners();
        this.render();
    }
    
    addEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = this.input.value.trim();
            if (title) {
                this.taskManager.addTask(title, this.dateInput.value);
                this.input.value = '';
                this.render();
            }
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => 
                    b.classList.remove('active')
                );
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
        
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.render();
        });
        
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.sortOrder = e.target.value;
                this.render();
            });
        }
    }
    
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = task.completed;
        
        checkbox.addEventListener('change', () => {
            this.taskManager.toggleTask(task.id);
            this.render();
        });
        
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
        
        editBtn.addEventListener('click', () => this.editTask(task));
        deleteBtn.addEventListener('click', () => {
            this.taskManager.deleteTask(task.id);
            this.render();
        });
        
        actions.append(editBtn, deleteBtn);
        li.append(checkbox, content, actions);
        
        return li;
    }
    
    editTask(task) {
        const newTitle = prompt('Редактировать задачу:', task.title);
        
        if (newTitle !== null) {
            if (newTitle.trim()) {
                const updates = { title: newTitle.trim() };
                
                const newDate = prompt('Изменить дату (ГГГГ-ММ-ДД):', task.date);
                
                if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
                    updates.date = newDate;
                }
                
                this.taskManager.updateTask(task.id, updates);
                this.render();
            } else {
                alert('Название задачи не может быть пустым');
            }
        }
    }
    
    render() {
        let tasks = this.taskManager.getFilteredTasks(
            this.currentFilter, 
            this.searchQuery
        );
        
        tasks = this.taskManager.sortTasksByDate(tasks, this.sortOrder === 'asc');
        
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

        this.initDragAndDrop();
    }

    initDragAndDrop() {
        let draggedItem = null;
        
        this.tasksList.querySelectorAll('.todo-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedItem = item;
                item.classList.add('dragging');
                e.dataTransfer.setData('text/plain', item.dataset.id);
                e.dataTransfer.effectAllowed = 'move';
            });
            
            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
                draggedItem = null;
            });
        });
        
        this.tasksList.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const afterElement = this.getDragAfterElement(e.clientY);
            const currentItem = e.target.closest('.todo-item');
            
            if (draggedItem && currentItem && draggedItem !== currentItem) {
                if (afterElement) {
                    this.tasksList.insertBefore(draggedItem, afterElement);
                } else {
                    this.tasksList.appendChild(draggedItem);
                }
            }
        });
        
        this.tasksList.addEventListener('drop', (e) => {
            e.preventDefault();
            
            this.saveNewOrder();
        });
    }

    getDragAfterElement(y) {
        const draggableElements = [...this.tasksList.querySelectorAll('.todo-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    saveNewOrder() {
        // Получаем текущий порядок элементов в DOM
        const items = [...this.tasksList.querySelectorAll('.todo-item')];
        
        // Создаем новый массив задач в порядке DOM
        const newOrder = items.map(item => {
            const taskId = parseInt(item.dataset.id);
            return this.taskManager.tasks.find(t => t.id === taskId);
        }).filter(task => task !== undefined);
        
        // Сохраняем новый порядок
        this.taskManager.reorderTasks(newOrder);
    }
}