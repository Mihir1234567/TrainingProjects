import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Check } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

// Helper to create the cropped image
const createCroppedImg = async (imageSrc, pixelCrop, isCircular = false) => {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous"); // Enable CORS
  // Only append cache buster for remote URLs, not Data or Blob URLs
  const isDataOrBlob =
    imageSrc.startsWith("data:") || imageSrc.startsWith("blob:");
  image.src = isDataOrBlob ? imageSrc : imageSrc + "?not-from-cache-please";
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // If circular, we need to create a circular clipping path
  if (isCircular) {
    ctx.beginPath();
    ctx.arc(
      pixelCrop.width / 2,
      pixelCrop.height / 2,
      pixelCrop.width / 2,
      0,
      2 * Math.PI,
    );
    ctx.clip();
  }

  // Draw the image at the calculated offset
  // pixelCrop.x/y will be negative if the image is smaller than the crop area (zoomed out)
  // We use the simple drawImage overload to draw the whole image at the correct offset
  ctx.drawImage(image, -pixelCrop.x, -pixelCrop.y);

  // Return as PNG to preserve transparency
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png");
  });
};

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  onCancel,
  aspect = 1,
  isCircular = false,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedArea(croppedArea);
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      const croppedBlob = await createCroppedImg(
        imageSrc,
        croppedAreaPixels,
        isCircular,
      );
      await onCropComplete(croppedBlob, croppedArea);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Close Button - Top Right */}
      <button
        onClick={onCancel}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
      >
        <X size={28} />
      </button>

      {/* Main Cropper Area */}
      <div className="relative w-full max-w-2xl h-[50vh] sm:h-[60vh] rounded-xl overflow-hidden shadow-2xl bg-black/50 mb-8 ring-1 ring-white/10">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={isCircular ? "round" : "rect"}
          showGrid={!isCircular}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
          restrictPosition={false}
        />
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all">
        <div className="space-y-6">
          {/* Zoom Control */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 min-w-[3rem]">
              Zoom
            </span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5BBB7B]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <AnimatedButton
              onClick={handleSave}
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Processing..." : "Save Selection"}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
