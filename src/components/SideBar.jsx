"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard,
    Heart,
    List,
    Plus,
    Settings,
    LogOut,
    Sun,
    Moon,
    Menu,
    X,
    ChevronLeft,
    PawPrint,
    Users,
    User,
} from "lucide-react";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const DashboardSidebar = ({ onCollapseChange }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (onCollapseChange) {
            onCollapseChange(newState);
        }
    };

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Requests", href: "/dashboard/my-requests", icon: Heart },
        { name: "My Listings", href: "/dashboard/my-listings", icon: List },
        { name: "All Pets", href: "/all-pets", icon: PawPrint },
        { name: "Add Pet", href: "/dashboard/add-pet", icon: Plus },
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Mobile Menu Button - Changed top-20 to top-16 to match navbar */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-16 left-4 z-50 p-2 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
                    } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
                style={{ paddingTop: "64px" }}
            >
                <div className="flex flex-col h-full">
                    {/* <div className={`px-4 py-4 border-b border-gray-200 dark:border-gray-800 ${isCollapsed ? "text-center" : ""}`}>
                        <div className={`flex ${isCollapsed ? "justify-center" : "items-center gap-3"}`}>
                            <Avatar
                                src={user?.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400"}
                                name={user?.name?.charAt(0) || "U"}
                                size="md"
                                className="ring-2 ring-teal-500/20 shrink-0"
                            />
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email || "user@example.com"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div> */}

                    {/* Navigation Menu - Removed pt-10 to eliminate extra space */}
                    <nav className="flex-1 py-4 overflow-y-auto">
                        <ul className="space-y-1 px-3">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${isActive
                                                    ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-md"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                } ${isCollapsed ? "justify-center" : ""}`}
                                        >
                                            <Icon size={20} className={isActive ? "text-white" : "text-teal-500"} />
                                            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Bottom Section */}
                    <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 ${isCollapsed ? "justify-center" : ""
                                }`}
                        >
                            {theme === "dark" ? (
                                <Sun size={20} className="text-yellow-500" />
                            ) : (
                                <Moon size={20} className="text-gray-700" />
                            )}
                            {!isCollapsed && <span className="text-sm font-medium">Theme</span>}
                        </button>

                        {/* Sign Out */}
                        <button
                            onClick={handleSignOut}
                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 ${isCollapsed ? "justify-center" : ""
                                }`}
                        >
                            <LogOut size={20} />
                            {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Collapse Toggle Button */}
            <button
                onClick={handleCollapse}
                className="hidden cursor-pointer lg:flex fixed bottom-6 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 hover:scale-105"
                style={{ left: isCollapsed ? "calc(5rem - 12px)" : "calc(16rem - 12px)" }}
            >
                <ChevronLeft size={16} className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
            </button>
        </>
    );
};

export default DashboardSidebar;