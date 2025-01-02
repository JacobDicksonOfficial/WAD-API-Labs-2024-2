import dotenv from 'dotenv';
import express from 'express';

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
