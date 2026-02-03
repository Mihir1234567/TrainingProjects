import React, { useState } from "react";
import { uploadAPI } from "../../services/api";
import { Upload, X, Loader2 } from "lucide-react";

const FileUploader = ({
  onUploadSuccess,
  label = "Upload File",
  accept = "image/*,.pdf",
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const path = await uploadAPI.uploadFile(file);
      // The backend returns a relative path like /uploads/file.jpg.
      // We need to prepend the backend URL for display if it's served statically from there.
      // However, for saving to DB, we keep the relative path.

      const fullUrl = `http://localhost:5001${path}`; // hardcoded base URL for now or use env
      setFileUrl(fullUrl);
      if (onUploadSuccess) onUploadSuccess(path); // Pass relative path to parent
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFileUrl(null);
    if (onUploadSuccess) onUploadSuccess(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      {!fileUrl ? (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-50 transition-colors cursor-pointer relative">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept={accept}
            disabled={uploading}
          />
          <div className="flex flex-col items-center justify-center text-slate-500">
            {uploading ? (
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-600" />
            ) : (
              <Upload className="w-8 h-8 mb-2" />
            )}
            <p className="text-sm font-medium">
              {uploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative border rounded-lg p-2 flex items-center gap-3 bg-slate-50">
          {fileUrl.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
            <img
              src={fileUrl}
              alt="Uploaded"
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded text-blue-600 font-bold">
              DOC
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <p
              className="text-sm font-medium truncate text-blue-600 underline cursor-pointer"
              onClick={() => window.open(fileUrl, "_blank")}
            >
              View File
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-slate-200 rounded-full text-slate-500"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileUploader;
