import { Request, Response } from 'express';
import argon2 from 'argon2';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { registerSchema, loginSchema } from '../validators/authValidators';
import crypto from 'crypto';

const generateUserId = async () => {
  const count = await User.countDocuments();
  return `DEV-${String(count + 1).padStart(6, '0')}`;
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password } = validatedData;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const passwordHash = await argon2.hash(password);
    const userId = await generateUserId();

    const user = await User.create({
      userId,
      name,
      email,
      passwordHash,
    });

    if (user) {
      generateToken(res, user._id as any);
      res.status(201).json({
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ message: error.message || 'Server error' });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (user && (await argon2.verify(user.passwordHash, password))) {
      if (user.accountStatus === 'DISABLED') {
        res.status(403).json({ message: 'Account is disabled' });
        return;
      }

      user.lastLogin = new Date();
      await user.save();

      generateToken(res, user._id as any);
      res.json({
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ message: error.message || 'Server error' });
    }
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req: any, res: Response) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      userId: req.user.userId,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isPremium: req.user.isPremium,
      accountStatus: req.user.accountStatus,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  const generic = { message: 'If an account exists, password reset instructions have been sent' };
  try {
    const email = String(req.body.email || '').toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user) { res.json(generic); return; }
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();
    // A mail provider can consume this token; never expose it outside development.
    res.json(process.env.NODE_ENV === 'development' ? { ...generic, resetToken: token } : generic);
  } catch { res.json(generic); }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenHash = crypto.createHash('sha256').update(String(req.body.token || '')).digest('hex');
    const user = await User.findOne({ passwordResetTokenHash: tokenHash, passwordResetExpires: { $gt: new Date() } });
    if (!user || typeof req.body.password !== 'string' || req.body.password.length < 6) {
      res.status(400).json({ message: 'Invalid or expired reset token' }); return;
    }
    user.passwordHash = await argon2.hash(req.body.password);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successfully' });
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};
