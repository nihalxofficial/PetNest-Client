// components/SuccessStoriesSection.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import {
    Heart,
    Star,
    PawPrint,
    ArrowRight,
    Quote,
    Calendar,
    MapPin,
} from "lucide-react";

const SuccessStoriesSection = () => {
    const stories = [
        {
            id: 1,
            name: "Jessica Martinez",
            location: "Austin, TX",
            petName: "Luna",
            petType: "Golden Retriever",
            userImage: "https://randomuser.me/api/portraits/women/68.jpg",
            review: "Adopting Luna changed our lives completely. She's the sweetest, most loving golden retriever who brings joy to our family every single day.",
            rating: 5,
            date: "Adopted March 2024",
            tags: ["Family Pet", "First Time Adopter"],
        },
        {
            id: 2,
            name: "David & Sarah Chen",
            location: "Denver, CO",
            petName: "Oliver",
            petType: "Maine Coon",
            userImage: "https://randomuser.me/api/portraits/men/32.jpg",
            review: "Oliver is our cuddle buddy! Thank you PetNest for making our adoption journey so smooth and memorable.",
            rating: 5,
            date: "Adopted January 2024",
            tags: ["Couple", "Apartment Living"],
        },
        {
            id: 3,
            name: "Emma Kowalski",
            location: "Seattle, WA",
            petName: "Sunny",
            petType: "Cockatiel",
            userImage: "https://randomuser.me/api/portraits/women/45.jpg",
            review: "Sunny the cockatiel sings every morning! Best decision ever to adopt through PetNest.",
            rating: 5,
            date: "Adopted February 2024",
            tags: ["First Time Owner", "Senior Pet"],
        },
        {
            id: 4,
            name: "Marcus Thompson",
            location: "Portland, OR",
            petName: "Coco",
            petType: "Holland Lop",
            userImage: "https://randomuser.me/api/portraits/men/75.jpg",
            review: "Coco has brought so much joy to my apartment. She's playful, loving, and full of personality.",
            rating: 4,
            date: "Adopted December 2023",
            tags: ["Single Owner", "Small Space"],
        },
        {
            id: 5,
            name: "The Williams Family",
            location: "Chicago, IL",
            petName: "Rocky",
            petType: "German Shepherd",
            userImage: "https://randomuser.me/api/portraits/men/52.jpg",
            review: "Rocky has become our family protector and best friend. He's amazing with our kids and always eager to learn.",
            rating: 5,
            date: "Adopted November 2023",
            tags: ["Family Pet", "Active Lifestyle"],
        },
        {
            id: 6,
            name: "Sophia Rodriguez",
            location: "Miami, FL",
            petName: "Bella",
            petType: "French Bulldog",
            userImage: "https://randomuser.me/api/portraits/women/23.jpg",
            review: "Bella is the perfect addition to our family. She's funny, energetic, and loves everyone she meets.",
            rating: 5,
            date: "Adopted October 2023",
            tags: ["Family Pet", "City Living"],
        },
    ];

    // Duplicate stories for seamless marquee effect
    const marqueeStories = [...stories, ...stories];

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background linears */}
            <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-200/20 dark:bg-rose-500/10 rounded-full blur-3xl animate-float-delayed" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full text-xs font-semibold mb-4">
                            <Heart size={12} className="fill-rose-500" />
                            Happy Tails
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Happy Adoption Stories
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
                            Real families, real tails — read their heartwarming adoption journeys
                        </p>
                    </motion.div>
                </div>

                {/* Marquee with opacity effects on both ends */}
                <div className="relative">
                    {/* Left opacity overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-linear-to-r from-teal-50/80 via-teal-50/40 to-transparent dark:from-teal-950/80 dark:via-teal-950/40" />

                    {/* Right opacity overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-linear-to-l from-teal-50/80 via-teal-50/40 to-transparent dark:from-teal-950/80 dark:via-teal-950/40" />

                    <Marquee
                        speed={50}
                        pauseOnHover={true}
                        gradient={false}
                        className="py-4"
                    >
                        <div className="flex gap-6 px-4">
                            {marqueeStories.map((story, index) => (
                                <div
                                    key={`${story.id}-${index}`}
                                    className="w-95 shrink-0"
                                >
                                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
                                        {/* Content */}
                                        <div className="p-5">
                                            {/* Quote Icon */}
                                            <Quote size={24} className="text-teal-500/40 mb-3" />

                                            {/* Review Text */}
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                {story.review}
                                            </p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(story.rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                                                ))}
                                            </div>

                                            {/* User Info with Client Image */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-teal-500 to-emerald-500 shrink-0">
                                                    <Image
                                                        height={200}
                                                        width={200}
                                                        src={story.userImage || story.name.charAt(0)}
                                                        alt={story.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-gray-800 dark:text-white text-sm truncate">
                                                        {story.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <MapPin size={10} className="flex-shrink-0" />
                                                        <span className="truncate">{story.location}</span>
                                                        <span className="mx-0.5">•</span>
                                                        <Calendar size={10} className="flex-shrink-0" />
                                                        <span className="truncate">{story.date}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pet Info & Tags */}
                                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-xs text-teal-700 dark:text-teal-300">
                                                    <PawPrint size={10} />
                                                    {story.petName} • {story.petType}
                                                </div>
                                                <div className="flex flex-wrap gap-1 justify-end">
                                                    {story.tags.slice(0, 1).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-1.5 py-0.5 text-[9px] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Marquee>
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </section>
    );
};

export default SuccessStoriesSection;