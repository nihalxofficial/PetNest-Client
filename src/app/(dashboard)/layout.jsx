// app/(dashboard)/layout.jsx
import DashboardNav from '@/components/DashboardNav';
import DashboardClientLayout from '@/components/DashboardClientLayout';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30">
            <DashboardNav />
            <DashboardClientLayout>
                {children}
            </DashboardClientLayout>
        </div>
    );
};

export default DashboardLayout;