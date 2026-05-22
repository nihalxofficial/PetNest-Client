export const FeaturedCardSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/50 dark:border-gray-700/50 transition-all duration-300 h-full flex flex-col">
        {/* Image Skeleton */}
        <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700" />

        {/* Pet Info Skeleton */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Name and Breed Skeleton */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>

          {/* Location and Age Skeleton */}
          <div className="flex flex-wrap gap-3 mt-2 mb-3">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>

          {/* Adoption Fee Skeleton */}
          <div className="mb-4">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* Button Group Skeleton */}
          <div className="flex gap-2 mt-auto">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};