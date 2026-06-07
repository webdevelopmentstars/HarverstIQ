import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://mongo:27017/harvestiq';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log('[DB] Connected to MongoDB');
  } catch (error) {
    console.error('[DB] Connection failed:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('[DB] Disconnected from MongoDB');
  } catch (error) {
    console.error('[DB] Disconnect failed:', error);
  }
};
