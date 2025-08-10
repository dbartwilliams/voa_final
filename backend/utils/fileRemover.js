import { unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileRemover = async (filename) => {
  try {
    const filePath = path.join(__dirname, "../uploads", filename);
    await unlink(filePath);
    console.log(`Successfully removed ${filename}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`File ${filename} doesn't exist, won't remove it`);
    } else {
      console.error(`Error removing file ${filename}:`, err.message);
      throw err; // Re-throw the error for the calling code to handle
    }
  }
};

export { fileRemover };