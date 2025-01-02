// Load the http module to create an HTTP server.
import http from 'http';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Read the port from environment variables
const port = process.env.PORT;

// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello WAD2!');

});

// Start the server
server.listen(port);

// Log a friendly message to the terminal
console.log(`Server running at ${port}`);
