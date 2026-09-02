import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import * as c from '../controllers/contentController';
import { User } from '../models/User';
import { Post } from '../models/Post';

const crud = (list: any, slug: any, create: any, update: any, remove: any) => {
  const router = express.Router();
  router.get('/', list).post('/', protect, admin, create);
  router.get('/:slug', slug);
  router.put('/:id', protect, admin, update).delete('/:id', protect, admin, remove);
  return router;
};

export const courseRoutes = crud(c.courseList, c.courseBySlug, c.courseCreate, c.courseUpdate, c.courseRemove);
export const resourceRoutes = crud(c.resourceList, c.resourceBySlug, c.resourceCreate, c.resourceUpdate, c.resourceRemove);
export const roadmapRoutes = crud(c.roadmapList, c.roadmapBySlug, c.roadmapCreate, c.roadmapUpdate, c.roadmapRemove);

export const feedbackRoutes = express.Router()
  .get('/', protect, admin, c.feedbackList)
  .post('/', c.feedbackCreate)
  .put('/:id', protect, admin, c.feedbackUpdate)
  .delete('/:id', protect, admin, c.feedbackRemove);

export const bookmarkRoutes = express.Router()
  .get('/', protect, c.bookmarkList)
  .post('/', protect, c.bookmarkCreate)
  .delete('/:id', protect, c.bookmarkRemove);

export const adminRoutes = express.Router()
  .get('/dashboard/stats', protect, admin, c.dashboardStats)
  .get('/stats', protect, admin, c.dashboardStats)
  .get('/users', protect, admin, async (_req, res) => {
    try {
      const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  })
  .get('/posts', protect, admin, async (_req, res) => {
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 }).populate('author', 'name email');
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
