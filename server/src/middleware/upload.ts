import multer from 'multer';

export const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 20) * 1024 * 1024;

const allowedExtensions = new Set(['pdf', 'jpg', 'jpeg', 'png', 'webp', 'svg', 'doc', 'docx', 'ppt', 'pptx', 'zip']);
const allowedMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
  'application/x-zip-compressed',
]);

const fileTypeAllowed = (file: Express.Multer.File) => {
  const ext = (file.originalname || '').split('.').pop()?.toLowerCase() ?? '';
  const mime = (file.mimetype || '').toLowerCase();

  return allowedExtensions.has(ext) && (allowedMimeTypes.has(mime) || ext === 'svg');
};

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!fileTypeAllowed(file)) {
      return cb(new Error('Unsupported file type. Allowed: PDF, JPG, JPEG, PNG, WEBP, SVG, DOC, DOCX, PPT, PPTX, ZIP.'));
    }
    cb(null, true);
  },
});
