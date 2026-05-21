"use client"
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';



const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (searchQuery) {
            params.set("search", searchQuery)
        } else {
            params.delete("search")
        }
        router.push(`/all-pets?${params.toString()}`)
    }
    return (
        <div className="w-full md:w-80 relative">
            <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm"
            />
            <Search
                size={16}
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
        </div>
    );
};

export default SearchBar;