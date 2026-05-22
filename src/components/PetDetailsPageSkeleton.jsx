import { Card } from "@heroui/react";

export const PetDetailsPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30 py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Back Button Skeleton */}
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 animate-pulse" />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Pet Information Skeleton */}
                    <div className="flex-1 space-y-6">
                        {/* Pet Image Card Skeleton */}
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden animate-pulse">
                            <div className="relative h-96 md:h-125 bg-gray-200 dark:bg-gray-700">
                                <div className="absolute top-4 right-4">
                                    <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                </div>
                            </div>
                        </Card>

                        {/* Pet Name and Basic Info Skeleton */}
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                            <div className="p-6 animate-pulse">
                                <div className="flex justify-between items-start flex-wrap gap-4">
                                    <div>
                                        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                    </div>
                                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                                {/* Pet Details Grid Skeleton */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div>
                                            <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div>
                                            <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div>
                                            <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                    </div>
                                </div>

                                {/* Health Status Section Skeleton */}
                                <div className="mt-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                        <div className="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                        <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                        <div className="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                    </div>
                                </div>

                                {/* Description Skeleton */}
                                <div className="mt-6">
                                    <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div className="h-4 w-10/12 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div className="h-4 w-9/12 bg-gray-200 dark:bg-gray-700 rounded" />
                                    </div>
                                </div>

                                {/* Owner Info Skeleton */}
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                        <div>
                                            <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Adoption Form Skeleton */}
                    <div className="lg:w-96">
                        <Card className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 animate-pulse">
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

                                <div className="space-y-4">
                                    {/* Pet Name Skeleton */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                    </div>

                                    {/* User Name Skeleton */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                    </div>

                                    {/* User Email Skeleton */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                    </div>

                                    {/* Pickup Date Skeleton */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                    </div>

                                    {/* Message Skeleton */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                        </div>
                                        <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                    </div>

                                    {/* Status Note Skeleton */}
                                    <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />

                                    {/* Button Skeleton */}
                                    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};