import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  slug: string;
  description: string;
  type: 'Note' | 'PDF' | 'Poster' | 'Guide' | 'CheatSheet';
  fileUrl?: string;
  fileId?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  uploadedBy?: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    type: { type: String, enum: ['Note', 'PDF', 'Poster', 'Guide', 'CheatSheet'], required: true },
    fileUrl: { type: String },
    fileId: { type: String, index: true, unique: true, sparse: true },
    originalName: { type: String },
    mimeType: { type: String },
    size: { type: Number },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    thumbnail: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    isPremium: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
