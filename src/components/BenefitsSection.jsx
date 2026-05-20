"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import benefitImg from "@/assets/benefits.jpg"
import {
  Heart,
  PawPrint,
  Shield,
  Calendar,
  Headset,
  TreePine,
  Star,
  HandHelping,
} from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Loving Pet Care",
      description: "Every rescued pet receives warmth, care, and attention.",
      bgColor: "bg-rose-100 dark:bg-rose-950/50",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: PawPrint,
      title: "Healthy & Happy Pets",
      description: "We ensure pets are healthy, playful, and adoption-ready.",
      bgColor: "bg-teal-100 dark:bg-teal-950/50",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
    {
      icon: Star,
      title: "Trusted Adoption",
      description: "Thousands of families trust PetNest for safe adoptions.",
      bgColor: "bg-amber-100 dark:bg-amber-950/50",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified profiles and secure adoption processes.",
      bgColor: "bg-indigo-100 dark:bg-indigo-950/50",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Calendar,
      title: "Easy Process",
      description: "Simple and stress-free steps to adopt your pet.",
      bgColor: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Our support team is always ready to help you.",
      bgColor: "bg-blue-100 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: HandHelping,
      title: "Adoption Guidance",
      description: "Expert counselors help you choose the perfect pet.",
      bgColor: "bg-violet-100 dark:bg-violet-950/50",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: TreePine,
      title: "Eco Friendly Mission",
      description: "Supporting sustainable and ethical pet adoption.",
      bgColor: "bg-green-100 dark:bg-green-950/50",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold mb-4">
              <Star size={12} className="fill-teal-500" />
              Why Choose Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Benefits Of Using PetNest
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Discover how we make pet adoption simple, joyful, and rewarding.
            </p>
          </motion.div>
        </div>

        {/* Benefits Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Circular Layout */}
          <div className="hidden lg:block relative min-h-[700px]">
            {/* Center Circle with Image */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="relative w-60 h-60 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
  <Image
    src={benefitImg}
    alt="Happy pet"
    width={600}
    height={600}
    className="w-full h-full object-cover"
  />
  {/* Theme-aware gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60 dark:via-black/20" />
</div>
            </motion.div>

            {/* Circular Cards */}
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              const angles = [0, 45, 90, 135, 180, 225, 270, 315];

              // Better spacing
              const radiusX = 290;
              const radiusY = 240;

              const centerOffsetX = -110;
              const centerOffsetY = -40;

              const angle = (angles[index] * Math.PI) / 180;

              const x = Math.cos(angle) * radiusX + centerOffsetX;
              const y = Math.sin(angle) * radiusY + centerOffsetY;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  whileInView={{ opacity: 1, x, y }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.08, y: -5 }}
                    className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${benefit.bgColor}`}
                      >
                        <Icon
                          size={22}
                          className={benefit.iconColor}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm">
                          {benefit.title}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50 cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-xl ${benefit.bgColor}`}
                    >
                      <Icon
                        size={22}
                        className={benefit.iconColor}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {benefit.title}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Badge */}
        <div className="lg:hidden text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-full">
            <PawPrint
              size={16}
              className="text-teal-600 dark:text-teal-400"
            />

            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
              8+ Amazing Benefits
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
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

export default BenefitsSection;