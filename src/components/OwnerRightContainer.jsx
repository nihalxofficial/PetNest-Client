"use client"
import { updatePetData } from '@/lib/pets/action';
import { Button, Card, AlertDialog, Surface, TextField, Select, SelectItem, Input, Modal, Label, ListBox, TextArea, } from '@heroui/react';
import { Edit, Trash2, User, Upload, FileText, DollarSign, MapPin, Syringe, Heart, PawPrint, VenetianMask, Calendar } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OwnerRightContainer = ({ petData }) => {
    const [species, setSpecies] = useState(petData.species?.toLowerCase() ?? null);
    const [gender, setGender] = useState(petData.gender?.toLowerCase() ?? null);
    const [healthStatus, setHealthStatus] = useState(petData.healthStatus?.toLowerCase() ?? null);
    const [vaccination, setVaccination] = useState(petData.vaccinated === true ? "vaccinated" : "not-vaccinated");
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const updateData = {
            ...data,
            species,
            gender,
            healthStatus,
            vaccination: Boolean(vaccination),
        };
        const result = await updatePetData(petData._id, updateData);
        if(result.modifiedCount>0){
            toast.success("Data Updated!")
        }
    }
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
                    <Modal>
                        <Button
                            size="lg"
                            className="w-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            startContent={<Edit size={16} />}
                        >
                            Edit Pet Details
                        </Button>
                        <Modal.Backdrop>
                            <Modal.Container placement="auto">
                                <Modal.Dialog className="sm:max-w-3xl">
                                    <Modal.CloseTrigger />
                                    <Modal.Header>
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                                                <Edit size={20} className="text-teal-600 dark:text-teal-400" />
                                            </div>
                                            <Modal.Heading className="text-xl font-bold text-gray-900 dark:text-white">
                                                Edit Pet Details
                                            </Modal.Heading>
                                        </div>
                                        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                                            Update information about your pet
                                        </p>
                                    </Modal.Header>

                                    <Modal.Body className="p-6">
                                        <form onSubmit={onSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Pet Name */}
                                                <TextField defaultValue={petData.name} name="name">
                                                    <Label className="flex items-center gap-1">
                                                        <User size={14} className="text-teal-500" />
                                                        Pet Name <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input placeholder="Enter pet name" />
                                                </TextField>

                                                {/* Age */}
                                                <TextField defaultValue={petData.age} isRequired name="age">
                                                    <Label className="flex items-center gap-1">
                                                        <Calendar size={14} className="text-teal-500" />
                                                        Age <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input placeholder="e.g., 2 years, 6 months" />
                                                </TextField>

                                                {/* Species */}
                                                <Select value={species} onChange={(val) => setSpecies(val)} className="w-full" placeholder="Select Species">
                                                    <Label className="flex items-center gap-1">
                                                        <PawPrint size={14} className="text-teal-500" />
                                                        Species <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="cat" textValue="cat">🐱 Cat</ListBox.Item>
                                                            <ListBox.Item id="dog" textValue="dog">🐕 Dog</ListBox.Item>
                                                            <ListBox.Item id="bird" textValue="bird">🐦 Bird</ListBox.Item>
                                                            <ListBox.Item id="rabbit" textValue="rabbit">🐇 Rabbit</ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>

                                                {/* Gender */}
                                                <Select value={gender} onChange={(val) => setGender(val)} className="w-full" placeholder="Select Gender">
                                                    <Label className="flex items-center gap-1">
                                                        <VenetianMask size={14} className="text-teal-500" />
                                                        Gender <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="male" textValue="male">Male</ListBox.Item>
                                                            <ListBox.Item id="female" textValue="female">Female</ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>

                                                {/* Breed */}
                                                <TextField defaultValue={petData.breed} name="breed">
                                                    <Label className="flex items-center gap-1">
                                                        <PawPrint size={14} className="text-teal-500" />
                                                        Breed
                                                    </Label>
                                                    <Input placeholder="Enter breed" />
                                                </TextField>

                                                {/* Image URL */}
                                                <TextField defaultValue={petData.image} type="url" name="image">
                                                    <Label className="flex items-center gap-1">
                                                        <Upload size={14} className="text-teal-500" />
                                                        Image URL
                                                    </Label>
                                                    <Input placeholder="https://example.com/pet-image.jpg" startContent={<Upload size={16} className="text-gray-400" />} />
                                                </TextField>

                                                {/* Health Status */}
                                                <Select value={healthStatus} onChange={(val) => setHealthStatus(val)} className="w-full" placeholder="Select Health Status">
                                                    <Label className="flex items-center gap-1">
                                                        <Heart size={14} className="text-teal-500" />
                                                        Health Status
                                                    </Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="healthy" textValue="healthy">Healthy</ListBox.Item>
                                                            <ListBox.Item id="good" textValue="good">Good</ListBox.Item>
                                                            <ListBox.Item id="fair" textValue="fair">Fair</ListBox.Item>
                                                            <ListBox.Item id="needs-care" textValue="needs-care">Needs Care</ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>

                                                {/* Vaccination Status */}
                                                <Select value={vaccination} onChange={(val) => setVaccination(val)} className="w-full" placeholder="Select Vaccination Status">
                                                    <Label className="flex items-center gap-1">
                                                        <Syringe size={14} className="text-teal-500" />
                                                        Vaccination Status
                                                    </Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="vaccinated" textValue="vaccinated">✅ Vaccinated</ListBox.Item>
                                                            <ListBox.Item id="not-vaccinated" textValue="not-vaccinated">❌ Not Vaccinated</ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>

                                                {/* Location */}
                                                <TextField defaultValue={petData.location} name="location">
                                                    <Label className="flex items-center gap-1">
                                                        <MapPin size={14} className="text-teal-500" />
                                                        Location <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input placeholder="City, State" />
                                                </TextField>

                                                {/* Adoption Fee */}
                                                <TextField defaultValue={petData.fee} name="fee" type="number">
                                                    <Label className="flex items-center gap-1">
                                                        <DollarSign size={14} className="text-teal-500" />
                                                        Adoption Fee ($) <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input placeholder="Enter adoption fee" startContent="$" />
                                                </TextField>

                                                {/* Description */}
                                                <div className="md:col-span-2">
                                                    <TextField defaultValue={petData.description} name="description">
                                                        <Label className="flex items-center gap-1">
                                                            <FileText size={14} className="text-teal-500" />
                                                            Description
                                                        </Label>
                                                        <TextArea
                                                            className="w-full"
                                                            placeholder="Describe the pet's personality, behavior, and special needs..."
                                                            rows={4}
                                                        />
                                                    </TextField>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <Button slot="close" variant="secondary" className="flex-1">
                                                    Cancel
                                                </Button>
                                                <Button type="submit" slot="close" className="flex-1 bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>

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
                                            className="flex-1 bg-linear-to-r from-red-600 to-red-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
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