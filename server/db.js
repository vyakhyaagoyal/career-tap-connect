const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("hi");
  if (mongoose.connection && mongoose.connection.readyState >= 1) {
    console.log('⚠ Already connected to MongoDB');
    return;
  }

  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect('mongodb+srv://soumyaagrawal2k6:hisoumya@cluster0.7hi8fhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✔ MongoDB connected successfully');
  } catch (error) {
    console.error('✖ MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

module.exports = connectDB;