import React from "react";
import Skeleton from "../common/Skeleton";

const ProductCardSkeleton = ({ variant = "default" }) => {
  const isSmall = variant === "small";

  return (
    <div className="flex flex-col flex-shrink-0 w-full bg-white rounded-xl overflow-hidden">
      {/* Image Skeleton */}
      <div className="w-full aspect-[2/3] relative">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Badge Skeleton */}
        <Skeleton className="absolute top-2 left-2 w-10 h-10 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className={`flex flex-col items-center p-4 space-y-3`}>
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        {/* Author */}
        <Skeleton className="h-4 w-1/2" />
        {/* Price */}
        <Skeleton className="h-8 w-1/3 mt-2" />

        {/* Button (only visible on hover normally, but we can show it or just space for it) */}
        <div className="w-full pt-4">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
