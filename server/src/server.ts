import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import aiToolRoutes from './routes/aiToolRoutes';
import postRoutes from './routes/postRoutes';
import uploadRoutes from './routes/uploadRoutes';
import fileRoutes from './routes/fileRoutes';
import { courseRoutes, resourceRoutes, roadmapRoutes, feedbackRoutes, bookmarkRoutes, adminRoutes } from './routes/contentRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(helmet({ crossOriginResourcePolicy: false })); // allow static image fetching
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai-tools', aiToolRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/admin', adminRoutes);

// Local uploads folder is intentionally disabled for permanent storage.
// Files are stored in MongoDB GridFS and served through /api/files/:fileId.

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'DEV.NEXUS26 API is running' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
