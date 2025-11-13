import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://nighthawkog01:tZglaSklRFU5KJjT@real-estate.jwjphd5.mongodb.net/?retryWrites=true&w=majority&appName=Real-Estate",
      {
        dbName: "AL-Cloud",
      }
    );
    console.log(`MongoDB connected: ${conn.connection.db.databaseName}`);
  } catch (err) {
    console.error("MongoDB error:", err);
    process.exit(1);
  }
};

export default connectDB;
