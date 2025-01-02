import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import './db';


dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON data in the request body
app.use(express.json());

// Route for handling tasks
app.use('/api/tasks', tasksRouter);

// Start the server
app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
