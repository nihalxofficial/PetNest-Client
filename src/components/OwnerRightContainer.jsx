import { Button, Card, AlertDialog } from '@heroui/react';
import { Edit, Trash2, User } from 'lucide-react';
import React from 'react';

const OwnerRightContainer = ({ petData }) => {
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
                        className="w-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        startContent={<Edit size={16} />}
                    >
                        Edit Pet Details
                    </Button>

                    <AlertDialog>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="w-full border-red-500 text-red-600 dark:border-red-400 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300"
                            startContent={<Trash2 size={16} />}
                        >
                            Delete Pet
                        </Button>
                        <AlertDialog.Backdrop className="bg-black/20 backdrop-blur-none">
                            <AlertDialog.Container className="rounded-2xl shadow-2xl">
                                <AlertDialog.Dialog className="sm:max-w-100 p-6">
                                    <div className="flex justify-end">
                                        <AlertDialog.CloseTrigger />
                                    </div>
                                    <AlertDialog.Header className="flex flex-col items-center text-center gap-3 pb-2">
                                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                                            <Trash2 size={32} className="text-red-600 dark:text-red-400" />
                                        </div>
                                        <AlertDialog.Heading className="text-xl font-bold text-gray-900 dark:text-white">
                                            Delete Pet Listing
                                        </AlertDialog.Heading>
                                    </AlertDialog.Header>
                                    <AlertDialog.Body className="text-center py-4">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            This will permanently delete <strong className="text-red-600 dark:text-red-400">{petData.name}</strong> and all of its data.
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                            This action cannot be undone.
                                        </p>
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer className="flex gap-3 pt-4">
                                        <Button
                                            slot="close"
                                            variant="bordered"
                                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            slot="close"
                                            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                                            startContent={<Trash2 size={16} />}
                                        >
                                            Delete Pet
                                        </Button>
                                    </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                            </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                    </AlertDialog>
                </div>
            </div>
        </Card>
    )
};

export default OwnerRightContainer;