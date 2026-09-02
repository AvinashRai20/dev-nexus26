import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  galleryImages: string[];
  pdfAttachment?: string;
  externalLink?: string;
  author: mongoose.Types.ObjectId;
  isPremium: boolean;
  publishStatus: 'Draft' | 'Published' | 'Scheduled' | 'Archived';
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    featuredImage: { type: String },
    galleryImages: [{ type: String }],
    pdfAttachment: { type: String },
    externalLink: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPremium: { type: Boolean, default: false },
    publishStatus: { type: String, enum: ['Draft', 'Published', 'Scheduled', 'Archived'], default: 'Draft' },
    isFeatured: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<IPost>('Post', PostSchema);
