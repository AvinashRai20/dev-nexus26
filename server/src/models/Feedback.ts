import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  email: string;
  user?: mongoose.Types.ObjectId;
  subject: string;
  message: string;
  category: 'General Feedback' | 'Bug Report' | 'Feature Request' | 'Course Request' | 'AI Tool Request' | 'Other';
  status: 'Unread' | 'Read' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ['General Feedback', 'Bug Report', 'Feature Request', 'Course Request', 'AI Tool Request', 'Other'],
      required: true,
    },
    status: { type: String, enum: ['Unread', 'Read', 'Resolved'], default: 'Unread' },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
