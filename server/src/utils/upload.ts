export { upload } from '../middleware/upload';
export const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 20) * 1024 * 1024;
