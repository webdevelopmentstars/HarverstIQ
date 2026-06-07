import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { UserRole } from '../../../shared/types';

export interface IUser extends Document {
  user_id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  dataset_permissions: string[];
  created_at: Date;
  updated_at: Date;
  comparePassword(plainPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.VIEWER,
    },
    dataset_permissions: [
      {
        type: String,
        ref: 'Dataset',
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'users' }
);

// Pre-save: hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(12);
    this.password_hash = await bcryptjs.hash(this.password_hash, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method: compare password
userSchema.methods.comparePassword = async function (
  plainPassword: string
): Promise<boolean> {
  return bcryptjs.compare(plainPassword, this.password_hash);
};

export const User = mongoose.model<IUser>('User', userSchema);
