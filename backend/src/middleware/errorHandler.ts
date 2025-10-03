import { Request, Response, NextFunction } from 'express';

// Custom error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('API Error:', err.stack);

  // Default to 500 Internal Server Error
  const statusCode = (err as any).statusCode || 500;
  const message = (err as any).message || 'An unexpected error occurred.';

  res.status(statusCode).json({
    success: false,
    message: message,
    // In production, you might want to hide the stack trace for security
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};