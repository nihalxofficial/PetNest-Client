// app/(dashboard)/dashboard/my-requests/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Button,
    Card,
    Chip,
    Pagination,
} from "@heroui/react";
import {
    PawPrint,
    Eye,
    Trash2,
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
    Heart,
} from "lucide-react";

// Hardcoded requests data for logged-in user
const myRequestsData = [
    {
        id: "req_1",
        petId: "pet_1",
        petName: "Luna",
        petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        petBreed: "Golden Retriever",
        requestDate: "2024-05-10",
        pickupDate: "2024-05-20",
        status: "pending",
        message: "I've been looking for a Golden Retriever for months. I have a big backyard!",
    },
    {
        id: "req_2",
        petId: "pet_2",
        petName: "Oliver",
        petImage: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
        petBreed: "Maine Coon",
        requestDate: "2024-05-12",
        pickupDate: "2024-05-25",
        status: "pending",
        message: "Oliver would be perfect for my quiet apartment. I work from home and can give him lots of attention.",
    },
    {
        id: "req_3",
        petId: "pet_3",
        petName: "Rocky",
        petImage: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=300&fit=crop",
        petBreed: "German Shepherd",
        requestDate: "2024-04-15",
        pickupDate: "2024-05-01",
        status: "approved",
        message: "Rocky is exactly what our active family needs! We have a large yard and go hiking every weekend.",
    },
    {
        id: "req_4",
        petId: "pet_4",
        petName: "Mochi",
        petImage: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=300&fit=crop",
        petBreed: "Ragdoll",
        requestDate: "2024-04-20",
        pickupDate: "2024-05-05",
        status: "rejected",
        message: "Mochi is adorable! Would love to give her a forever home.",
    },
    {
        id: "req_5",
        petId: "pet_5",
        petName: "Coco",
        petImage: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=300&fit=crop",
        petBreed: "Holland Lop",
        requestDate: "2024-05-05",
        pickupDate: "2024-05-18",
        status: "pending",
        message: "My daughter has been asking for a bunny. Coco would be perfect!",
    },
];

// Status badge component with proper colors
const StatusBadge = ({ status }) => {
    switch (status) {
        case "pending":
            return (
                <Chip color="warning" variant="flat" startContent={<Clock size={12} />} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Pending
                </Chip>
            );
        case "approved":
            return (
                <Chip color="success" variant="flat" startContent={<CheckCircle size={12} />} className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Approved
                </Chip>
            );
        case "rejected":
            return (
                <Chip color="danger" variant="flat" startContent={<XCircle size={12} />} className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Rejected
                </Chip>
            );
        default:
            return null;
    }
};

const MyRequestsPage = () => {
    const [requests, setRequests] = useState(myRequestsData);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const handleCancelRequest = (requestId) => {
        console.log("Cancel request:", requestId);
    };

    // Pagination logic
    const totalPages = Math.ceil(requests.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRequests = requests.slice(startIndex, endIndex);

    // Stats calculations
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(req => req.status === "pending").length;
    const approvedRequests = requests.filter(req => req.status === "approved").length;
    const rejectedRequests = requests.filter(req => req.status === "rejected").length;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                        <PawPrint size={24} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        My Requests
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    View and manage all your adoption requests
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                            <PawPrint size={24} className="text-teal-600 dark:text-teal-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                            <Clock size={24} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedRequests}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                            <XCircle size={24} className="text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Requests Table - Simple div-based table */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Heart size={18} className="text-teal-500" />
                        All Adoption Requests
                    </h2>

                    {/* Table Header */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr className="text-left">
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">PET NAME</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">REQUEST DATE</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">PICKUP DATE</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">STATUS</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map((request) => (
                                    <tr key={request.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                                        {/* Pet Name */}
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                    <Image
                                                        src={request.petImage}
                                                        alt={request.petName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {request.petName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {request.petBreed}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Request Date */}
                                        <td className="py-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} className="text-teal-500" />
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {new Date(request.requestDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        {/* Pickup Date */}
                                        <td className="py-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} className="text-teal-500" />
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {new Date(request.pickupDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td className="py-3">
                                            <StatusBadge status={request.status} />
                                        </td>
                                        {/* Actions */}
                                        <td className="py-3">
                                            <div className="flex gap-2">
                                                {/* View Button */}
                                                <Button
                                                    size="sm"
                                                    variant="bordered"
                                                    as={Link}
                                                    href={`/all-pets/${request.petId}`}
                                                    startContent={<Eye size={14} />}
                                                    className="border-blue-500 text-blue-600"
                                                >
                                                    View
                                                </Button>
                                                {/* Cancel Button - Only for pending requests */}
                                                {request.status === "pending" && (
                                                    <Button
                                                        size="sm"
                                                        variant="bordered"
                                                        onPress={() => handleCancelRequest(request.id)}
                                                        startContent={<Trash2 size={14} />}
                                                        className="border-red-500 text-red-600"
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                                {request.status !== "pending" && (
                                                    <Button
                                                        size="sm"
                                                        variant="bordered"
                                                        isDisabled
                                                        startContent={<Trash2 size={14} />}
                                                        className="border-gray-300 text-gray-400 cursor-not-allowed"
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <Pagination
                                total={totalPages}
                                page={currentPage}
                                onChange={setCurrentPage}
                                color="primary"
                                variant="bordered"
                                radius="full"
                            />
                        </div>
                    )}
                </div>
            </Card>

            {/* Empty State - No Requests */}
            {requests.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Heart size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Adoption Requests Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven't submitted any adoption requests yet.
                    </p>
                    <Link href="/all-pets">
                        <Button className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white">
                            Browse Pets
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;