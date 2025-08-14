import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
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

// --- Middlewares ---
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors({ exposedHeaders: "*" }));
app.use(helmet()); // security headers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);
app.use("/api/contact", contactUsRoutes);

// --- Get __dirname for ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Serve static uploads (images) over HTTPS ---
app.use('/uploads', express.static(
  path.normalize(path.join(__dirname, 'uploads')).replace(/\\/g, '/'), 
  {
    setHeaders: (res) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
    fallthrough: false // Important for debugging
  }
));


// --- Serve frontend in production ---
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../client/build");
  app.use(express.static(frontendBuildPath));

  // Catch-all to serve React routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server running in development mode...");
  });
}

// --- Error handling ---
app.use(invalidPathHandler);
app.use(errorResponserHandler);

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`
  );
});



// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from 'url';
// import connectDB from "./config/db.js";
// import cors from "cors";

// import {
//     errorResponserHandler,
//     invalidPathHandler,
//   } from "./middleware/errorHandler.js";

//   // Routes
// import userRoutes from "./routes/userRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import commentRoutes from "./routes/commentRoutes.js";
// import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";
// import contactUsRoutes from "./routes/contactUsRoutes.js";
  

// dotenv.config();
// connectDB();
// const app = express();

// const corsOptions = {
//   exposedHeaders: "*",
// };

// app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });


// // Middlewares
// app.use(express.json({ limit: '50mb' })); 
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/post-categories", postCategoriesRoutes);
// app.use("/api/contact", contactUsRoutes);

// // Get current module's directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // static assets
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// app.use(invalidPathHandler);
// app.use(errorResponserHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });

