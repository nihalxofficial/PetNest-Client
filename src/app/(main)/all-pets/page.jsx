"use client";

import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Chip,
    Pagination,
    Select,
    Label,
    ListBox,
} from "@heroui/react";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPets } from "@/lib/pets/data";
import SearchBar from "@/components/SearchBar";
import { useSearchParams } from "next/navigation";

const AllPetsPage = () => {

    const [viewMode, setViewMode] = useState("grid");
    const [selectedSpecies, setSelectedSpecies] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [sortBy, setSortBy] = useState("price_low");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);

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
            // const data = await getPets(searchParams.get("search"));
            const data = await getPets({ search: searchParams.get("search") || "" });
            setPetsData(data)
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

                        <SearchBar/>

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

                            <div className="relative">
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
                                                onClick={() => {
                                                    setSortBy(option.id);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full cursor-pointer text-left px-4 py-2.5 text-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors ${sortBy === option.id ? 'text-teal-600 dark:text-teal-400 font-medium bg-teal-50/50 dark:bg-teal-900/20' : 'text-gray-700 dark:text-gray-300'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

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
                    {/* Sidebar Filters */}
                    <div
                        className={`lg:block ${isFilterOpen ? "block" : "hidden"
                            } lg:block w-full lg:w-80 shrink-0`}
                    >
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

                            {/* <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Size</h4>
                                <div className="space-y-2">
                                    {["male", "female"].map((size) => (
                                        <label key={size} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSize.includes(size)}
                                                onChange={() => toggleSize(size)}
                                                className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                                {size}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div> */}

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

                    {/* Pets Grid/List */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {petsData.length} pets
                            </p>
                            <div className="flex gap-1 bg-teal-100 dark:bg-teal-900/50 rounded-full p-1">
                                {["All", "Dogs", "Cats", "Others"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 text-sm rounded-full transition-all ${activeTab === tab
                                            ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-sm"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-teal-200 dark:hover:bg-teal-800/50"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid View */}
                        {viewMode === "grid" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {petsData.map((pet) => (
                                    <div
                                        key={pet.id}
                                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* Pet Image */}
                                        <div className="relative">
                                            <Image
                                                height={500}
                                                width={500}
                                                src={pet.image}
                                                alt={pet.name}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <button className="absolute top-2 left-2 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full hover:scale-110 transition">
                                                <Heart size={16} className="text-gray-600 dark:text-gray-400 hover:text-red-500" />
                                            </button>
                                        </div>

                                        <div className="p-4">
                                            {/* Pet Name */}
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                {pet.name}
                                            </h3>

                                            {/* Species and Breed */}
                                            <div className="space-y-1.5 mb-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-gray-500 dark:text-gray-400">Species:</span>
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{pet.species}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-gray-500 dark:text-gray-400">Breed:</span>
                                                    <span className="text-gray-700 dark:text-gray-300">{pet.breed}</span>
                                                </div>
                                            </div>

                                            {/* Age and Gender - Side by Side */}
                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                                                    <Calendar size={14} className="text-teal-500" />
                                                    {pet.age}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                                                    <VenetianMask size={14} className="text-teal-500" />
                                                    {pet.gender}
                                                </div>
                                            </div>

                                            {/* Location and Vaccinated - Side by Side */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                                                    <MapPin size={14} className="text-teal-500" />
                                                    {pet.location}
                                                </div>
                                                {pet.vaccinated && (
                                                    <div className="flex items-center gap-1.5 text-sm text-green-600">
                                                        <Syringe size={14} />
                                                        Vaccinated
                                                    </div>
                                                )}
                                            </div>

                                            {/* Adoption Fee */}
                                            <div className="mb-3">
                                                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                                                    ${pet.fee}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">adoption fee</span>
                                            </div>

                                            {/* Two Buttons */}
                                            <div className="flex gap-2">
                                                <Link href={`/pets/${pet.id}`} className="flex-1">
                                                    <button className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 rounded-full border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-medium hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-300 text-sm">
                                                        <Eye size={14} />
                                                        View Details
                                                    </button>
                                                </Link>
                                                <Link href={`/adopt/${pet.id}`} className="flex-1">
                                                    <button className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-medium hover:shadow-lg transition-all duration-300 text-sm">
                                                        <ShoppingBag size={14} />
                                                        Adopt Now
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* List View */}
                        {viewMode === "list" && (
                            <div className="space-y-4">
                                {petsData.map((pet) => (
                                    <div
                                        key={pet.id}
                                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="p-4">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <Image
                                                    height={500}
                                                    width={500}
                                                    src={pet.image}
                                                    alt={pet.name}
                                                    className="w-full sm:w-32 h-32 object-cover rounded-xl"
                                                />

                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                        {pet.name}
                                                    </h3>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-2">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <span className="text-gray-500 dark:text-gray-400">Species:</span>
                                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{pet.species}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <span className="text-gray-500 dark:text-gray-400">Breed:</span>
                                                            <span className="text-gray-700 dark:text-gray-300">{pet.breed}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                                                            <Calendar size={14} className="text-teal-500" />
                                                            {pet.age}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                                                            <VenetianMask size={14} className="text-teal-500" />
                                                            {pet.gender}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                                                            <MapPin size={14} className="text-teal-500" />
                                                            {pet.location}
                                                        </div>
                                                        {pet.vaccinated && (
                                                            <div className="flex items-center gap-1.5 text-sm text-green-600">
                                                                <Syringe size={14} />
                                                                Vaccinated
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                                                            ${pet.fee}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">adoption fee</span>
                                                    </div>
                                                </div>

                                                <div className="flex sm:flex-col gap-2">
                                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                                        <Heart size={18} className="text-gray-600 dark:text-gray-400" />
                                                    </button>
                                                    <Link href={`/pets/${pet.id}`}>
                                                        <button className="px-4 cursor-pointer py-2 rounded-full border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-300 flex items-center gap-2">
                                                            <Eye size={14} />
                                                            View Details
                                                        </button>
                                                    </Link>
                                                    <Link href={`/adopt/${pet.id}`}>
                                                        <button className="px-4 py-2 cursor-pointer rounded-full bg-linear-to-r from-teal-600 to-emerald-500 text-white text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                                                            <ShoppingBag size={14} />
                                                            Adopt Now
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
