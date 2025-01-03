import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './db'; // Import database connection
import tasksRouter from './api/tasks/index.js';
import usersRouter from './api/users';
import cors from 'cors';

dotenv.config();

const app = express();

// Error handler middleware
const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};


app.use(errHandler);


// Middleware
app.use(bodyParser.json());

// API routes
app.use('/api/tasks', tasksRouter);

// Error handling middleware
app.use(errHandler);

app.use('/api/users', usersRouter);

app.use(cors());



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

