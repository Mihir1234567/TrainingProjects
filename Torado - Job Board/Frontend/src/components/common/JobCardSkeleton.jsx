import React from "react";

const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-100 rounded"></div>
            <div className="h-3 w-20 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="h-4 w-16 bg-slate-100 rounded"></div>
      </div>

      {/* Meta Skeleton */}
      <div className="flex gap-6">
        <div className="h-4 w-24 bg-slate-100 rounded"></div>
        <div className="h-4 w-24 bg-slate-100 rounded"></div>
      </div>

      {/* Title Skeleton */}
      <div className="h-8 w-full bg-slate-100 rounded"></div>

      {/* Separator */}
      <div className="h-[1px] bg-slate-50 w-full"></div>

      {/* Details Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3 w-12 bg-slate-100 rounded"></div>
          <div className="h-5 w-24 bg-slate-100 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-12 bg-slate-100 rounded"></div>
          <div className="h-5 w-24 bg-slate-100 rounded"></div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="h-[1px] bg-slate-50 w-full mt-auto"></div>
      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-100 rounded"></div>
          <div className="h-3 w-24 bg-slate-100 rounded"></div>
        </div>
        <div className="flex gap-3">
          <div className="w-11 h-11 bg-slate-100 rounded-lg"></div>
          <div className="w-32 h-11 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
