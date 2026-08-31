"use client";

import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, X } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ImageUploader({ label, value, onChange, placeholder }: ImageUploaderProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDriveUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    let url = e.target.value;
    // Auto-parse Google Drive links
    const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
      url = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    onChange(url);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to ~4MB to avoid DB bloat if using base64)
    if (file.size > 4 * 1024 * 1024) {
      alert("File is too large. Please upload an image under 4MB, or use a Google Drive link.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      onChange(base64String);
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/80">{label}</label>
      
      <div className="flex gap-2 bg-secondary/10 p-1 rounded-lg w-fit mb-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${mode === "url" ? "bg-white shadow-sm text-primary" : "text-foreground/60 hover:text-foreground"}`}
        >
          <LinkIcon size={14} /> URL / Drive Link
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${mode === "upload" ? "bg-white shadow-sm text-primary" : "text-foreground/60 hover:text-foreground"}`}
        >
          <Upload size={14} /> Upload Image
        </button>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={handleDriveUrl}
          placeholder={placeholder || "Paste image URL or Google Drive link..."}
          className="w-full px-4 py-2 border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
        />
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="w-full text-sm text-foreground/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer border border-secondary/20 rounded-xl"
          />
        </div>
      )}
      
      {/* Image Preview */}
      {value && (
        <div className="mt-3 relative w-full max-w-sm h-48 rounded-xl border border-secondary/20 overflow-hidden bg-secondary/5 flex items-center justify-center group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
          }} />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
