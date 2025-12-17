import express from "express";
import dotenv from "dotenv";
import path from "path"; // <--- Import path
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Configure dotenv and capture the result
const envPath = path.join(__dirname, ".env");
const result = dotenv.config({ path: envPath });

// 2. Check for errors explicitly
if (result.error) {
  console.log("❌ DOTENV ERROR: Could not load .env file");
  console.log("   Looking for file at:", envPath);
  console.log("   Details:", result.error.message);
} else {
  console.log("✅ DOTENV SUCCESS: File loaded from", envPath);
}

// 3. Print the variable status
console.log("DEBUG: MONGO_URI is", process.env.MONGO_URI ? "LOADED" : "MISSING");

connectDB();
const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));