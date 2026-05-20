"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Search,
  FileText,
  Handshake,
  Home,
  Calendar,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const AdoptionProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Pets",
      description: "Explore our collection of adorable pets looking for their forever homes. Filter by species, breed, age, and location.",
      icon: Search,
      color: "bg-blue-100 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      duration: "5-10 min",
      tips: "Use filters to find your perfect match",
    },
    {
      id: 2,
      title: "Submit Request",
      description: "Fill out our simple adoption application form. Tell us about your home, lifestyle and experience with pets.",
      icon: FileText,
      color: "bg-amber-100 dark:bg-amber-950/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      duration: "10-15 min",
      tips: "Be honest about your lifestyle",
    },
    {
      id: 3,
      title: "Meet Your Pet",
      description: "Schedule a virtual or in-person meet-and-greet with your potential new family member to ensure it's a perfect match.",
      icon: Handshake,
      color: "bg-teal-100 dark:bg-teal-950/50",
      iconColor: "text-teal-600 dark:text-teal-400",
      duration: "30-45 min",
      tips: "Ask questions about pet's personality",
    },
    {
      id: 4,
      title: "Complete Adoption",
      description: "Finalize the adoption agreement, pay the adoption fee and take your new furry friend home with a starter kit.",
      icon: Home,
      color: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      duration: "20-30 min",
      tips: "Prepare your home before arrival",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "100% Transparent Process",
      description: "No hidden fees, clear communication at every step",
    },
    {
      icon: Heart,
      title: "Lifetime Support",
      description: "Post-adoption guidance and veterinary advice",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Meet pets on your schedule, evenings and weekends",
    },
    {
      icon: MessageCircle,
      title: "Expert Guidance",
      description: "Adoption counselors available 24/7 to assist you",
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
              Simple & Easy
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Simple Adoption Process
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Four simple steps to bring your new best friend home
            </p>
          </motion.div>
        </div>

        {/* Process Steps - Desktop Timeline */}
        <div className="hidden md:block relative mb-16">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-teal-200 via-emerald-200 to-teal-200 dark:from-teal-800 dark:via-emerald-800 dark:to-teal-800 transform -translate-y-1/2" />
          
          <div className="relative grid grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step Number Circle */}
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className={step.iconColor} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                        {step.id}
                      </div>
                    </div>
                    
                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    
                    {/* Step Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 mt-5">
                      {step.description}
                    </p>
                    
                    {/* Duration Badge */}
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <Calendar size={10} />
                      {step.duration}
                    </span>
                    
                    {/* Tip */}
                    <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">
                      💡 {step.tips}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Steps - Mobile Cards */}
        <div className="md:hidden space-y-4 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50 dark:border-gray-700/50"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center`}>
                      <Icon size={24} className={step.iconColor} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                      {step.id}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={10} />
                        {step.duration}
                      </span>
                      <span className="text-xs text-teal-600 dark:text-teal-400">
                        💡 {step.tips}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Why Choose Our Adoption Process?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              We make pet adoption simple, transparent, and joyful
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 dark:border-gray-700/50"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/adopt">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Adoption Journey
              <ArrowRight size={18} />
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

export default AdoptionProcessSection;