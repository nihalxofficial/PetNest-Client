import { Card } from "@heroui/react";

export const ListingSkeleton = () => {
    return (
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden animate-pulse">
            <div className="flex flex-col sm:flex-row">
                {/* Image Skeleton */}
                <div className="relative w-full sm:w-40 h-40 sm:h-auto bg-gray-200 dark:bg-gray-700" />
                
                {/* Content Skeleton */}
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40" />
                        </div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                    </div>

                    <div className="flex flex-wrap gap-3 mb-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    </div>
                </div>
            </div>
        </Card>
    );
};