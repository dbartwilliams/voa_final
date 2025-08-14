import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import cors from "cors";
import mongoose from "mongoose";
import prerender from "prerender-node"; // ✅ SEO support

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
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// Current module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Enable SEO prerender for bots
app.use(prerender);

// ✅ CORS setup
if (!isProduction) {
  // Dev: allow from multiple URLs if needed
  const allowedOrigins = process.env.CLIENT_URLS
    ? process.env.CLIENT_URLS.split(",").map(o => o.trim())
    : ["http://localhost:5173"];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
} else {
  // Prod: allow only specified URLs
  app.use(cors({
    origin: process.env.CLIENT_URLS
      ? process.env.CLIENT_URLS.split(",").map(o => o.trim())
      : [],
    credentials: true,
  }));
}

// ✅ Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Always serve uploads (dev + prod)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);
app.use("/api/contact", contactUsRoutes);

// ✅ Serve frontend in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

// ✅ Health check route
app.get("/", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];

    res.json({
      message: "Voice of Africa API is running 🚀",
      database: states[dbState] || "unknown",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server is running, but database check failed",
      error: error.message,
    });
  }
});

// ✅ Error handlers
app.use(invalidPathHandler);
app.use(errorResponserHandler);

// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on PORT: ${PORT} in ${isProduction ? "production" : "development"} mode`
  );
});
