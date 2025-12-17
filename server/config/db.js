import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn(
      "MONGO_URI not set — skipping MongoDB connection (development fallback)."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Don't crash the whole app for a DB auth/config error in development.
    // Log and continue so the API can run in a degraded mode.
    // If you want to fail fast in production, replace this with `process.exit(1)`.
    return;
  }
};

export default connectDB;
