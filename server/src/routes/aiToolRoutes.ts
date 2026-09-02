import express from 'express';
import { getAITools, getAIToolBySlug, createAITool, updateAITool, deleteAITool } from '../controllers/aiToolController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getAITools).post(protect, admin, createAITool);
router.route('/:slug').get(getAIToolBySlug);
router.route('/:id').put(protect, admin, updateAITool).delete(protect, admin, deleteAITool);

export default router;
