document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Fetch todos from the server
    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => addTodoToDOM(todo));
        });

    // Add a new todo
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })
            .then(response => response.json())
            .then(todo => {
                addTodoToDOM(todo);
                todoInput.value = '';
            });
        }
    });

    // Delete or toggle completion of a todo
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.parentElement.dataset.id;
            fetch(`/api/todos/${id}`, { method: 'DELETE' })
                .then(() => e.target.parentElement.remove());
        } else if (e.target.classList.contains('todo-item')) {
            const id = e.target.dataset.id;
            fetch(`/api/todos/${id}`, { method: 'PATCH' })
                .then(response => response.json())
                .then(todo => {
                    e.target.classList.toggle('completed', todo.completed);
                });
        }
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        li.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    }
});
