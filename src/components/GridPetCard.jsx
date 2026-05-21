import { Calendar, Eye, Heart, MapPin, ShoppingBag, Syringe, VenetianMask } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from "next/link";

const GridPetCard = ({pet}) => {
    return (
        <div 
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
                    <Link href={`/all-pets/${pet._id}`} className="flex-1">
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 rounded-full border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-medium hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-300 text-sm">
                            <Eye size={14} />
                            View Details
                        </button>
                    </Link>
                    <Link href={`/adopt/${pet._id}`} className="flex-1">
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-medium hover:shadow-lg transition-all duration-300 text-sm">
                            <ShoppingBag size={14} />
                            Adopt Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GridPetCard;