import mongoose, { Schema, Document } from 'mongoose';

export interface IRoadmap extends Document {
  title: string;
  slug: string;
  description: string;
  steps: {
    title: string;
    description: string;
    resources: mongoose.Types.ObjectId[];
  }[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    steps: [
      {
        title: { type: String, required: true },
        description: { type: String },
        resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
      }
    ],
    isPremium: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Roadmap = mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
