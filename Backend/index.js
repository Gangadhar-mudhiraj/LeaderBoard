import app from "./src/app.js";
import dotenv from "dotenv"
import ConnectDb from "./src/config/db.js";

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await ConnectDb(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

startServer();