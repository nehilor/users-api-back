import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './src/controllers/userController';
import authRoutes from './src/controllers/authController';

const app: Express = express();
const port = process.env.PORT;

// Set up the body parser middleware to parse JSON data
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
