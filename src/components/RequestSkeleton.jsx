export const RequestSkeleton = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36" />
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-0.5" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56" />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        </div>
    );
};