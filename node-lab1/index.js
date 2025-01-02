// Load the http module to create an HTTP server.
import http from 'http';
import dotenv from 'dotenv';
import greeting from './greeting.js';

// Load environment variables
dotenv.config();

// Get the port from .env
const port = process.env.PORT;

// Configure our HTTP server to respond with a language-specific message
const server = http.createServer((req, res) => {
  let lang = req.headers['accept-language'];
  const defaultLang = 'en';

  // If the requested language is not available, use the default
  if (!greeting[lang]) lang = defaultLang;

  const response = {
    lang: lang,
    message: greeting[lang],
  };

  // Send response headers and body
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Language': response.lang,
  });
  res.end(response.message);
});

// Start the server
server.listen(port);

// Log the server status
console.log(`Server running at ${port}`);
