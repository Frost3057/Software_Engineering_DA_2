const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Valid credentials (in real app, use database)
const validCredentials = {
  username: 'admin',
  password: 'password123'
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Login API endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === validCredentials.username && password === validCredentials.password) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      redirect: '/dashboard'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;