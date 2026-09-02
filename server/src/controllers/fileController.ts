import { Response } from 'express';
import { Resource } from '../models/Resource';
import { AuthRequest } from '../middleware/authMiddleware';
import {
  deleteFileFromGridFS,
  streamGridFsFile,
  uploadFileToGridFS,
} from '../services/gridfs.service';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'resource';

const inferResourceType = (originalName: string, mimeType: string) => {
  const ext = (originalName || '').split('.').pop()?.toLowerCase() ?? '';
  const normalizedMime = mimeType.toLowerCase();

  if (ext === 'pdf' || normalizedMime.includes('pdf')) return 'PDF';
  if (ext === 'svg' || normalizedMime.includes('svg')) return 'Poster';
  if (normalizedMime.includes('image')) return 'Poster';
  if (ext === 'doc' || ext === 'docx' || normalizedMime.includes('word')) return 'Guide';
  if (ext === 'ppt' || ext === 'pptx' || normalizedMime.includes('powerpoint')) return 'Guide';
  if (ext === 'zip' || normalizedMime.includes('zip')) return 'Guide';
  return 'Note';
};

const normalizeBoolean = (value: unknown) => value === true || value === 'true' || value === '1' || value === 1;
const toStringValue = (value: unknown) => (Array.isArray(value) ? value[0] ?? '' : String(value ?? ''));

const nextSlug = async (title: string) => {
  const baseSlug = slugify(title);
  let candidate = baseSlug;
  let counter = 1;

  while (await Resource.exists({ slug: candidate })) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return candidate;
};

export const uploadFile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileIdData = await uploadFileToGridFS({
      buffer: req.file.buffer,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      metadata: {
        uploadedBy: req.user?._id?.toString() ?? null,
        category: toStringValue(req.body.category) || 'General',
        isPremium: normalizeBoolean(req.body.isPremium),
      },
    });

    const title = toStringValue(req.body.title || req.file.originalname || 'Uploaded resource');
    const slug = await nextSlug(title);

    const resource = await Resource.findOneAndUpdate(
      { fileId: fileIdData.fileId },
      {
        title,
        slug,
        description: toStringValue(req.body.description) || 'Uploaded resource',
        type: toStringValue(req.body.type) || inferResourceType(req.file.originalname, req.file.mimetype),
        category: toStringValue(req.body.category) || 'General',
        fileId: fileIdData.fileId,
        fileUrl: `/api/files/${fileIdData.fileId}`,
        originalName: fileIdData.filename,
        mimeType: fileIdData.contentType,
        size: fileIdData.size,
        uploadedBy: req.user?._id ?? null,
        isPremium: normalizeBoolean(req.body.isPremium),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.status(201).json({
      message: 'File uploaded successfully to MongoDB GridFS.',
      fileId: fileIdData.fileId,
      fileUrl: `/api/files/${fileIdData.fileId}`,
      downloadUrl: `/api/files/${fileIdData.fileId}/download`,
      mimeType: fileIdData.contentType,
      size: fileIdData.size,
      resource,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Upload failed.' });
  }
};

export const getFile = async (req: AuthRequest, res: Response) => {
  try {
    const fileId = Array.isArray(req.params.fileId) ? req.params.fileId[0] : req.params.fileId;
    const resource = await Resource.findOne({ fileId }).lean();
    if (resource && resource.isPremium && (!req.user || !req.user.isPremium)) {
      return res.status(403).json({ message: 'Premium content requires an authenticated premium account.' });
    }

    return await streamGridFsFile(fileId, res, false);
  } catch (error: any) {
    return res.status(404).json({ message: error.message || 'File not found.' });
  }
};

export const downloadFile = async (req: AuthRequest, res: Response) => {
  try {
    const fileId = Array.isArray(req.params.fileId) ? req.params.fileId[0] : req.params.fileId;
    const resource = await Resource.findOne({ fileId }).lean();
    if (resource && resource.isPremium && (!req.user || !req.user.isPremium)) {
      return res.status(403).json({ message: 'Premium content requires an authenticated premium account.' });
    }

    return await streamGridFsFile(fileId, res, true);
  } catch (error: any) {
    return res.status(404).json({ message: error.message || 'File not found.' });
  }
};

export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const fileId = Array.isArray(req.params.fileId) ? req.params.fileId[0] : req.params.fileId;
    const resource = await Resource.findOne({ fileId });

    const deleteResult = await deleteFileFromGridFS(fileId);
    if (resource) {
      await Resource.deleteOne({ _id: resource._id });
    }

    return res.json({
      message: deleteResult.deleted ? 'File deleted successfully.' : 'File not found in GridFS.',
      fileId,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to delete file.' });
  }
};
