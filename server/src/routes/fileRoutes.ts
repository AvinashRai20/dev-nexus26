import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import { upload } from '../middleware/upload';
import { deleteFile, downloadFile, getFile, uploadFile } from '../controllers/fileController';

const router = express.Router();

router.post('/upload', protect, admin, upload.single('file'), uploadFile);
router.get('/:fileId', getFile);
router.get('/:fileId/download', downloadFile);
router.delete('/:fileId', protect, admin, deleteFile);

export default router;
