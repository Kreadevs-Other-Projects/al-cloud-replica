import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "AL-Cloud",
    });
    console.log(`MongoDB connected: ${conn.connection.db.databaseName}`);
  } catch (err) {
    console.error("MongoDB error:", err);
    process.exit(1);
  }
};

export default connectDB;
