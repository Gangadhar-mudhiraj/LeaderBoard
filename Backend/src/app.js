import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from "./routes/user.route.js";
import { FailApiResponse } from './utils/ApiResponse.js';

const app = express();

// 1. Regular middleware first
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// 2. Routes
app.use("/api/users", userRoutes);

// 3. 404 handler (after all other routes)
app.use((req, res, next) => {
  res.status(404).json(
    new FailApiResponse({
      message: 'Endpoint not found',
      errors: `Route ${req.originalUrl} does not exist`
    })
  );
});

// 4. Error handler (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json(
    new FailApiResponse({
      message: err.message || 'Internal Server Error',
      errors: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
  );
});

export default app;