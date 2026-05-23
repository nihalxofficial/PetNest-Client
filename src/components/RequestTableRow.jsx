"use client"
import { Button, Chip } from '@heroui/react';
import { Calendar, CheckCircle, Clock, Eye, Trash2, XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from "next/link";
import { deleteAdoption } from '@/lib/pets/action';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';


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

const RequestTableRow = ({ request }) => {

    const handleCancelRequest = async(id) => {
        const { data: jwtData } = await authClient.token();
	    const token = jwtData?.token;
        const result = await deleteAdoption(id, token);
        if(result.deletedCount>0){
            toast.warning("Cancelled Adoption Request!")
        }
    };
    return (
        <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">
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
                        {new Date(request.date).toLocaleDateString()}
                    </span>
                </div>
            </td>
            {/* Pickup Date */}
            <td className="py-3">
                <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-teal-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                        {new Date(request.pickUpDate).toLocaleDateString()}
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
                        variant="outline"
                        startContent={<Eye size={14} />}
                        className="border-blue-500 text-blue-600"
                    >
                        <Link href={`/all-pets/${request.petId}`}>
                            View
                        </Link>

                    </Button>
                    {/* Cancel Button - Only for pending requests */}
                    {request.status === "pending" && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelRequest(request._id)}
                            startContent={<Trash2 size={14} />}
                            className="border-red-500 text-red-600"
                        >
                            Cancel
                        </Button>
                    )}
                    {request.status !== "pending" && (
                        <Button
                            size="sm"
                            variant="outline"
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
    );
};

export default RequestTableRow;