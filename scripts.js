const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', getTodos);

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
});

function addTodo(todo) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = todo;
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', () => toggleComplete(todoItem));
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todoItem));
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('todo-buttons');
    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(deleteButton);
    todoItem.appendChild(buttonGroup);
    todoList.appendChild(todoItem);
    saveTodoToLocal(todo);
}

function toggleComplete(todoItem) {
    todoItem.classList.toggle('completed');
}

function deleteTodo(todoItem) {
    todoItem.remove();

    removeTodoFromLocal(todoItem.innerText);
}

function saveTodoToLocal(todo) {
    let todos = getTodosFromLocal();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocal() {
    let todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function getTodos() {
    let todos = getTodosFromLocal();
    todos.forEach(todo => addTodoToDOM(todo));
}

function addTodoToDOM(todo) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = todo;

    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', () => toggleComplete(todoItem));

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todoItem));

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('todo-buttons');
    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(deleteButton);
    todoItem.appendChild(buttonGroup);

    todoList.appendChild(todoItem);
}

function removeTodoFromLocal(todo) {
    let todos = getTodosFromLocal();
    todos = todos.filter(t => t !== todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
