// app/not-found.jsx
import React from "react";
import Link from "next/link";
import { PawPrint, Home, Search, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30 flex items-center justify-center py-12 px-4">
            <div className="text-center max-w-lg mx-auto">
                {/* Animated Illustration */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-teal-500/10 animate-pulse" />
                    </div>
                    <div className="relative">
                        <div className="text-8xl mb-2 animate-bounce">🐕</div>
                        {/* <div className="text-5xl absolute -top-4 -right-4 animate-bounce delay-150">❓</div> */}
                    </div>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent mb-4">
                    404
                </h1>
                
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Lost Your Way?
                </h2>
                
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-600 to-emerald-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all">
                            <Home size={16} />
                            Home
                        </button>
                    </Link>
                    <Link href="/all-pets">
                        <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-medium rounded-full hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all">
                            <Search size={16} />
                            Browse Pets
                        </button>
                    </Link>
                </div>

                <div className="mt-8">
                    <Link href="/" className="inline-flex cursor-pointer items-center gap-1 text-sm text-gray-500 hover:text-teal-600 transition-colors">
                        <ArrowLeft size={14} />
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;