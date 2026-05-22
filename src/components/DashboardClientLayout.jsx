"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/SideBar";

const DashboardClientLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!mounted) {
        return (
            <main className="lg:ml-64">
                <div className="px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        );
    }

    // On mobile, sidebar is hidden by default, main takes full width
    // On desktop, main width adjusts based on sidebar collapse state
    const getMarginLeft = () => {
        if (isMobile) return "0rem";
        return isCollapsed ? "5rem" : "16rem";
    };

    return (
        <>
            <DashboardSidebar onCollapseChange={setIsCollapsed} />
            <main 
                className="min-h-screen transition-all duration-300"
                style={{ 
                    marginLeft: getMarginLeft(),
                    width: `calc(100% - ${getMarginLeft()})`
                }}
            >
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </div>
            </main>
        </>
    );
};

export default DashboardClientLayout;