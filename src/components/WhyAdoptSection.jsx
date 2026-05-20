"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import careImg from "@/assets/care.png"
import {
    Heart,
    Smile,
    Brain,
    HandHelping,
    Shield,
    Users,
    Home,
    Activity,
    ArrowRight,
} from "lucide-react";

const WhyAdoptSection = () => {
    const benefits = [
        {
            icon: Heart,
            title: "Save Animal Lives",
            description: "Every adoption creates space for another animal in need and gives a loving home to a deserving pet.",
            color: "bg-rose-100 dark:bg-rose-950/50",
            iconColor: "text-rose-600 dark:text-rose-400",
            delay: 0.1,
        },
        {
            icon: Smile,
            title: "Reduce Loneliness",
            description: "Pets provide unconditional love, companionship, and emotional support, reducing feelings of isolation.",
            color: "bg-amber-100 dark:bg-amber-950/50",
            iconColor: "text-amber-600 dark:text-amber-400",
            delay: 0.2,
        },
        {
            icon: Brain,
            title: "Improve Mental Health",
            description: "Studies show pet owners have lower stress levels, reduced anxiety, and improved overall well-being.",
            color: "bg-teal-100 dark:bg-teal-950/50",
            iconColor: "text-teal-600 dark:text-teal-400",
            delay: 0.3,
        },
        {
            icon: HandHelping,
            title: "Loving Companionship",
            description: "Build an unbreakable bond with a loyal friend who will be by your side through all of life's moments.",
            color: "bg-violet-100 dark:bg-violet-950/50",
            iconColor: "text-violet-600 dark:text-violet-400",
            delay: 0.4,
        },
        {
            icon: Shield,
            title: "Fight Puppy Mills",
            description: "Adoption discourages cruel breeding practices and helps shut down unethical puppy mills.",
            color: "bg-indigo-100 dark:bg-indigo-950/50",
            iconColor: "text-indigo-600 dark:text-indigo-400",
            delay: 0.5,
        },
        {
            icon: Users,
            title: "Support Community",
            description: "Join a community of compassionate pet lovers and help build a humane society for all animals.",
            color: "bg-blue-100 dark:bg-blue-950/50",
            iconColor: "text-blue-600 dark:text-blue-400",
            delay: 0.6,
        },
    ];

    const stats = [
        { value: "10K+", label: "Happy Adoptions", icon: Heart },
        { value: "50+", label: "Partner Shelters", icon: Home },
        { value: "98%", label: "Success Rate", icon: Activity },
        { value: "24/7", label: "Support Available", icon: HandHelping },
    ];

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Side - Image with Stats Overlay */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={careImg}
                                alt="Happy pet owner with adopted pet"
                                width={600}
                                height={800}
                                className="w-full h-full object-cover"
                            />

                            {/* Theme-Aware Overlay Layers */}

                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent dark:from-black/60 dark:via-black/20" />
                        </div>

                        {/* Floating Stats Cards */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 dark:border-gray-700/50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="text-center"
                                        >
                                            <Icon size={20} className="text-teal-500 dark:text-teal-400 mx-auto mb-1" />
                                            <p className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold mb-4">
                            <Heart size={12} className="fill-teal-500" />
                            Why Adopt?
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Give Love,{" "}
                            <span className="bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                Save a Life
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            When you adopt, you&apos;re not just getting a pet — you&apos;re saving a life. Every year, millions of
                            animals enter shelters waiting for their forever homes. Your adoption gives them a second chance
                            at happiness and makes room for others in need.
                        </p>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: benefit.delay }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className={`p-2 rounded-xl ${benefit.color} shrink-0 group-hover:scale-110 transition-transform`}>
                                            <Icon size={18} className={benefit.iconColor} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-white text-sm">
                                                {benefit.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <Link href="/all-pets">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Start Your Adoption Journey
                                <ArrowRight size={16} />
                            </motion.button>
                        </Link>

                        {/* Trust Badge */}
                        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <Shield size={14} className="text-teal-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Verified Shelters</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart size={14} className="text-rose-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Health Checked Pets</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HandHelping size={14} className="text-teal-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Lifetime Support</span>
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

export default WhyAdoptSection;