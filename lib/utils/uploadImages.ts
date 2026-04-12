// src/lib/utils/uploadImages.ts
import { v4 as uuidv4 } from "uuid";

interface UploadResponse {
  secure_url: string;
  public_id:  string;
  error?:     string;
}

export async function uploadToCloudinary(
  file: File,
  folder: string = "monster-creators"
): Promise<UploadResponse> {
  if (!file) return { secure_url: "", public_id: "", error: "No file provided" };

  // Accept images only (Form 1 logo + Form 2 screenshot)
  if (!file.type.startsWith("image/")) {
    return { secure_url: "", public_id: "", error: "Only image files are allowed" };
  }

  // 10 MB hard cap
  if (file.size > 10 * 1024 * 1024) {
    return { secure_url: "", public_id: "", error: "File exceeds 10 MB limit" };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  formData.append("folder", folder);

  const uniqueId = uuidv4().substring(0, 8);
  formData.append(
    "public_id",
    `${folder}/${uniqueId}-${file.name.replace(/\.[^/.]+$/, "")}`
  );

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      const err = await res.json();
      return { secure_url: "", public_id: "", error: err.error?.message || "Upload failed" };
    }

    const data = await res.json();
    return { secure_url: data.secure_url, public_id: data.public_id };
  } catch (error) {
    return {
      secure_url: "",
      public_id:  "",
      error: error instanceof Error ? error.message : "Unknown upload error",
    };
  }
}

export async function deleteFromCloudinary(
  publicId: string
): Promise<{ result: string; error?: string }> {
  if (!publicId) return { result: "not_found", error: "No public ID provided" };

  try {
    const res = await fetch("/api/cloudinary/delete", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ public_id: publicId }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { result: "error", error: err.error || "Deletion failed" };
    }

    const data = await res.json();
    return { result: data.result };
  } catch (error) {
    return {
      result: "error",
      error: error instanceof Error ? error.message : "Unknown deletion error",
    };
  }
}

export function getPublicIdFromUrl(url: string): string {
  if (!url || !url.includes("cloudinary.com")) return "";
  try {
    const parts       = url.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    if (uploadIndex === -1 || uploadIndex === parts.length - 1) return "";
    const fullPath = parts.slice(uploadIndex + 1).join("/");
    return fullPath.split(".")[0];
  } catch {
    return "";
  }
}