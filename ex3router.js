// npm install express

const express = require('express');
const app = express();
const port = 3000;

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
  res.send('Welcome to the About Page');
});

app.get('/contact', (req, res) => {
  res.send('Welcome to the Contact Page');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
