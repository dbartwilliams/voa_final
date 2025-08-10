import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync } from "fs";

// Get directory name equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
    cb(null, `${uniqueSuffix}-${cleanName}`);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB in bytes
    // fileSize: 1 * 1000000, // 1MB
    files: 1 // Limit to single file uploads
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpe?g|png|webp/; // ✅ Added webp
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed (PEG, JPG, PNG, WebP)"));
    }
  },
});

export { uploadPicture };