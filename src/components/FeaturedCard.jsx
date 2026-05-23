"use client"
import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Calendar, Eye, MapPin, PawPrint, ShoppingBag, Syringe } from 'lucide-react';


const FeaturedCard = ({ styles, pet, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/50 dark:border-gray-700/50 transition-all duration-300 h-full flex flex-col">
                {/* Pet Image */}
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={pet.image}
                        alt={pet.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Vaccinated Badge */}
                    {pet.vaccinated ? (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                            <Syringe size={10} />
                            Vaccinated
                        </div>
                    ) : (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                            <Syringe size={10} />
                            Not Vaccinated
                        </div>
                    )}

                    {/* Species Badge */}
                    <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${styles.badgeColor} backdrop-blur-sm`}>
                            <span className="text-xs font-semibold">{pet.species}</span>
                        </div>
                    </div>
                </div>

                {/* Pet Info */}
                <div className="p-5 flex-1 flex flex-col">
                    {/* Name and Breed */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {pet.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {pet.breed}
                            </p>
                        </div>
                        <div className={`p-2 rounded-xl ${styles.bgColor}`}>
                            <PawPrint size={16} className={styles.iconColor} />
                        </div>
                    </div>

                    {/* Location and Age */}
                    <div className="flex flex-wrap gap-3 mt-2 mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin size={12} className="text-teal-500" />
                            {pet.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar size={12} className="text-teal-500" />
                            {pet.age}
                        </div>
                    </div>

                    {/* Adoption Fee */}
                    <div className="mb-4">
                        <span className="text-amber-600 dark:text-amber-400 font-semibold text-lg">
                            ${pet.fee}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400"> adoption fee</span>
                    </div>

                    {/* Button Group */}
                    <div className="flex gap-2 mt-auto">
                        {/* View Details Button */}
                        <Link href={`/all-pets/${pet._id}`} className="flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full cursor-pointer flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${styles.buttonColor} text-gray-700 dark:text-gray-300`}
                            >
                                <Eye size={16} />
                                View Details
                            </motion.button>
                        </Link>

                        {/* Adopt Now Button */}
                        <Link href={`/adopt/${pet._id}`} className="flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full cursor-pointer flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <ShoppingBag size={16} />
                                Adopt Now
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedCard;