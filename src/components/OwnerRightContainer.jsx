import { Button, Card } from '@heroui/react';
import { Edit, Trash2, User } from 'lucide-react';
import React from 'react';

const OwnerRightContainer = () => {
    return (
        // Owner View - Edit and Delete buttons only
        <Card className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
            <div className="p-6">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center">
                        <User size={32} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Your Listing
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        You cannot adopt your own pet
                    </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                <div className="space-y-3">
                    <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        startContent={<Edit size={16} />}
                    >
                        Edit Pet Details
                    </Button>

                    <Button
                        size="lg"
                        variant="bordered"
                        className="w-full border-red-500 text-red-600 dark:border-red-400 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300"
                        startContent={<Trash2 size={16} />}
                    >
                        Delete Pet
                    </Button>
                </div>
            </div>
        </Card>
    ) 
};

export default OwnerRightContainer;