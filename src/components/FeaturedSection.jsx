"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  PawPrint,
  Eye,
  ShoppingBag,
  MapPin,
  Calendar,
  Syringe,
  Heart,
} from "lucide-react";

const featuredPetsData = [
  {
    _id: "1",
    name: "Luna",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    location: "Austin, TX",
    vaccinated: true,
    fee: 85,
    image: "/pets/luna.jpg",
    status: "available",
  },
  {
    _id: "2",
    name: "Oliver",
    species: "Cat",
    breed: "Maine Coon",
    age: "1.5 years",
    location: "Denver, CO",
    vaccinated: true,
    fee: 70,
    image: "/pets/oliver.jpg",
    status: "available",
  },
  {
    _id: "3",
    name: "Sunny",
    species: "Bird",
    breed: "Cockatiel",
    age: "8 months",
    location: "Seattle, WA",
    vaccinated: true,
    fee: 45,
    image: "/pets/sunny.jpg",
    status: "available",
  },
  {
    _id: "4",
    name: "Coco",
    species: "Rabbit",
    breed: "Holland Lop",
    age: "1 year",
    location: "Portland, OR",
    vaccinated: true,
    fee: 50,
    image: "/pets/coco.jpg",
    status: "available",
  },
  {
    _id: "5",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    location: "Chicago, IL",
    vaccinated: true,
    fee: 95,
    image: "/pets/rocky.jpg",
    status: "available",
  },
  {
    _id: "6",
    name: "Mochi",
    species: "Cat",
    breed: "Ragdoll",
    age: "6 months",
    location: "San Diego, CA",
    vaccinated: true,
    fee: 120,
    image: "/pets/mochi.jpg",
    status: "available",
  },
];

const FeaturedPetsSection = () => {
  // Helper function to get species-based styling (UI-only, not stored in DB)
  const getSpeciesStyles = (species) => {
    switch(species) {
      case 'Dog':
        return {
          bgColor: "bg-blue-100 dark:bg-blue-950/50",
          buttonColor: "hover:bg-blue-50 dark:hover:bg-blue-950/30 border-blue-200 dark:border-blue-800",
          iconColor: "text-blue-600 dark:text-blue-400",
          badgeColor: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        };
      case 'Cat':
        return {
          bgColor: "bg-teal-100 dark:bg-teal-950/50",
          buttonColor: "hover:bg-teal-50 dark:hover:bg-teal-950/30 border-teal-200 dark:border-teal-800",
          iconColor: "text-teal-600 dark:text-teal-400",
          badgeColor: "bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400"
        };
      case 'Bird':
        return {
          bgColor: "bg-amber-100 dark:bg-amber-950/50",
          buttonColor: "hover:bg-amber-50 dark:hover:bg-amber-950/30 border-amber-200 dark:border-amber-800",
          iconColor: "text-amber-600 dark:text-amber-400",
          badgeColor: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        };
      case 'Rabbit':
        return {
          bgColor: "bg-rose-100 dark:bg-rose-950/50",
          buttonColor: "hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-800",
          iconColor: "text-rose-600 dark:text-rose-400",
          badgeColor: "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
        };
      default:
        return {
          bgColor: "bg-gray-100 dark:bg-gray-950/50",
          buttonColor: "hover:bg-gray-50 dark:hover:bg-gray-950/30 border-gray-200 dark:border-gray-800",
          iconColor: "text-gray-600 dark:text-gray-400",
          badgeColor: "bg-gray-100 dark:bg-gray-950/50 text-gray-600 dark:text-gray-400"
        };
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold mb-4">
              <Heart size={12} className="fill-amber-500" />
              Meet Your Match
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Pets
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Meet adorable pets waiting for their forever home
            </p>
          </motion.div>
        </div>

        {/* Featured Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredPetsData.map((pet, index) => {
            const styles = getSpeciesStyles(pet.species);
            
            return (
              <motion.div
                key={pet._id}
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
                    {pet.vaccinated && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        <Syringe size={10} />
                        Vaccinated
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
                      <Link href={`/pets/${pet._id}`} className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${styles.buttonColor} text-gray-700 dark:text-gray-300`}
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
                          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 shadow-md hover:shadow-lg transition-all duration-300"
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
          })}
        </div>

        {/* View All Pets Link */}
        <div className="text-center mt-12">
          <Link href="/all-pets">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full border-2 border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-semibold hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-300"
            >
              View All Pets
              <PawPrint size={16} />
            </motion.button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
};

export default FeaturedPetsSection;