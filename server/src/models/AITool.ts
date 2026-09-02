import mongoose, { Schema, Document } from 'mongoose';

export interface IAITool extends Document {
  name: string;
  slug: string;
  logo?: string;
  thumbnail?: string;
  description: string;
  category: string;
  tags: string[];
  websiteUrl: string;
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  isPremium: boolean;
  isPublished: boolean;
  features: string[];
  useCases: string[];
  howToUse: string;
  pros: string[];
  limitations: string[];
  relatedTools: mongoose.Types.ObjectId[];
  adminNotes?: string;
  lastUpdatedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AIToolSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    thumbnail: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    websiteUrl: { type: String, required: true },
    pricingType: { type: String, enum: ['Free', 'Freemium', 'Paid', 'Free Trial'], required: true },
    isPremium: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    features: [{ type: String }],
    useCases: [{ type: String }],
    howToUse: { type: String },
    pros: [{ type: String }],
    limitations: [{ type: String }],
    relatedTools: [{ type: Schema.Types.ObjectId, ref: 'AITool' }],
    adminNotes: { type: String },
    lastUpdatedDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const AITool = mongoose.model<IAITool>('AITool', AIToolSchema);
