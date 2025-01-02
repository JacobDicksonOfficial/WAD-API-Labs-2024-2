import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Use the tasks router
app.use('/api/tasks', tasksRouter);

// Start the server
app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
