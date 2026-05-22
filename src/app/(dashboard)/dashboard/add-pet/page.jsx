"use client";

import React, { useState } from "react";
import {
    Button,
    Input,
    TextField,
    Label,
    Select,
    ListBox,
    TextArea,
    Card,
} from "@heroui/react";
import {
    User,
    Calendar,
    PawPrint,
    VenetianMask,
    Upload,
    Heart,
    Syringe,
    MapPin,
    DollarSign,
    FileText,
    PlusCircle,
} from "lucide-react";
import { addPetData } from "@/lib/pets/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getUserByEmail } from "@/lib/pets/data";

const AddPetPage = () => {
    const router = useRouter();
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [vaccination, setVaccination] = useState("");

    const { data: session } = authClient.useSession() 
        const ownerEmail = session?.user?.email;
        const ownerID = session?.user?.id;

    const onSubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            const petData = {
                ownerID,
                ownerEmail,
                ...data,
                fee: Number(data.fee),
                species,
                gender,
                healthStatus,
                vaccination: Boolean(vaccination),
            };

            const result = await addPetData(petData);
            if(result.insertedId){
                toast.success("New Pet Added!")
                
                router.push("/dashboard/my-listings")
            }
        }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                        <PlusCircle size={24} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Add New Pet
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    List a new pet for adoption. Fill in all the details below.
                </p>
            </div>

            {/* Form Card */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                <div className="p-6">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pet Name */}
                            <TextField name="name">
                                <Label className="flex items-center gap-1">
                                    <User size={14} className="text-teal-500" />
                                    Pet Name <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="Enter pet name" />
                            </TextField>

                            {/* Age */}
                            <TextField name="age">
                                <Label className="flex items-center gap-1">
                                    <Calendar size={14} className="text-teal-500" />
                                    Age <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="e.g., 2 years, 6 months" />
                            </TextField>

                            {/* Species */}
                            <Select value={species} onChange={setSpecies} className="w-full" placeholder="Select Species">
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
                            <Select value={gender} onChange={setGender} className="w-full" placeholder="Select Gender">
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
                            <TextField name="breed">
                                <Label className="flex items-center gap-1">
                                    <PawPrint size={14} className="text-teal-500" />
                                    Breed
                                </Label>
                                <Input placeholder="Enter breed" />
                            </TextField>

                            {/* Image URL */}
                            <TextField type="url" name="image">
                                <Label className="flex items-center gap-1">
                                    <Upload size={14} className="text-teal-500" />
                                    Image URL
                                </Label>
                                <Input 
                                    placeholder="https://example.com/pet-image.jpg" 
                                    startContent={<Upload size={16} className="text-gray-400" />}
                                />
                            </TextField>

                            {/* Health Status */}
                            <Select value={healthStatus} onChange={setHealthStatus} className="w-full" placeholder="Select Health Status">
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
                            <Select value={vaccination} onChange={setVaccination} className="w-full" placeholder="Select Vaccination Status">
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
                                        <ListBox.Item id="true" textValue="true">✅ Vaccinated</ListBox.Item>
                                        <ListBox.Item id="false" textValue="false">❌ Not Vaccinated</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Location */}
                            <TextField name="location">
                                <Label className="flex items-center gap-1">
                                    <MapPin size={14} className="text-teal-500" />
                                    Location <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="City, State" />
                            </TextField>

                            {/* Adoption Fee */}
                            <TextField name="fee" type="number">
                                <Label className="flex items-center gap-1">
                                    <DollarSign size={14} className="text-teal-500" />
                                    Adoption Fee ($) <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="Enter adoption fee" startContent="$" />
                            </TextField>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <TextField name="description">
                                    <Label className="flex items-center gap-1">
                                        <FileText size={14} className="text-teal-500" />
                                        Description
                                    </Label>
                                    <TextArea
                                        className="w-full"
                                        placeholder="Describe the pet's personality, behavior and special needs..."
                                        rows={4}
                                    />
                                </TextField>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                Add Pet
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AddPetPage;