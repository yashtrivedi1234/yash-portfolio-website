"use client";

import { useState } from "react";
import Image from "next/image";
import { adminLabelClass } from "@/components/admin/AdminUI";
import { notify } from "@/lib/toast";

export function FileUploadField({
  label,
  accept,
  uploadType,
  currentUrl,
  onUploaded,
  previewShape = "round",
}: {
  label: string;
  accept: string;
  uploadType: string;
  currentUrl?: string;
  onUploaded: (url: string) => void;
  previewShape?: "round" | "square";
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", uploadType);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    setUploading(false);
    if (!res.ok) {
      notify.error(data.error ?? "Upload failed");
      return;
    }

    notify.success("File uploaded successfully!");
    onUploaded(data.url);
  }

  return (
    <div>
      <label className={adminLabelClass}>{label}</label>
      {currentUrl && (
        <div className="mb-3 flex items-center gap-3">
          {uploadType === "resume" ? (
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:underline">
              View current file
            </a>
          ) : (
            <div
              className={`relative h-16 w-16 overflow-hidden border border-slate-700 bg-slate-800/50 ${
                previewShape === "square" ? "rounded-xl" : "rounded-full"
              }`}
            >
              <Image src={currentUrl} alt="" fill className="object-contain p-1" />
            </div>
          )}
          <span className="truncate text-xs text-slate-500 max-w-xs">{currentUrl}</span>
        </div>
      )}
      <input type="file" accept={accept} onChange={handleUpload} disabled={uploading} className="text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-sm file:text-white" />
      {uploading && <p className="mt-1 text-xs text-slate-400">Uploading...</p>}
    </div>
  );
}
