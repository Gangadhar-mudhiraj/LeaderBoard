import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from "./routes/user.route.js";
import { FailApiResponse } from './utils/ApiResponse.js';
import dotenv from "dotenv"
dotenv.config({ path: '.env' });

const app = express();

// console.log(process.env.NODE_ENV);

// 1. Regular middleware first
app.use(express.json()); // Parses incoming JSON requests
app.use(cors({ origin: `${process.env.FRONTEND_URL}` })); // Handles Cross-Origin Resource Sharing
app.use(morgan('dev')); // Logs HTTP requests in a developer-friendly format

// 2. Routes
app.use("/api/users", userRoutes); // Mounts user-related routes under /api/users

// 3. 404 handler (after all other routes)
// This middleware catches requests that don't match any defined routes
app.use((req, res, next) => {
  res.status(404).json(
    new FailApiResponse({
      message: 'Endpoint not found',
      errors: `Route ${req.originalUrl} does not exist`
    })
  );
});

// 4. Error handler (must have 4 parameters: err, req, res, next)
// This is a centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err); // Logs the error for debugging
  // Sets the status code based on the error or defaults to 500 (Internal Server Error)
  res.status(err.status || 500).json(
    new FailApiResponse({
      message: err.message || 'Internal Server Error', // Provides a user-friendly error message
      // Includes the error stack in development mode for debugging, hides it in production for security
      errors: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
  );
});

export default app;
