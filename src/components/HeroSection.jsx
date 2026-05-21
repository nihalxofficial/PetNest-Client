"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PawPrint, ArrowRight, Heart, Shield, Calendar, Users } from "lucide-react";
import HeroImg from "@/assets/hero.png"

const HeroSection = () => {
  const stats = [
    { icon: PawPrint, value: "248", label: "Available Pets" },
    { icon: Heart, value: "10k+", label: "Happy Families" },
    { icon: Calendar, value: "1.2k", label: "Adoption Requests" },
    { icon: Users, value: "34", label: "Rescue Shelters" },
  ];

  const filters = ["Dogs", "Cats", "Birds", "Rabbits"];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="Happy pets background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="absolute inset-0 z-10 bg-linear-to-br from-teal-900/70 via-teal-800/50 to-emerald-900/70 dark:from-teal-950/80 dark:via-gray-900/70 dark:to-emerald-950/80" />
      
      <div className="absolute inset-0 z-10 bg-black/20 dark:bg-black/40" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 dark:bg-teal-400/10 rounded-full blur-3xl animate-float z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/20 dark:bg-emerald-400/10 rounded-full blur-3xl animate-float-delayed z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/90 dark:bg-amber-900/80 text-white dark:text-amber-200 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
                <Heart size={12} className="fill-white" />
                Trusted Pet Adoption Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                Find your perfect{" "}
                <span className="bg-linear-to-r from-teal-300 to-emerald-300 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  furry companion
                </span>{" "}
                today !
              </h1>
              <p className="text-gray-200 dark:text-gray-200 text-lg mt-4 max-w-lg mx-auto lg:mx-0">
                Adopt loving pets, connect with shelters and give animals the caring home they deserve.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <Link href="/all-pets">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex cursor-pointer items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-full px-8 py-3.5 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Adopt Now
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex cursor-pointer items-center gap-2 border-2 border-white text-white font-semibold rounded-full px-8 py-3.5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    About Pets
                  </motion.button>
                </Link>
              </div>
              
              <div className="mt-8 inline-flex items-center gap-2 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-2xl px-5 py-2 shadow-sm border border-white/30">
                <Heart size={16} className="text-amber-400 fill-amber-400" />
                <span className="text-white font-semibold text-sm">
                  10K+ Successful Adoptions
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/30 dark:border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={24} className="text-white dark:text-teal-400" />
                <h2 className="text-2xl font-bold text-white dark:text-white">
                  Smart Adoption Hub
                </h2>
              </div>
              <p className="text-gray-200 dark:text-gray-300 text-sm mb-5">
                Search, filter & connect instantly
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((filter, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 bg-white/20 dark:bg-teal-900/50 text-white dark:text-teal-300 rounded-full text-sm font-medium hover:bg-white/30 dark:hover:bg-teal-800 transition-colors cursor-pointer backdrop-blur-sm"
                  >
                    {filter === "Dogs" && "🐕 "}
                    {filter === "Cats" && "🐈 "}
                    {filter === "Birds" && "🐦 "}
                    {filter === "Rabbits" && "🐇 "}
                    {filter}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-2 bg-white/20 dark:bg-gray-800/40 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/60 transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <Icon size={20} className="text-white dark:text-teal-400 mx-auto mb-1" />
                      <p className="font-bold text-white text-lg">{stat.value}</p>
                      <p className="text-xs text-gray-200 dark:text-gray-300">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-5 text-center text-sm text-gray-200 dark:text-gray-300 border-t border-white/30 dark:border-gray-700/50 pt-4">
                <span>🔍 Search pets by name · Filter by species</span>
              </div>
            </div>
          </motion.div>
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

export default HeroSection;