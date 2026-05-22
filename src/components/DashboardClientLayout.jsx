// components/DashboardClientLayout.jsx
"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar, { useSidebar } from "@/components/SideBar";

const DashboardClientLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <main className="transition-all duration-300 pt-20 min-h-screen lg:ml-64">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </div>
            </main>
        );
    }

    return (
        <>
            <DashboardSidebar onCollapseChange={setIsCollapsed} />
            <main 
                className={`transition-all duration-300 pt-20 min-h-screen`}
                style={{ 
                    marginLeft: isCollapsed ? "5rem" : "16rem",
                    width: `calc(100% - ${isCollapsed ? "5rem" : "16rem"})`
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </div>
            </main>
        </>
    );
};

export default DashboardClientLayout;