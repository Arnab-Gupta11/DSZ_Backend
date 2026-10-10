import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { corsOptions } from './app/config/index.js';
import { requestId, generalLimiter, notFound } from './app/middlewares/index.js';
import { globalErrorHandler } from './app/errors/index.js';
import router from './app/routes/index.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();

// ── Security middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(compression());

// ── Request ID + structured logging ─────────────────────────────────────────
app.use(requestId);

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      JSON.stringify({
        requestId: req.headers['x-request-id'],
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      }),
    );
  });
  next();
});

// ── Rate limiting ────────────────────────────────────────────────────────────
app.use(generalLimiter);

// ── API routes ───────────────────────────────────────────────────────────────
app.use('/api/v1', router);

// ── Health checks ────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'OK' });
});

app.get('/health/ready', (_req: Request, res: Response) => {
  const isReady = mongoose.connection.readyState === 1;
  res.status(isReady ? 200 : 503).json({
    success: isReady,
    message: isReady ? 'Ready' : 'Not Ready',
  });
});

// ── Swagger / OpenAPI docs ───────────────────────────────────────────────────
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'DSZ API', version: '1.0.0', description: 'Digital Soft Zone Backend API' },
    components: {
      securitySchemes: {
        cookieAuth: { type: 'apiKey', in: 'cookie', name: 'token' },
      },
    },
  },
  apis: ['./src/docs/swagger.yaml'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── 404 + global error handler ───────────────────────────────────────────────
app.use(notFound);
app.use(globalErrorHandler);

export default app;
