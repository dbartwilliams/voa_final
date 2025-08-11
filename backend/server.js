import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import cors from "cors";

import {
    errorResponserHandler,
    invalidPathHandler,
  } from "./middleware/errorHandler.js";

  // Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
  

dotenv.config();
connectDB();
const app = express();



// ✅ Enable CORS for frontend + cookies
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middlewares
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);
app.use("/api/contact", contactUsRoutes);

// Get current module's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

