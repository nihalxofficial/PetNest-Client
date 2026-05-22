"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  PawPrint,
  Heart,
} from "lucide-react";
import FeaturedCard from "./FeaturedCard";
import { getFeaturedPets } from "@/lib/pets/data";
import { FeaturedCardSkeleton } from "./FeaturedCardSkeleton ";



const FeaturedPetsSection = () => {
  const [featuredPetsData, setFeaturedPetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      const data = await getFeaturedPets();
      setFeaturedPetsData(data);
      setIsLoading(false);
    };
    fetchPets();
  }, []);

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
          {isLoading
            ? // Show skeletons while loading
              [...Array(6)].map((_, index) => (
                <FeaturedCardSkeleton key={index} />
              ))
            : // Show actual cards when data is loaded
              featuredPetsData.map((pet, index) => {
                const styles = getSpeciesStyles(pet.species);
                return (
                  <FeaturedCard
                    key={pet._id}
                    styles={styles}
                    index={index}
                    pet={pet}
                  />
                );
              })
          }
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