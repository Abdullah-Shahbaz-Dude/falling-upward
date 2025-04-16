import mongoose from 'mongoose';
import { connectMockDB } from './mockDb';

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/falling-upward';
const USE_MOCK_DB = process.env.NODE_ENV === 'development' || !MONGODB_URI;

// Define the global mongoose cache type
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add mongoose to the NodeJS global type
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize the cached connection object
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// If no cached connection exists, create it
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to database - either mock or real MongoDB
 * @returns Mongoose instance or true for mock DB
 */
async function connectDB(): Promise<typeof mongoose | boolean> {
  // Use mock database in development or when no MongoDB URI is provided
  if (USE_MOCK_DB) {
    console.log('Using mock database for development/testing');
    return await connectMockDB();
  }
  
  // For production with real MongoDB connection
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Create connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .catch((error) => {
        console.error('MongoDB connection error:');
        console.error(error);
        throw error;
      });
  }

  // Wait for connection to be established
  try {
    cached.conn = await cached.promise;
    console.log('Connected to MongoDB database');
    return cached.conn;
  } catch (error) {
    console.error('Failed to connect to MongoDB:');
    console.error(error);
    throw error;
  }
}

export default connectDB;
