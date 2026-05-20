"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    PawPrint,
    LayoutDashboard,
    Plus,
    LogIn,
    UserPlus,
    Sun,
    Moon,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@heroui/react";

const PetNestNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const menuItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "All Pets", href: "/all-pets", icon: PawPrint },
        { name: "Add Pet", href: "/add-pet", icon: Plus },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ];

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    if (!mounted) {
        return (
            <div className="h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-teal-100 dark:border-teal-800/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-linear-to-br from-teal-500 to-emerald-500 p-2 rounded-xl">
                            <PawPrint className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-extrabold bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                            PetNest
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-teal-100 dark:border-teal-800/30 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2"
                        >
                            <div className="bg-linear-to-br from-teal-500 to-emerald-500 p-2 rounded-xl shadow-md">
                                <PawPrint className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-extrabold bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                PetNest
                            </span>
                        </motion.div>
                    </Link>

                    <div className="hidden lg:flex items-center space-x-8">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-gray-700 dark:text-gray-300 font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group flex justify-between items-center gap-1.5"
                                >
                                    <Icon
                                        size={16}
                                        className="text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform"
                                    />
                                    {item.name}
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-linear-to-r from-teal-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full cursor-pointer bg-teal-100 dark:bg-teal-800 hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun size={18} className="text-yellow-500" />
                            ) : (
                                <Moon size={18} className="text-gray-700" />
                            )}
                        </motion.button>

                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden cursor-pointer sm:flex items-center gap-2 border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-semibold rounded-full px-5 py-2 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-300"
                            >
                                <LogIn size={16} />
                                Login
                            </motion.button>
                        </Link>

                        <Link href="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden cursor-pointer sm:flex items-center gap-2 bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 text-white font-semibold rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <UserPlus size={16} />
                                Sign Up
                            </motion.button>
                        </Link>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 border-t border-gray-200 dark:border-gray-700 mt-2">
                                <div className="flex flex-col space-y-2">
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 py-3 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <Icon size={20} className="text-teal-500 dark:text-teal-400" />
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                    <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                            <button className="w-full flex items-center justify-center gap-2 border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-semibold rounded-full py-2.5 transition-all">
                                                <LogIn size={16} />
                                                Login
                                            </button>
                                        </Link>
                                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                            <button className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 text-white font-semibold rounded-full py-2.5 shadow-md transition-all">
                                                <UserPlus size={16} />
                                                Sign Up
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default PetNestNavbar;