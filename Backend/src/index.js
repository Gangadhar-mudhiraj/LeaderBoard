import app from "./app.js";
import dotenv from "dotenv"
import ConnectDb from "./config/db.js";

dotenv.config({ path: '.env' });

app.listen(process.env.PORT || 8080, async () => {
    console.log("listening to app");
    await ConnectDb();
})