import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const ConnectDb = async () => {
    try {
        console.log("Connecting to MongoDB with URL:", process.env.MONGODB_URL);

        await mongoose.connect(process.env.MONGODB_URL,);

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default ConnectDb;