document.addEventListener('DOMContentLoaded', () => {
    createAppStructure();
    
    window.taskManager = new TaskManager();
});

function createAppStructure() {
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
        
        if (filter === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }
        
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
}