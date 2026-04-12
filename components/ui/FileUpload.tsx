// src/components/ui/FileUpload.tsx
"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { IoCloudUploadOutline, IoClose, IoImageOutline } from "react-icons/io5";
import { uploadToCloudinary } from "@/lib/utils/uploadImages";

type Props = {
  label:      string;
  value?:     string | null;
  onChange:   (url: string) => void;
  folder?:    string;
  maxMB?:     number;
  error?:     string;
  required?:  boolean;
};

export default function FileUpload({
  label, value, onChange, folder = "monster-creators",
  maxMB = 10, error, required,
}: Props) {
  const [uploading,    setUploading]    = useState(false);
  const [uploadError,  setUploadError]  = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxMB * 1024 * 1024) {
      setUploadError(`File exceeds ${maxMB} MB limit`);
      return;
    }

    setUploading(true);
    setUploadError(null);

    const result = await uploadToCloudinary(file, folder);

    if (result.error) {
      setUploadError(result.error);
    } else {
      onChange(result.secure_url);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  const displayError = error || uploadError;

  return (
    <div className="space-y-1.5">
      <label className="txt-small font-medium text-white">
        {label}
        {required && <span className="text-red-400 ms-1">*</span>}
      </label>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-zinc-700 group">
          <Image src={value} alt={label} fill className="object-contain bg-zinc-900 p-2" />
          <button
            type="button"
            onClick={() => { onChange(""); setUploadError(null); }}
            className="absolute top-2 inset-e-2 p-1.5 bg-black/70 hover:bg-black/90 rounded-lg text-white transition-colors"
          >
            <IoClose className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full flex flex-col items-center justify-center gap-2 h-36 rounded-xl border-2 border-dashed transition-colors duration-200
            ${displayError
              ? "border-red-500 bg-red-500/5"
              : "border-zinc-700 bg-zinc-900/50 hover:border-[#78be20] hover:bg-[#78be20]/5"
            } ${uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {uploading ? (
            <>
              <div className="w-7 h-7 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
              <span className="txt-smaller text-zinc-400">Uploading...</span>
            </>
          ) : (
            <>
              <IoImageOutline className="size-8 text-zinc-500" />
              <span className="txt-small text-zinc-400">Click to upload image</span>
              <span className="txt-smaller text-zinc-600">PNG, JPG up to {maxMB} MB</span>
            </>
          )}
        </button>
      )}

      {displayError && (
        <p className="txt-smaller text-red-400">{displayError}</p>
      )}
    </div>
  );
}