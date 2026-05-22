// app/loading.jsx
import React from "react";
import { PawPrint, Heart } from "lucide-react";

const GlobalLoading = () => {
    // Static messages array - will rotate using CSS animation instead of JS
    const messages = [
        "Finding your perfect companion...",
        "Loading adorable pets...",
        "Preparing heartwarming stories...",
        "Almost there...",
        "Getting ready to show you amazing pets..."
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">

                {/* Loading Text with CSS Animation */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent mb-3">
                    PetNest
                </h2>
                
                <div className="h-12 overflow-hidden">
                    <div className="animate-slide-messages">
                        {messages.map((message, index) => (
                            <p key={index} className="text-gray-600 dark:text-gray-300 font-medium h-12 flex items-center justify-center">
                                {message}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Animated Dots */}
                <div className="mt-8 flex justify-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>

                {/* Loading Bar */}
                <div className="mt-8 w-48 mx-auto">
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-loading" />
                    </div>
                </div>

                {/* Fun Fact */}
                <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Heart size={12} className="text-rose-500" />
                        <span>Did you know? Over 10,000 pets have found loving homes through PetNest!</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GlobalLoading;