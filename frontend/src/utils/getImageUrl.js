import images from "../constants/images";

// Hardcode your public uploads base URL if it’s fixed in production
const UPLOAD_BASE_URL = "http://localhost:5000/uploads";

export default function getImageUrl(filename) {
  if (!filename) {
    return images.samplePostImage;
  }
  return `${UPLOAD_BASE_URL}/${filename}`;
}