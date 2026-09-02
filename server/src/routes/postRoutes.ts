import express from 'express';
import { getPosts, getPostBySlug, createPost, updatePost, deletePost } from '../controllers/postController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getPosts).post(protect, admin, createPost);
router.route('/:slug').get(getPostBySlug);
router.route('/:id').put(protect, admin, updatePost).delete(protect, admin, deletePost);

export default router;
