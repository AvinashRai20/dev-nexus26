import mongoose from 'mongoose';
import dotenv from 'dotenv';
import argon2 from 'argon2';
import { User } from '../models/User';
import { connectDB } from '../config/database';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const passwordHash = await argon2.hash(process.env.ADMIN_PASSWORD as string);

    await User.create({
      userId: 'DEV-000000',
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      passwordHash,
      role: 'ADMIN',
      accountStatus: 'ACTIVE',
      isPremium: true,
    });

    console.log('Admin user seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeder: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeder: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
