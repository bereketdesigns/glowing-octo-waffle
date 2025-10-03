import express from 'express';
import dotenv from 'dotenv'; // Keep dotenv import
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js'; // .js extension
import healthRoutes from './routes/healthRoutes.js'; // .js extension
import { redis } from './services/redisService.js'; // .js extension

// Try to load .env, but guard against multiple loads.
// This is a fallback in case --import dotenv/config fails for some reason.
if (!process.env.UPSTASH_REDIS_REST_URL) {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', healthRoutes);

// Health check to ensure Redis connectivity on startup
redis.ping()
  .then(() => console.log('Successfully connected to Upstash Redis.'))
  .catch((err) => console.error('Failed to connect to Upstash Redis:', err));

// Centralized error handling
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});