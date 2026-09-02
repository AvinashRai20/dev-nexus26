import { Request, Response } from 'express';
import { AITool } from '../models/AITool';

export const getAITools = async (req: Request, res: Response) => {
  try {
    const filter: any = { isPublished: { $ne: false } };
    if (typeof req.query.search === 'string' && req.query.search) filter.$or = [{ name: { $regex: req.query.search, $options: 'i' } }, { description: { $regex: req.query.search, $options: 'i' } }, { category: { $regex: req.query.search, $options: 'i' } }, { tags: { $regex: req.query.search, $options: 'i' } }];
    if (typeof req.query.category === 'string' && req.query.category) filter.category = req.query.category;
    if (typeof req.query.pricingType === 'string' && req.query.pricingType) filter.pricingType = req.query.pricingType;
    const tools = await AITool.find(filter).sort({ createdAt: -1 });
    res.json(tools);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAIToolBySlug = async (req: Request, res: Response) => {
  try {
    const tool = await AITool.findOne({ slug: req.params.slug, isPublished: { $ne: false } });
    if (tool) {
      res.json(tool);
    } else {
      res.status(404).json({ message: 'AI Tool not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAITool = async (req: Request, res: Response) => {
  try {
    const tool = new AITool(req.body);
    const createdTool = await tool.save();
    res.status(201).json(createdTool);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAITool = async (req: Request, res: Response) => {
  try {
    const tool = await AITool.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (tool) {
      res.json(tool);
    } else {
      res.status(404).json({ message: 'AI Tool not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAITool = async (req: Request, res: Response) => {
  try {
    const tool = await AITool.findByIdAndDelete(req.params.id);
    if (tool) {
      res.json({ message: 'AI Tool removed' });
    } else {
      res.status(404).json({ message: 'AI Tool not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
