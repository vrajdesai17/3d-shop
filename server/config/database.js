import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('your-username')) {
      console.log('⚠️  MongoDB URI not configured. Database features will be disabled.');
      console.log('   Please update .env with your MongoDB Atlas connection string.');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('   Server will continue without database features.');
  }
};

export default connectDB;
