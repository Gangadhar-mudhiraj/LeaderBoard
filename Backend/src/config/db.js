import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const ConnectDb = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        // For debugging, you can uncomment this, but be cautious with production logs:
        // console.log("Connecting to MongoDB with URL:", process.env.MONGODB_URL);

        // ✅ CORRECTED: Pass an options object with dbName
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'LeaderBoard', // Specify the database name here
            // You might also want to add these options for better connection handling,
            // though they are often default in newer Mongoose versions:
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Exit process on connection failure
    }
};

export default ConnectDb;
