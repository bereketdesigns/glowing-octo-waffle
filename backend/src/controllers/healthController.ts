import { Request, Response } from 'express';
import { redis } from '../services/redisService.js'; // .js extension

export const getHealthStatus = async (req: Request, res: Response) => {
  try {
    await redis.ping();
    res.status(200).json({
      status: 'ok',
      message: 'Backend is healthy and connected to Redis.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Backend is not healthy or failed to connect to Redis.',
      error: (error as Error).message,
      timestamp: new Date().toISOString(),
    });
  }
};