"use client";

import React, { useState, useEffect, useRef } from "react";
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
    LogOut,
    Settings,
    User,
    Heart,
    List,
    ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const PetNestNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef(null);

    const { theme, setTheme } = useTheme();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
    };

    // Handle profile click - close mobile menu and open dropdown
    const handleProfileClick = () => {
        if (window.innerWidth < 1024) {
            setIsMenuOpen(false);
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    if (!mounted) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
                                <PawPrint className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                                PetNest
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="group relative flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 font-medium"
                                >
                                    <Icon size={16} className="text-teal-500" />
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300"
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
                                        <Sun size={18} className="text-amber-400 cursor-pointer drop-shadow-lg" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ scale: 0, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: -180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Moon size={18} className="text-indigo-500 cursor-pointer drop-shadow-md" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Auth Section */}
                        {isPending ? (
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                        ) : user ? (
                            // Custom Dropdown for Desktop - Shows avatar and name
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={handleProfileClick}
                                    className="flex items-center gap-2 sm:gap-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                                >
                                    <Image
                                        width={40}
                                        height={40}
                                        src={user?.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"}
                                        alt="avatar"
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-teal-500/20"
                                    />
                                    <div className="text-left hidden md:block">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate max-w-28">
                                            {user?.name?.split(" ")[0] || user?.name || "User"}
                                        </p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Member</p>
                                    </div>
                                    {/* <ChevronDown size={14} className="text-gray-500 hidden md:block" /> */}
                                </button>

                                {/* Dropdown Menu - Only for Desktop (lg screens) */}
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-14 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
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
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
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
                                                    href="/my-pets"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <Heart size={16} className="text-teal-500" />
                                                    My Pets
                                                </Link>
                                                <Link
                                                    href="/my-listings"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <List size={16} className="text-teal-500" />
                                                    My Listings
                                                </Link>
                                                <Link
                                                    href="/settings"
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
                        ) : (
                            <>
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="hidden sm:flex items-center gap-2 border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-semibold rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all"
                                    >
                                        <LogIn size={16} />
                                        Login
                                    </motion.button>
                                </Link>

                                <Link href="/signup">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-sm shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <UserPlus size={16} />
                                        Sign Up
                                    </motion.button>
                                </Link>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu - Only shows nav links, NOT dropdown items */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="pb-5 pt-2 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex flex-col gap-1">
                                    {/* Navigation Links */}
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300"
                                            >
                                                <Icon size={18} className="text-teal-500" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}

                                    {/* Login/Signup buttons for mobile when not logged in */}
                                    {!user && !isPending && (
                                        <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
                                            <Link
                                                href="/login"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center justify-center gap-2 border border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-semibold rounded-full py-2.5 transition-all w-full"
                                            >
                                                <LogIn size={16} />
                                                Login
                                            </Link>
                                            <Link
                                                href="/signup"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold rounded-full py-2.5 shadow-md transition-all w-full"
                                            >
                                                <UserPlus size={16} />
                                                Sign Up
                                            </Link>
                                        </div>
                                    )}
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