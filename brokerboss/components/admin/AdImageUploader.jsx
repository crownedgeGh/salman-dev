"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, ImageIcon } from "lucide-react";

export default function AdImageUploader({ label, aspectRatio = "16/9", onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [hovering, setHovering] = useState(false);
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);

  const handleClick = () => {
    if (!preview) inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous object URL
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    onFileSelect?.(file, url);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreview(null);
    onFileSelect?.(null, null);
  };

  // Determine padding-top trick for aspect ratio fallback (some older browsers)
  // Using Tailwind's aspect-ratio utilities where possible
  const isPortrait = aspectRatio === "9/16";

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 mb-0.5">
        <ImageIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">
          {aspectRatio}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-xl border-2 border-dashed border-border transition-all duration-200 cursor-pointer group"
        style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {preview ? (
          <>
            {/* Preview Image */}
            <img
              src={preview}
              alt="Ad preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Hover overlay */}
            <div
              className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-200 ${
                hovering ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full">
                Click × to remove
              </span>
            </div>
            {/* Clear button */}
            <button
              onClick={handleClear}
              className={`absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 ${
                hovering ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              aria-label="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          /* Upload placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 hover:bg-muted/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
              <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Click to upload</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PNG, JPG, WebP accepted
              </p>
              {!isPortrait && (
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Recommended: 1920 × 1080 px
                </p>
              )}
              {isPortrait && (
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Recommended: 1080 × 1920 px
                </p>
              )}
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
