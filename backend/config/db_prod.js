import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const options = {
      autoIndex: true, // Build indexes automatically
      maxPoolSize: 10, // Maintain up to 10 connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      authSource: 'admin', // Critical for authentication
      auth: {
        username: process.env.MONGO_USER || 'voa_db_admin',
        password: process.env.MONGO_PASS || 'J8q2kL9mPxR6sT3z'
      }
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`Using DB: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);

    // Enhanced connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose default connection disconnected');
    });

    // Verify connection by pinging database
    await mongoose.connection.db.admin().ping();
    console.log('Database ping successful');

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    
    // Detailed error diagnostics
    if (err.name === 'MongoServerError') {
      console.error('Error code:', err.code);
      console.error('Error reason:', err.errorLabels || 'None');
    }
    
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default connectDB;