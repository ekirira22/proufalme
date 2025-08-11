"use client"

const SongSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 animate-pulse">
      <div className="bg-neutral-800 rounded-md overflow-hidden w-full aspect-square" />
      <div className="w-full">
        <div className="h-4 bg-neutral-800 rounded mb-2"></div>
        <div className="h-3 bg-neutral-800 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default SongSkeleton;