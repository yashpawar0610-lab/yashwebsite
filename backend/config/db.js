import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pulse_dashboard';
    const conn = await mongoose.connect(mongoURI);
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // Do not crash immediately so API can provide helpful diagnostic message
  }
};

export default connectDB;
