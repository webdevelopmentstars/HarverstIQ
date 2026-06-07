import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

const app: Express = express();

// ========== MIDDLEWARE ==========

// CORS configuration
app.use(
  cors({
    origin: (process.env.API_CORS_ORIGIN || 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : ':method :url :status :res[content-length] - :response-time ms'
  )
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// ========== ROUTES ==========

// Health check endpoint (no auth required)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API root
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'HarverstIQ API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// TODO: Add auth routes
// TODO: Add jobs routes
// TODO: Add datasets routes
// TODO: Add selectors routes
// TODO: Add admin routes

// ========== ERROR HANDLING ==========

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    statusCode: 404,
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: err.name || 'Error',
    message,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ========== SERVER SETUP ==========

const PORT = parseInt(process.env.API_PORT || '4000', 10);

const server = http.createServer(app);

// TODO: Initialize Socket.IO
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: (process.env.API_CORS_ORIGIN || 'http://localhost:3000').split(','),
//     credentials: true,
//   },
// });

server.listen(PORT, () => {
  console.log(`🚀 HarverstIQ API listening on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
