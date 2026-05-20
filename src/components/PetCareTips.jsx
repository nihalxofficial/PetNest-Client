"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Apple,
  Scissors,
  Syringe,
  Dumbbell,
  Bone,
  Bath,
  Thermometer,
  Bed,
  Droplets,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const PetCareTipsSection = () => {
  const tips = [
    {
      id: 1,
      title: "Healthy Nutrition",
      description: "Provide balanced nutrition with quality proteins, vegetables, and grains suitable for your pet's age and breed.",
      icon: Apple,
      color: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      readTime: "3 min read",
      category: "Nutrition",
    },
    {
      id: 3,
      title: "Vaccination Schedule",
      description: "Keep your pet protected with timely vaccinations against common diseases and annual health checkups.",
      icon: Syringe,
      color: "bg-blue-100 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      readTime: "5 min read",
      category: "Health",
    },
    {
      id: 5,
      title: "Dental Care",
      description: "Brush your pet's teeth regularly and provide dental chews to prevent plaque and bad breath.",
      icon: Droplets,
      color: "bg-teal-100 dark:bg-teal-950/50",
      iconColor: "text-teal-600 dark:text-teal-400",
      readTime: "4 min read",
      category: "Health",
    },
    {
      id: 6,
      title: "Proper Hydration",
      description: "Ensure fresh, clean water is always available. Proper hydration is essential for organ function.",
      icon: Bone,
      color: "bg-indigo-100 dark:bg-indigo-950/50",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      readTime: "2 min read",
      category: "Nutrition",
    },
    {
      id: 7,
      title: "Seasonal Care",
      description: "Protect your pet from extreme temperatures, provide shade in summer and warmth in winter.",
      icon: Thermometer,
      color: "bg-orange-100 dark:bg-orange-950/50",
      iconColor: "text-orange-600 dark:text-orange-400",
      readTime: "4 min read",
      category: "Seasonal",
    },
    {
      id: 9,
      title: "Regular Bathing",
      description: "Bathe your pet with pet-safe shampoos to keep their skin clean and free from infections.",
      icon: Bath,
      color: "bg-cyan-100 dark:bg-cyan-950/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      readTime: "3 min read",
      category: "Grooming",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold mb-4">
              <Sparkles size={12} className="fill-teal-500" />
              Expert Advice
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Pet Care Tips
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Expert advice to keep your furry friend happy, healthy, and thriving
            </p>
          </motion.div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/50 dark:border-gray-700/50 transition-all duration-300 h-full hover:shadow-2xl">
                  <div className="p-6">
                    {/* Icon with Category Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${tip.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={tip.iconColor} />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {tip.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {tip.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {tip.description}
                    </p>

                    {/* Read Time & Link */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        📖 {tip.readTime}
                      </span>
                      <Link href={`/tips/${tip.id}`}>
                        <button className="flex items-center gap-1 text-sm text-teal-600 dark:text-teal-400 font-medium hover:gap-2 transition-all duration-300">
                          Read More
                          <ArrowRight size={14} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Tips Link */}
        <div className="text-center mt-12">
          <Link href="/tips">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full border-2 border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-semibold hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-300"
            >
              View All Tips
              <ArrowRight size={16} />
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

export default PetCareTipsSection;