import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { Response } from 'express';

export interface GridFSUploadOptions {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  metadata?: Record<string, unknown>;
}

export const getGridFsBucket = () => {
  if (!mongoose.connection.db) {
    throw new Error('MongoDB connection is not ready.');
  }

  return new GridFSBucket(mongoose.connection.db, { bucketName: 'fs' });
};

export const validateFilePayload = (file: { originalname?: string; mimetype?: string; size?: number }) => {
  const maxBytes = Number(process.env.MAX_FILE_SIZE || 20) * 1024 * 1024;
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

  const ext = (file.originalname || '').split('.').pop()?.toLowerCase() ?? '';
  const mime = (file.mimetype || '').toLowerCase();

  if (!allowedExtensions.has(ext) || (!allowedMimeTypes.has(mime) && ext !== 'svg')) {
    throw new Error('Unsupported file type. Allowed: PDF, JPG, JPEG, PNG, WEBP, SVG, DOC, DOCX, PPT, PPTX, ZIP.');
  }

  if ((file.size ?? 0) > maxBytes) {
    throw new Error(`File is too large. Maximum size is ${maxBytes / (1024 * 1024)}MB.`);
  }
};

export const uploadFileToGridFS = async ({ buffer, originalname, mimetype, metadata }: GridFSUploadOptions) => {
  validateFilePayload({ originalname, mimetype, size: buffer.length });

  const bucket = getGridFsBucket();
  const safeName = (originalname || 'upload').replace(/[^a-zA-Z0-9_.-]/g, '_');

  const uploadStream = bucket.openUploadStream(safeName, {
    metadata: {
      ...metadata,
      contentType: mimetype,
      originalName: originalname,
      uploadedAt: new Date().toISOString(),
    },
  });

  await new Promise<void>((resolve, reject) => {
    Readable.from(buffer)
      .on('error', reject)
      .pipe(uploadStream)
      .on('error', reject)
      .on('finish', resolve);
  });

  return {
    fileId: uploadStream.id.toString(),
    filename: safeName,
    contentType: mimetype,
    size: buffer.length,
    metadata: uploadStream.options.metadata ?? {},
  };
};

export const getFileMetadataById = async (fileId: string) => {
  const bucket = getGridFsBucket();
  const objectId = parseFileId(fileId);
  if (!objectId) {
    throw new Error('Invalid file ID.');
  }

  const file = await bucket.find({ _id: objectId }).next();
  if (!file) {
    throw new Error('File not found in GridFS.');
  }

  return file;
};

export const deleteFileFromGridFS = async (fileId: string) => {
  const bucket = getGridFsBucket();
  const objectId = parseFileId(fileId);
  if (!objectId) {
    throw new Error('Invalid file ID.');
  }

  const file = await bucket.find({ _id: objectId }).next();
  if (!file) {
    return { deleted: false, fileId };
  }

  await bucket.delete(objectId);
  return { deleted: true, fileId };
};

export const streamGridFsFile = async (fileId: string, res: Response, isDownload = false) => {
  const bucket = getGridFsBucket();
  const objectId = parseFileId(fileId);
  if (!objectId) {
    return res.status(400).json({ message: 'Invalid file ID.' });
  }

  const file = await bucket.find({ _id: objectId }).next();
  if (!file) {
    return res.status(404).json({ message: 'File not found.' });
  }

  const metadata = (file.metadata ?? {}) as Record<string, unknown>;
  const contentType = typeof metadata.contentType === 'string' ? metadata.contentType : 'application/octet-stream';
  const filename = typeof metadata.originalName === 'string' ? metadata.originalName : file.filename || 'download';

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', String(file.length));
  res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="${filename.replace(/"/g, '\\"')}"`);

  const stream = bucket.openDownloadStream(objectId);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to stream file from GridFS.' });
    }
  });

  stream.pipe(res);
};

const parseFileId = (fileId: string) => {
  try {
    return new ObjectId(fileId);
  } catch {
    return null;
  }
};
