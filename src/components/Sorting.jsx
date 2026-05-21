"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const Sorting = () => {
    const [sortBy, setSortBy] = useState("price_low");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const sortOptions = [
        { id: "price_low", label: "Price: Low to High" },
        { id: "price_high", label: "Price: High to Low" },
        { id: "name_asc", label: "Name: A to Z" },
        { id: "name_desc", label: "Name: Z to A" },
    ];

    const getSortLabel = () => {
        const option = sortOptions.find(opt => opt.id === sortBy);
        return option ? option.label : "Sort by";
    };

    const handleSort = (id) => {
        setSortBy(id);
        setIsSortOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", id);
        router.push(`/all-pets?${params.toString()}`);
    };

    return (
        <div className="relative border rounded-full">
            <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 text-sm min-w-40"
            >
                <span>{getSortLabel()}</span>
                <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/50 dark:border-gray-700/50 z-20 shadow-lg overflow-hidden">
                    {sortOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSort(option.id)}
                            className={`w-full cursor-pointer text-left px-4 py-2.5 text-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors ${sortBy === option.id ? 'text-teal-600 dark:text-teal-400 font-medium bg-teal-50/50 dark:bg-teal-900/20' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sorting;