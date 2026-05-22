"use client";

import React, { useEffect, useState } from "react";
import {
    Search,
    Filter,
    Grid3x3,
    LayoutList,
    Heart,
    PawPrint,
    MapPin,
    Calendar,
    Syringe,
    X,
    ChevronDown,
    VenetianMask,
    Eye,
    ShoppingBag,
    Frown,
    Sparkles,
} from "lucide-react";

import { getPets } from "@/lib/pets/data";
import SearchBar from "@/components/SearchBar";
import { useSearchParams } from "next/navigation";
import TabFilter from "@/components/TabFilter";
import Sorting from "@/components/Sorting";
import GridPetCard from "@/components/GridPetCard";
import ListPetCard from "@/components/ListPetCard";
import { GridPetCardSkeleton } from "@/components/GridPetCardSkeleton";
import { ListPetCardSkeleton } from "@/components/ListPetCardSkeleton";
import Link from "next/link";

const AllPetsPage = () => {

    const [viewMode, setViewMode] = useState("grid");
    const [selectedSpecies, setSelectedSpecies] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleSpecies = (species) => {
        setSelectedSpecies((prev) =>
            prev.includes(species) ? prev.filter((s) => s !== species) : [...prev, species]
        );
    };

    const toggleSize = (size) => {
        setSelectedSize((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const [petsData, setPetsData] = useState([])
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchPets = async () => {
            setIsLoading(true);
            const data = await getPets({
                search: searchParams.get("search") || "",
                species: searchParams.get("species") || "",
                sort: searchParams.get("sort") || "price_low",
                // fee: searchParams.get("fee") || "",
            });
            setPetsData(data)
            setIsLoading(false);
        }

        fetchPets()
    }, [searchParams])


    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Find Your Perfect Companion
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Browse through our lovely pets waiting for their forever home
                    </p>
                </div>

                {/* Search and Sort Bar */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        <SearchBar />

                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 text-sm font-medium"
                                >
                                    <Filter size={16} />
                                    Filters
                                </button>
                            </div>

                            <Sorting />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2.5 rounded-full transition-all cursor-pointer ${viewMode === "grid"
                                        ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-md"
                                        : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    <Grid3x3 size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2.5 rounded-full transition-all cursor-pointer ${viewMode === "list"
                                        ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-md"
                                        : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    <LayoutList size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - STICKY */}
                    <div
                        className={`lg:block ${isFilterOpen ? "block" : "hidden"
                            } lg:block w-full lg:w-80 shrink-0`}
                    >
                        <div className="sticky top-24">
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Filter size={18} className="text-teal-500" />
                                        Filters
                                    </h3>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="lg:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Species</h4>
                                    <div className="space-y-2">
                                        {["dog", "cat", "bird", "rabbit"].map((species) => (
                                            <label key={species} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSpecies.includes(species)}
                                                    onChange={() => toggleSpecies(species)}
                                                    className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                                    {species}s
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Price Range</h4>
                                    <div className="space-y-3">
                                        <input
                                            type="range"
                                            min="0"
                                            max="200"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>${priceRange[0]}</span>
                                            <span>${priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">More Filters</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Vaccinated</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Healthy</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Available</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Adopted</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button className="flex-1 cursor-pointer px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                        Reset All
                                    </button>
                                    <button className="flex-1 cursor-pointer px-4 py-2 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-medium hover:shadow-lg transition">
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pets Grid/List */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {petsData.length} pets
                            </p>
                            <TabFilter />
                        </div>

                        {/* Loading Skeletons */}
                        {isLoading && viewMode === "grid" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <GridPetCardSkeleton key={index} />
                                ))}
                            </div>
                        )}

                        {isLoading && viewMode === "list" && (
                            <div className="space-y-4">
                                {[...Array(4)].map((_, index) => (
                                    <ListPetCardSkeleton key={index} />
                                ))}
                            </div>
                        )}

                        {/* No Pets Available Section */}
                        {!isLoading && petsData.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                {/* Animated Icon */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 rounded-full bg-amber-500/10 animate-ping" />
                                    </div>
                                    <div className="relative bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 p-5 rounded-full">
                                        <Frown size={48} className="text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    No Pets Available
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                                    We couldn&apos;t find any pets matching your criteria. Try adjusting your filters or check back later for new arrivals.
                                </p>

                                {/* Suggestions */}
                                {/* <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 max-w-sm mx-auto mb-6">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-center gap-2">
                                        <Sparkles size={14} className="text-teal-500" />
                                        Suggestions
                                        <Sparkles size={14} className="text-teal-500" />
                                    </p>
                                    <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                        <li>• Try removing some filters</li>
                                        <li>• Check the &quot;Available&quot; filter option</li>
                                        <li>• Browse all pets without species restrictions</li>
                                        <li>• Check back soon as new pets are added daily</li>
                                    </ul>
                                </div> */}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedSpecies([]);
                                            setPriceRange([0, 200]);
                                        }}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-medium rounded-full hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-300"
                                    >
                                        <X size={16} />
                                        <Link href={"/all-pets"}>

                                            Reset All Filters
                                        </Link>
                                    </button>
                                    <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-600 to-emerald-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                                        <PawPrint size={16} />
                                        <Link href="/">
                                            Back to Home
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Grid View */}
                        {!isLoading && petsData.length > 0 && viewMode === "grid" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {petsData.map((pet) => (
                                    <GridPetCard key={pet._id} pet={pet} />
                                ))}
                            </div>
                        )}

                        {/* List View */}
                        {!isLoading && petsData.length > 0 && viewMode === "list" && (
                            <div className="space-y-4">
                                {petsData.map((pet) => (
                                    <ListPetCard key={pet._id} pet={pet} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPetsPage;