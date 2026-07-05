import { getCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "application/pdf",
]);

const UPLOAD_FOLDERS: Record<string, string> = {
  profile: "profile",
  "og-image": "og",
  project: "projects",
  "admin-avatar": "admin",
  favicon: "favicon",
  "tech-stack": "tech-stack",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function saveUploadedFile(file: File, prefix: string) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("File type not allowed. Use JPG, PNG, WebP, SVG, ICO, or PDF.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large. Maximum size is 5MB.");
  }

  const folderKey = UPLOAD_FOLDERS[prefix] ?? "misc";
  const folder = `portfolio/${folderKey}`;
  const isPdf = file.type === "application/pdf";
  const timestamp = Date.now();
  const publicId = isPdf ? `${prefix}-${timestamp}.pdf` : `${prefix}-${timestamp}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  const cloudinary = getCloudinary();
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: publicId,
    resource_type: isPdf ? "raw" : "image",
    overwrite: false,
  });

  return result.secure_url;
}
