import express from 'express';
import { upload } from '../middleware/upload';
import { protect, admin } from '../middleware/authMiddleware';
import { uploadFile } from '../controllers/fileController';

const router = express.Router();

router.post('/', protect, admin, upload.single('file'), uploadFile);

export default router;
