import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'USER' | 'ADMIN';
  profileImage?: string;
  isPremium: boolean;
  accountStatus: 'ACTIVE' | 'DISABLED';
  lastLogin?: Date;
  passwordResetTokenHash?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    profileImage: { type: String },
    isPremium: { type: Boolean, default: false },
    accountStatus: { type: String, enum: ['ACTIVE', 'DISABLED'], default: 'ACTIVE' },
    lastLogin: { type: Date },
    passwordResetTokenHash: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
