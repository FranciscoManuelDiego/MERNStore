//API connections
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('🔍 MongoDB URI length:', process.env.MONGODB_URI.length);
    console.log('🌍 Environment:', process.env.NODE_ENV);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    throw error; // Re-throw to handle in API routes
  }
};

export default connectDB