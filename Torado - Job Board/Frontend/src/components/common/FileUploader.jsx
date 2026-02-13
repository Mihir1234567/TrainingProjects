import React, { useState, useEffect } from "react";
import { uploadAPI, API_BASE_URL } from "../../services/api";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import ImageCropper from "./ImageCropper";

const FileUploader = ({
  onUploadSuccess,
  initialValue = "",
  initialCrop = null,
  label = "Upload File",
  accept = "image/*,.pdf",
  isCircular = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);

  // Cropper State
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropData, setCropData] = useState(null);

  // Initialize with initialValue
  useEffect(() => {
    if (initialValue) {
      if (initialValue.startsWith("/")) {
        setFileUrl(`${API_BASE_URL}${initialValue}`);
      } else {
        setFileUrl(initialValue);
      }
    }
  }, [initialValue]);

  // Initialize crop data
  useEffect(() => {
    if (initialCrop) {
      setCropData(initialCrop);
    }
  }, [initialCrop]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setSelectedFile(file); // Store original file

    // If it's an image and circular crop is enabled, start cropping flow
    if (isCircular && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setTempImageSrc(reader.result);
        setOriginalImage(reader.result); // Save original for re-cropping
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
      e.target.value = null; // Reset input to allow re-selection
      return;
    }

    // Otherwise standard upload
    await uploadFile(file);
  };

  const uploadFile = async (file, currentCrop = null) => {
    setUploading(true);
    try {
      const path = await uploadAPI.uploadFile(file);
      // If path is absolute (Cloudinary), use as is. If relative (local), prepend base.
      const fullUrl = path.startsWith("/") ? `${API_BASE_URL}${path}` : path;
      setFileUrl(fullUrl);
      if (currentCrop) setCropData(currentCrop);

      if (onUploadSuccess) onUploadSuccess(path, currentCrop);
      setShowCropper(false);
      setTempImageSrc(null);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setFileUrl(null);
    setOriginalImage(null); // Clear original on remove
    setCropData(null);
    if (onUploadSuccess) onUploadSuccess("", null);
  };

  const handleReCrop = () => {
    if (originalImage) {
      setTempImageSrc(originalImage);
      setShowCropper(true);
    } else if (fileUrl) {
      setTempImageSrc(fileUrl);
      setShowCropper(true);
    }
  };

  const getPreviewStyle = () => {
    // If circular, we ignore cropData because the image is already pre-cropped to be a perfect circle/square
    // Applying zoom/pan again would double-crop it.
    if (!cropData || isCircular)
      return {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      };

    // Calculate CSS to zoom/pan the image to match croppedArea percentages
    // cropData = { x, y, width, height } as percentages

    // Avoid division by zero
    const widthPct = cropData.width || 100;
    const heightPct = cropData.height || 100;

    const scaleX = 100 / widthPct;
    const scaleY = 100 / heightPct;

    const left = -(cropData.x / 100) * scaleX * 100;
    const top = -(cropData.y / 100) * scaleY * 100;

    return {
      width: `${scaleX * 100}%`,
      height: `${scaleY * 100}%`,
      position: "absolute",
      left: `${left}%`,
      top: `${top}%`,
      maxWidth: "none",
      maxHeight: "none",
      objectFit: "fill", // We control sizing manually
    };
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      {!fileUrl ? (
        <label className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-[#5BBB7B] hover:bg-[#5BBB7B]/5 transition-all duration-300 cursor-pointer relative group flex flex-col items-center justify-center min-h-[200px]">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            disabled={uploading}
          />
          <div className="flex flex-col items-center justify-center text-slate-500 transition-transform duration-300 group-hover:-translate-y-1">
            {uploading ? (
              <div className="relative">
                <div className="absolute inset-0 bg-[#5BBB7B]/20 rounded-full animate-ping opacity-75"></div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md relative z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-[#5BBB7B]" />
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#5BBB7B] transition-colors duration-300" />
              </div>
            )}
            <p className="text-base font-semibold text-slate-700 group-hover:text-[#5BBB7B] transition-colors">
              {uploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </label>
      ) : (
        <div
          className={`relative group overflow-hidden border border-slate-200 bg-white w-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-500 ease-out ${
            isCircular
              ? "aspect-square max-w-[220px] rounded-full mx-auto"
              : "aspect-video max-w-md rounded-2xl"
          }`}
        >
          {/* Preview Image */}
          {fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ||
          fileUrl.includes("blob:") ||
          fileUrl.includes("/uploads/") ? (
            <img
              src={fileUrl}
              alt="Preview"
              style={getPreviewStyle()}
              className={`transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:blur-[1px] ${
                !cropData
                  ? isCircular
                    ? "w-full h-full object-cover"
                    : "w-full h-full object-contain"
                  : ""
              }`}
            />
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <ImageIcon size={48} />
              <span className="text-sm font-medium mt-2">File Uploaded</span>
            </div>
          )}

          {/* Floating Actions - Minimalist Green Theme */}

          {/* Centered Overlay Actions - Green Theme */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-black/20 backdrop-blur-[2px]">
            {/* Change Image Button */}
            <label
              className="cursor-pointer bg-[#5BBB7B] hover:bg-[#4ea86b] text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center"
              title="Change Image"
            >
              <Upload size={24} />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept={accept}
              />
            </label>

            {/* Crop Button (If applicable) */}
            {isCircular && (originalImage || fileUrl) && (
              <button
                onClick={handleReCrop}
                className="cursor-pointer bg-white hover:bg-slate-50 text-slate-700 hover:text-[#5BBB7B] p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:scale-110 hover:shadow-xl flex items-center justify-center"
                type="button"
                title="Crop Image"
              >
                <ImageIcon size={24} />
              </button>
            )}

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:scale-110 hover:shadow-xl flex items-center justify-center"
              type="button"
              title="Remove Image"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Cropper Modal */}
      {showCropper && tempImageSrc && (
        <ImageCropper
          imageSrc={tempImageSrc}
          isCircular={isCircular}
          onCancel={() => {
            setShowCropper(false);
            setTempImageSrc(null);
          }}
          onCropComplete={(croppedBlob, newCropData) => {
            // ALWAYS upload the cropped blob if available
            // This ensures the backend receives the cropped version, not the original
            const file = new File([croppedBlob], "cropped-image.png", {
              type: "image/png",
            });

            // Upload the cropped file.
            // We pass newCropData just to update local state if needed, but the image itself is now "baked".
            // Actually, we can still pass cropData in case we want to re-crop later from original,
            // but for display purposes in other components (Recruiters, Jobs), the image will be correct.
            return uploadFile(file, newCropData);
          }}
        />
      )}
    </div>
  );
};

export default FileUploader;
