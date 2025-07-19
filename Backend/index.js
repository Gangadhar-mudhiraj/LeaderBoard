import app from "./src/app.js";
import dotenv from "dotenv"
import ConnectDb from "./src/config/db.js";

dotenv.config({ path: '.env' });

app.listen(process.env.PORT || 8080, async () => {
    console.log("listening to app");
    await ConnectDb();
})