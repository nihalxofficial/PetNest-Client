import { Calendar, Eye, Heart, MapPin, ShoppingBag, Syringe, VenetianMask } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from "next/link";


const ListPetCard = ({pet}) => {
    return (
        <div
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
                            {pet.vaccinated ? (
                                <div className="flex items-center gap-1.5 text-sm text-green-600">
                                    <Syringe size={14} />
                                    Vaccinated
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 text-sm text-red-500">
                                    <Syringe size={14} />
                                    Not Vaccinated
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
                        <Link href={`/all-pets/${pet._id}`}>
                            <button className="px-4 cursor-pointer py-2 rounded-full border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 text-sm font-medium hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-300 flex items-center gap-2">
                                <Eye size={14} />
                                View Details
                            </button>
                        </Link>
                        <Link href={`/adopt/${pet._id}`}>
                            <button className="px-4 py-2 cursor-pointer rounded-full bg-linear-to-r from-teal-600 to-emerald-500 text-white text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                                <ShoppingBag size={14} />
                                Adopt Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPetCard;