import express from 'express';
import { upload } from '../utils/upload';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, admin, upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'File Uploaded',
      fileUrl: `/${req.file.path.replace(/\\/g, '/')}`,
    });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

export default router;
