import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const filter: any = { publishStatus: 'Published' };
    if (typeof req.query.search === 'string' && req.query.search) filter.$or = [{ title: { $regex: req.query.search, $options: 'i' } }, { description: { $regex: req.query.search, $options: 'i' } }, { content: { $regex: req.query.search, $options: 'i' } }, { tags: { $regex: req.query.search, $options: 'i' } }];
    if (typeof req.query.category === 'string' && req.query.category) filter.category = req.query.category;
    const posts = await Post.find(filter).sort({ createdAt: -1 }).populate('author', 'name');
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, publishStatus: 'Published' }).populate('author', 'name');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req: any, res: Response) => {
  try {
    const post = new Post({ ...req.body, author: req.user._id });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
