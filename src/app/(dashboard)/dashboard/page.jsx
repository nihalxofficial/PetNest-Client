"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Button,
    Card,
    Chip,
    Avatar,
    Tabs,
    Tab,
} from "@heroui/react";
import {
    PawPrint,
    Heart,
    Eye,
    Edit,
    Trash2,
    MessageCircle,
    CheckCircle,
    Clock,
    XCircle,
    Calendar,
    MapPin,
    User,
    Mail,
    Phone,
    Award,
    TrendingUp,
    ShoppingBag,
    PlusCircle,
} from "lucide-react";

// Hardcoded dashboard data
const dashboardData = {
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400",
        memberSince: "2024-01-15",
        location: "Austin, TX",
        phone: "+1 (555) 123-4567",
        bio: "Passionate pet lover and advocate for animal adoption. Proud owner of two rescued pets.",
    },
    stats: {
        totalListings: 5,
        activeListings: 3,
        adoptedListings: 2,
        totalRequests: 8,
        pendingRequests: 3,
        approvedRequests: 4,
        rejectedRequests: 1,
        adoptionSuccessRate: 75,
    },
    recentListings: [
        {
            id: "pet_1",
            name: "Luna",
            species: "Dog",
            breed: "Golden Retriever",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
            status: "available",
            fee: 85,
            views: 245,
            requests: 3,
        },
        {
            id: "pet_2",
            name: "Oliver",
            species: "Cat",
            breed: "Maine Coon",
            image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
            status: "available",
            fee: 70,
            views: 189,
            requests: 2,
        },
        {
            id: "pet_4",
            name: "Mochi",
            species: "Cat",
            breed: "Ragdoll",
            image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=300&fit=crop",
            status: "available",
            fee: 120,
            views: 312,
            requests: 5,
        },
    ],
    recentRequests: [
        {
            id: "req_1",
            petName: "Luna",
            petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
            requestDate: "2024-05-10",
            pickupDate: "2024-05-20",
            status: "pending",
        },
        {
            id: "req_2",
            petName: "Oliver",
            petImage: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
            requestDate: "2024-05-12",
            pickupDate: "2024-05-25",
            status: "pending",
        },
        {
            id: "req_3",
            petName: "Rocky",
            petImage: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=300&fit=crop",
            requestDate: "2024-04-15",
            pickupDate: "2024-05-01",
            status: "approved",
        },
    ],
    activities: [
        {
            id: 1,
            type: "listing",
            message: "You added a new pet listing - Luna",
            time: "2 days ago",
            icon: PlusCircle,
            color: "text-green-500",
        },
        {
            id: 2,
            type: "request",
            message: "New adoption request for Oliver",
            time: "3 days ago",
            icon: MessageCircle,
            color: "text-blue-500",
        },
        {
            id: 3,
            type: "adoption",
            message: "Rocky was successfully adopted!",
            time: "1 week ago",
            icon: Heart,
            color: "text-rose-500",
        },
        {
            id: 4,
            type: "update",
            message: "You updated Mochi's profile information",
            time: "1 week ago",
            icon: Edit,
            color: "text-amber-500",
        },
    ],
};

const StatusBadge = ({ status }) => {
    switch (status) {
        case "available":
            return (
                <Chip color="success" variant="flat" size="sm" startContent={<CheckCircle size={10} />}>
                    Available
                </Chip>
            );
        case "pending":
            return (
                <Chip color="warning" variant="flat" size="sm" startContent={<Clock size={10} />}>
                    Pending
                </Chip>
            );
        case "approved":
            return (
                <Chip color="success" variant="flat" size="sm" startContent={<CheckCircle size={10} />}>
                    Approved
                </Chip>
            );
        case "rejected":
            return (
                <Chip color="danger" variant="flat" size="sm" startContent={<XCircle size={10} />}>
                    Rejected
                </Chip>
            );
        default:
            return null;
    }
};

// Custom Progress Bar Component
const ProgressBar = ({ value, color = "bg-green-500" }) => {
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
            <div 
                className={`h-full rounded-full transition-all duration-500 ${color}`}
                style={{ width: `${value}%` }}
            />
        </div>
    );
};

const DashboardPage = () => {
    const [data, setData] = useState(dashboardData);
    const [selectedTab, setSelectedTab] = useState("overview");

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome back, {data.user.name.split(" ")[0]}! 👋
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Here&apos;s what&apos;s happening with your pet adoption journey
                        </p>
                    </div>
                    <Link href="/dashboard/add-pet">
                        <Button className="bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-md hover:shadow-lg">
                            <PlusCircle size={16} className="mr-2" />
                            Add New Pet
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Listings</p>
                            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                                <PawPrint size={16} className="text-teal-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{data.stats.totalListings}</p>
                        <div className="flex gap-2 mt-2 text-xs">
                            <span className="text-green-600">{data.stats.activeListings} Active</span>
                            <span className="text-rose-600">{data.stats.adoptedListings} Adopted</span>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Adoption Requests</p>
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                <MessageCircle size={16} className="text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{data.stats.totalRequests}</p>
                        <div className="flex gap-2 mt-2 text-xs">
                            <span className="text-yellow-600">{data.stats.pendingRequests} Pending</span>
                            <span className="text-green-600">{data.stats.approvedRequests} Approved</span>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                <TrendingUp size={16} className="text-emerald-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600">{data.stats.adoptionSuccessRate}%</p>
                        <ProgressBar value={data.stats.adoptionSuccessRate} color="bg-emerald-500" />
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                                <Award size={16} className="text-amber-600" />
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {new Date(data.user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Active Member</p>
                    </div>
                </Card>
            </div>

            {/* Overview Section - No Tabs to avoid error */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Listings */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <PawPrint size={18} className="text-teal-500" />
                                Recent Listings
                            </h3>
                            <Link href="/dashboard/my-listings">
                                <Button size="sm" variant="light" className="text-teal-600">
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {data.recentListings.map((listing) => (
                                <div key={listing.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={listing.image} alt={listing.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 dark:text-white">{listing.name}</p>
                                        <p className="text-xs text-gray-500">{listing.breed} • {listing.species}</p>
                                    </div>
                                    <div className="text-right">
                                        <StatusBadge status={listing.status} />
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                            <span>👁️ {listing.views}</span>
                                            <span>💬 {listing.requests}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Recent Requests */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <MessageCircle size={18} className="text-teal-500" />
                                Recent Requests
                            </h3>
                            <Link href="/dashboard/my-requests">
                                <Button size="sm" variant="light" className="text-teal-600">
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {data.recentRequests.map((request) => (
                                <div key={request.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={request.petImage} alt={request.petName} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 dark:text-white">{request.petName}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar size={10} />
                                            {new Date(request.requestDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <StatusBadge status={request.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ShoppingBag size={18} className="text-teal-500" />
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/dashboard/add-pet">
                                <Button className="w-full border-teal-500 text-teal-600" variant="bordered">
                                    <PlusCircle size={16} className="mr-2" />
                                    Add Pet
                                </Button>
                            </Link>
                            <Link href="/all-pets">
                                <Button className="w-full border-blue-500 text-blue-600" variant="bordered">
                                    <Heart size={16} className="mr-2" />
                                    Browse Pets
                                </Button>
                            </Link>
                            <Link href="/dashboard/my-listings">
                                <Button className="w-full border-amber-500 text-amber-600" variant="bordered">
                                    <PawPrint size={16} className="mr-2" />
                                    My Listings
                                </Button>
                            </Link>
                            <Link href="/dashboard/settings">
                                <Button className="w-full border-purple-500 text-purple-600" variant="bordered">
                                    <User size={16} className="mr-2" />
                                    Settings
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-teal-500" />
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {data.activities.map((activity) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <div className={`p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                                            <Icon size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
                                            <p className="text-xs text-gray-400">{activity.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Profile Section - Separate Card */}
            <div className="mt-6">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <User size={18} className="text-teal-500" />
                            Profile Information
                        </h3>
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center gap-3">
                                <Avatar
                                    src={data.user.avatar}
                                    name={data.user.name.charAt(0)}
                                    size="xl"
                                    className="ring-4 ring-teal-500/20"
                                />
                                <Link href="/dashboard/settings">
                                    <Button size="sm" variant="bordered" className="border-teal-500 text-teal-600">
                                        Edit Profile
                                    </Button>
                                </Link>
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            <User size={14} className="inline mr-1 text-teal-500" />
                                            Full Name
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{data.user.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            <Mail size={14} className="inline mr-1 text-teal-500" />
                                            Email Address
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{data.user.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            <Phone size={14} className="inline mr-1 text-teal-500" />
                                            Phone Number
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{data.user.phone}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            <MapPin size={14} className="inline mr-1 text-teal-500" />
                                            Location
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{data.user.location}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            Bio
                                        </label>
                                        <p className="text-gray-600 dark:text-gray-400">{data.user.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;