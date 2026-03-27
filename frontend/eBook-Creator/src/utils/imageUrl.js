import { BASE_URL } from "./apiPath";

export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("//")) return `https:${imagePath}`;

  const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const normalized = imagePath.replace(/\\/g, "/");

  if (normalized.startsWith("/backend/uploads/")) {
    return `${base}${normalized}`;
  }

  const uploadsIndex = normalized.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    const tail = normalized.slice(uploadsIndex + "/uploads/".length);
    return `${base}/backend/uploads/${tail}`;
  }

  if (normalized.startsWith("uploads/")) {
    const tail = normalized.slice("uploads/".length);
    return `${base}/backend/uploads/${tail}`;
  }

  const path = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return `${base}${path}`;
};
