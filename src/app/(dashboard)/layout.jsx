import DashboardNav from '@/components/DashboardNav';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div>
            <DashboardNav/>
            {children}
        </div>
    );
};

export default DashboardLayout;