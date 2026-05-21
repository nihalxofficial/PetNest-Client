"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const TabFilter = () => {
    const [activeTab, setActiveTab] = useState("All");
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = (tab) => {
        const params = new URLSearchParams(searchParams.toString())
        if (tab && tab !== "All") {
            params.set("species", tab.toLowerCase().slice(0, -1))
        } else {
            params.delete("species")
        }
        router.push(`/all-pets?${params.toString()}`)
    }
    return (
        <div className="flex gap-1 bg-teal-100 dark:bg-teal-900/50 rounded-full p-1">
            {["All", "Dogs", "Cats", "Birds", "Rabbits"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => {
                        setActiveTab(tab)
                        handleSearch(tab)
                    }}
                    className={`px-4 py-1.5 text-sm cursor-pointer rounded-full transition-all ${activeTab === tab
                        ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-teal-200 dark:hover:bg-teal-800/50"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabFilter;