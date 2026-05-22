"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LayoutDashboard, LogOut, Menu, Moon, PawPrint, Settings, Sun, X } from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const DashboardNav = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleProfileClick = () => {
        if (window.innerWidth < 1024) {
            setIsMenuOpen(false);
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-14 md:h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 md:gap-3 cursor-pointer"
                        >
                            <div className="bg-linear-to-br from-teal-500 to-emerald-500 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg">
                                <PawPrint className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                                PetNest
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {theme === "dark" ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Sun size={16} className="text-amber-400 cursor-pointer drop-shadow-lg" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ scale: 0, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: -180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Moon size={16} className="text-indigo-500 cursor-pointer drop-shadow-md" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 sm:gap-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                            >
                                <Image
                                    width={36}
                                    height={36}
                                    src={user?.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"}
                                    alt="avatar"
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-teal-500/20"
                                />
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate max-w-28">
                                        {user?.name?.split(" ")[0] || user?.name || "User"}
                                    </p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Member</p>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-12 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                                    >
                                        {/* User Info */}
                                        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"}
                                                    alt="avatar"
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-500/20"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-800 dark:text-white">
                                                        {user?.name || "User"}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-45">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <LayoutDashboard size={16} className="text-teal-500" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/dashboard/settings"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <Settings size={16} className="text-teal-500" />
                                                Settings
                                            </Link>
                                        </div>

                                        {/* Sign Out */}
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNav;