let todos = [];

exports.getTodos = (req, res) => {
    res.json(todos);
};

exports.addTodo = (req, res) => {
    const { text } = req.body;
    if (text) {
        const newTodo = { id: Date.now(), text, completed: false };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Text is required' });
    }
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).send();
};

exports.toggleTodo = (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (todo) {
        todo.completed = !todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
};
