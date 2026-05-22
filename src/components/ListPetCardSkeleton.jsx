export const ListPetCardSkeleton = () => {
    return (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden animate-pulse">
            <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image Skeleton */}
                    <div className="w-full sm:w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />

                    <div className="flex-1">
                        {/* Name Skeleton */}
                        <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />

                        {/* Details Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                        </div>

                        {/* Fee Skeleton */}
                        <div className="flex items-center gap-3 mt-2">
                            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex sm:flex-col gap-2">
                        <div className="p-2">
                            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        </div>
                        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};