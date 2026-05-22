export const GridPetCardSkeleton = () => {
    return (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="relative">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="p-4">
                {/* Pet Name Skeleton */}
                <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />

                {/* Species and Breed Skeleton */}
                <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>

                {/* Age and Gender Skeleton */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>

                {/* Location Skeleton */}
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                {/* Adoption Fee Skeleton */}
                <div className="mb-3">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-2">
                    <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
            </div>
        </div>
    );
};