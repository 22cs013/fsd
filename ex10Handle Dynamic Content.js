const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server to handle requests
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Root route
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Node.js Web Server</h1>');
  } else if (req.url === '/about') {
    // About page route
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Us</h1><p>This is a Node.js web server example.</p>');
  } else if (req.url === '/file') {
    // Serve a file from the server
    const filePath = path.join(__dirname, 'example.txt');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Handle file not found error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        // Send the file content
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else {
    // Handle all other routes
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
