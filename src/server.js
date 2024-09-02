const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// API routes
app.use('/api', todoRoutes);

// Server status endpoint
app.get('/api/status', (req, res) => {
    res.send('Server is up and running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
