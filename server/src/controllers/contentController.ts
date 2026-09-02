import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Resource } from '../models/Resource';
import { Roadmap } from '../models/Roadmap';
import { Feedback } from '../models/Feedback';
import { Bookmark } from '../models/Bookmark';
import { AITool } from '../models/AITool';
import { Post } from '../models/Post';

const queryFor = (req: Request) => {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
  const filter: Record<string, unknown> = {};
  if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { tags: { $regex: search, $options: 'i' } }];
  for (const key of ['category', 'difficulty', 'type', 'pricingType']) {
    if (typeof req.query[key] === 'string' && req.query[key]) filter[key] = req.query[key];
  }
  if (req.query.isPremium === 'true' || req.query.isPremium === 'false') filter.isPremium = req.query.isPremium === 'true';
  return filter;
};

const list = (model: any, publicFilter: Record<string, unknown> = {}) => async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const filter = { ...queryFor(req), ...publicFilter };
    const [items, total] = await Promise.all([
      model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      model.countDocuments(filter),
    ]);
    res.json(items);
  } catch (error: any) { res.status(500).json({ message: error.message }); }
};

const bySlug = (model: any, publicFilter: Record<string, unknown> = {}) => async (req: Request, res: Response) => {
  try {
    const item = await model.findOne({ slug: req.params.slug, ...publicFilter });
    item ? res.json(item) : res.status(404).json({ message: 'Content not found' });
  } catch (error: any) { res.status(500).json({ message: error.message }); }
};

const create = (model: any) => async (req: Request, res: Response) => {
  try { res.status(201).json(await model.create(req.body)); }
  catch (error: any) { res.status(400).json({ message: error.message }); }
};
const update = (model: any) => async (req: Request, res: Response) => {
  try {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    item ? res.json(item) : res.status(404).json({ message: 'Content not found' });
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};
const remove = (model: any) => async (req: Request, res: Response) => {
  try {
    const item = await model.findByIdAndDelete(req.params.id);
    item ? res.json({ message: 'Content removed' }) : res.status(404).json({ message: 'Content not found' });
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};

export const courseList = list(Course);
export const courseBySlug = bySlug(Course);
export const courseCreate = create(Course);
export const courseUpdate = update(Course);
export const courseRemove = remove(Course);
export const resourceList = list(Resource);
export const resourceBySlug = bySlug(Resource);
export const resourceCreate = create(Resource);
export const resourceUpdate = update(Resource);
export const resourceRemove = remove(Resource);
export const roadmapList = list(Roadmap);
export const roadmapBySlug = bySlug(Roadmap);
export const roadmapCreate = create(Roadmap);
export const roadmapUpdate = update(Roadmap);
export const roadmapRemove = remove(Roadmap);

export const feedbackList = list(Feedback);
export const feedbackCreate = async (req: Request, res: Response) => {
  try { res.status(201).json(await Feedback.create(req.body)); } catch (error: any) { res.status(400).json({ message: error.message }); }
};
export const feedbackUpdate = update(Feedback);
export const feedbackRemove = remove(Feedback);

const models: Record<string, any> = { AITool, Post, Course, Resource };
export const bookmarkList = async (req: any, res: Response) => {
  try { res.json(await Bookmark.find({ user: req.user._id }).sort({ createdAt: -1 })); } catch (error: any) { res.status(500).json({ message: error.message }); }
};
export const bookmarkCreate = async (req: any, res: Response) => {
  try {
    const { itemType, itemId } = req.body;
    const model = models[itemType];
    if (!model || !itemId) return res.status(400).json({ message: 'Valid itemType and itemId are required' });
    const item = await model.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Bookmarked item not found' });
    const bookmark = await Bookmark.findOneAndUpdate({ user: req.user._id, itemType, itemId }, { user: req.user._id, itemType, itemId }, { upsert: true, new: true, setDefaultsOnInsert: true });
    res.status(201).json(bookmark);
  } catch (error: any) { res.status(400).json({ message: error.message }); }
};
export const bookmarkRemove = async (req: any, res: Response) => {
  try { await Bookmark.deleteOne({ user: req.user._id, _id: req.params.id }); res.json({ message: 'Bookmark removed' }); } catch (error: any) { res.status(400).json({ message: error.message }); }
};

export const dashboardStats = async (_req: Request, res: Response) => {
  try {
    const [users, posts, tools, courses, resources, roadmaps, feedback, unreadFeedback] = await Promise.all([
      import('../models/User').then(({ User }) => User.countDocuments()),
      Post.countDocuments(), AITool.countDocuments(), Course.countDocuments(), Resource.countDocuments(), Roadmap.countDocuments(),
      Feedback.countDocuments(), Feedback.countDocuments({ status: 'Unread' }),
    ]);
    res.json({ users, posts, tools, courses, resources, roadmaps, feedback, unreadFeedback });
  } catch (error: any) { res.status(500).json({ message: error.message }); }
};
