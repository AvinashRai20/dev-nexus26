import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  user: mongoose.Types.ObjectId;
  itemType: 'AITool' | 'Post' | 'Course' | 'Resource';
  itemId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    itemType: { type: String, enum: ['AITool', 'Post', 'Course', 'Resource'], required: true },
    itemId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

BookmarkSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
