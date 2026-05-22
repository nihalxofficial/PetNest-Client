// app/(dashboard)/dashboard/my-listings/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Button,
    Card,
    Chip,
    Modal,
    Input,
    TextField,
    Label,
    Select,
    ListBox,
    TextArea,
} from "@heroui/react";
import {
    PawPrint,
    Eye,
    Edit,
    Trash2,
    MessageCircle,
    CheckCircle,
    XCircle,
    Clock,
    Heart,
    MapPin,
    Calendar,
    Syringe,
    User,
    Mail,
    VenetianMask,
    Upload,
    DollarSign,
    FileText,
} from "lucide-react";

// Hardcoded pet listings data
const myListingsData = [
    {
        id: "pet_1",
        name: "Luna",
        species: "Dog",
        breed: "Golden Retriever",
        age: "2 years",
        gender: "Female",
        location: "Austin, TX",
        fee: 85,
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        status: "available",
        vaccinated: true,
        healthStatus: "Excellent",
        description: "Luna is a friendly and playful Golden Retriever who loves children and other pets.",
        requests: [
            {
                id: "req_1",
                userName: "John Doe",
                userEmail: "john.doe@example.com",
                pickupDate: "2024-05-20",
                status: "pending",
            },
            {
                id: "req_2",
                userName: "Sarah Johnson",
                userEmail: "sarah.j@example.com",
                pickupDate: "2024-05-22",
                status: "pending",
            },
        ],
    },
    {
        id: "pet_2",
        name: "Oliver",
        species: "Cat",
        breed: "Maine Coon",
        age: "1.5 years",
        gender: "Male",
        location: "Denver, CO",
        fee: 70,
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
        status: "available",
        vaccinated: true,
        healthStatus: "Good",
        description: "Oliver is a gentle giant who loves cuddles and playing with toys.",
        requests: [
            {
                id: "req_3",
                userName: "Michael Brown",
                userEmail: "michael.b@example.com",
                pickupDate: "2024-05-18",
                status: "pending",
            },
        ],
    },
    {
        id: "pet_3",
        name: "Rocky",
        species: "Dog",
        breed: "German Shepherd",
        age: "3 years",
        gender: "Male",
        location: "Chicago, IL",
        fee: 95,
        image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=300&fit=crop",
        status: "adopted",
        vaccinated: true,
        healthStatus: "Excellent",
        description: "Rocky is a loyal and protective German Shepherd, great for active families.",
        requests: [],
    },
    {
        id: "pet_4",
        name: "Mochi",
        species: "Cat",
        breed: "Ragdoll",
        age: "6 months",
        gender: "Female",
        location: "San Diego, CA",
        fee: 120,
        image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=300&fit=crop",
        status: "available",
        vaccinated: true,
        healthStatus: "Excellent",
        description: "Mochi is a sweet and affectionate Ragdoll cat who loves to be held.",
        requests: [],
    },
    {
        id: "pet_5",
        name: "Coco",
        species: "Rabbit",
        breed: "Holland Lop",
        age: "1 year",
        gender: "Female",
        location: "Portland, OR",
        fee: 50,
        image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=300&fit=crop",
        status: "available",
        vaccinated: true,
        healthStatus: "Good",
        description: "Coco is a fluffy and energetic rabbit who loves to hop around.",
        requests: [],
    },
];

const MyListingsPage = () => {
    const [listings, setListings] = useState(myListingsData);
    const [selectedPet, setSelectedPet] = useState(null);
    const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Edit form states
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [vaccination, setVaccination] = useState("");

    // Stats calculations
    const totalListings = listings.length;
    const availablePets = listings.filter(pet => pet.status === "available").length;
    const adoptedPets = listings.filter(pet => pet.status === "adopted").length;

    const handleViewRequests = (pet) => {
        setSelectedPet(pet);
        setIsRequestsModalOpen(true);
    };

    const handleEditPet = (pet) => {
        setSelectedPet(pet);
        setSpecies(pet.species);
        setGender(pet.gender);
        setHealthStatus(pet.healthStatus || "Excellent");
        setVaccination(pet.vaccinated ? "vaccinated" : "not-vaccinated");
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (pet) => {
        setPetToDelete(pet);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        console.log("Delete pet:", petToDelete?.id);
        // Remove from listings array
        setListings(listings.filter(pet => pet.id !== petToDelete?.id));
        setIsDeleteModalOpen(false);
        setPetToDelete(null);
    };

    const handleApproveRequest = (requestId) => {
        console.log("Approve request:", requestId);
    };

    const handleRejectRequest = (requestId) => {
        console.log("Reject request:", requestId);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log("Updated pet data:", { selectedPet, species, gender, healthStatus, vaccination });
        setIsEditModalOpen(false);
    };

    const StatusChip = ({ status }) => {
        if (status === "available") {
            return (
                <Chip color="success" variant="flat" startContent={<CheckCircle size={12} />}>
                    Available
                </Chip>
            );
        }
        return (
            <Chip color="secondary" variant="flat" startContent={<Heart size={12} />}>
                Adopted
            </Chip>
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                        <PawPrint size={24} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        My Listings
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Manage your pet listings, view adoption requests, edit or delete pets
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Listings</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalListings}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                            <PawPrint size={24} className="text-teal-600 dark:text-teal-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Available Pets</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{availablePets}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Adopted Pets</p>
                            <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">{adoptedPets}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                            <Heart size={24} className="text-rose-600 dark:text-rose-400" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {listings.map((pet) => (
                    <Card key={pet.id} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                            {/* Pet Image */}
                            <div className="relative w-full sm:w-40 h-40 sm:h-auto">
                                <Image
                                    src={pet.image}
                                    alt={pet.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 left-2">
                                    <StatusChip status={pet.status} />
                                </div>
                            </div>

                            {/* Pet Info */}
                            <div className="flex-1 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {pet.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {pet.breed} • {pet.species}
                                        </p>
                                    </div>
                                    {/* Adoption Fee / Price */}
                                    <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
                                        ${pet.fee}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} className="text-teal-500" />
                                        {pet.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} className="text-teal-500" />
                                        {pet.age}
                                    </div>
                                    {pet.vaccinated && (
                                        <div className="flex items-center gap-1 text-green-600">
                                            <Syringe size={14} />
                                            Vaccinated
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {/* Requests Button → opens Requests Modal */}
                                    {pet.status === "available" && pet.requests.length > 0 && (
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            onPress={() => handleViewRequests(pet)}
                                            startContent={<MessageCircle size={14} />}
                                            className="border-teal-500 text-teal-600"
                                        >
                                            Requests ({pet.requests.length})
                                        </Button>
                                    )}
                                    {/* View Button → navigates to /all-pets/:id */}
                                    <Button
                                        size="sm"
                                        variant="bordered"
                                        as={Link}
                                        href={`/all-pets/${pet.id}`}
                                        startContent={<Eye size={14} />}
                                        className="border-blue-500 text-blue-600"
                                    >
                                        View
                                    </Button>
                                    {/* Edit Button → opens Update Pet Modal */}
                                    <Button
                                        size="sm"
                                        variant="bordered"
                                        onPress={() => handleEditPet(pet)}
                                        startContent={<Edit size={14} />}
                                        className="border-amber-500 text-amber-600"
                                    >
                                        Edit
                                    </Button>
                                    {/* Delete Button → triggers confirmation modal */}
                                    <Button
                                        size="sm"
                                        variant="bordered"
                                        onPress={() => handleDeleteClick(pet)}
                                        startContent={<Trash2 size={14} />}
                                        className="border-red-500 text-red-600"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {listings.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <PawPrint size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Listings Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven't added any pets for adoption yet.
                    </p>
                    <Link href="/dashboard/add-pet">
                        <Button className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white">
                            Add Your First Pet
                        </Button>
                    </Link>
                </div>
            )}

            {/* ========== EDIT MODAL ========== */}
            <Modal isOpen={isEditModalOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-3xl">
                            <Modal.CloseTrigger onPress={() => setIsEditModalOpen(false)} />
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
                                <form onSubmit={handleEditSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Pet Name */}
                                        <TextField defaultValue={selectedPet?.name} name="name">
                                            <Label className="flex items-center gap-1">
                                                <User size={14} className="text-teal-500" />
                                                Pet Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="Enter pet name" />
                                        </TextField>

                                        {/* Age */}
                                        <TextField defaultValue={selectedPet?.age} isRequired name="age">
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
                                        <TextField defaultValue={selectedPet?.breed} name="breed">
                                            <Label className="flex items-center gap-1">
                                                <PawPrint size={14} className="text-teal-500" />
                                                Breed
                                            </Label>
                                            <Input placeholder="Enter breed" />
                                        </TextField>

                                        {/* Image URL */}
                                        <TextField defaultValue={selectedPet?.image} type="url" name="image">
                                            <Label className="flex items-center gap-1">
                                                <Upload size={14} className="text-teal-500" />
                                                Image URL
                                            </Label>
                                            <Input placeholder="https://example.com/pet-image.jpg" startContent={<Upload size={16} className="text-gray-400" />} />
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
                                                    <ListBox.Item id="vaccinated" textValue="vaccinated">✅ Vaccinated</ListBox.Item>
                                                    <ListBox.Item id="not-vaccinated" textValue="not-vaccinated">❌ Not Vaccinated</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>

                                        {/* Location */}
                                        <TextField defaultValue={selectedPet?.location} name="location">
                                            <Label className="flex items-center gap-1">
                                                <MapPin size={14} className="text-teal-500" />
                                                Location <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="City, State" />
                                        </TextField>

                                        {/* Adoption Fee */}
                                        <TextField defaultValue={selectedPet?.fee} name="fee" type="number">
                                            <Label className="flex items-center gap-1">
                                                <DollarSign size={14} className="text-teal-500" />
                                                Adoption Fee ($) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="Enter adoption fee" startContent="$" />
                                        </TextField>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={selectedPet?.description} name="description">
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

                                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <Button slot="close" variant="secondary" className="flex-1" onPress={() => setIsEditModalOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close" className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            {/* ========== REQUESTS MODAL ========== */}
            {/* ========== REQUESTS MODAL ========== */}
{isRequestsModalOpen && selectedPet && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] flex flex-col">
            {/* Header - White/Clean */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Adoption Requests for {selectedPet.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Review and manage adoption requests
                        </p>
                    </div>
                    <button
                        onClick={() => setIsRequestsModalOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <XCircle size={22} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {selectedPet.requests.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No adoption requests yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {selectedPet.requests.map((request) => (
                            <div key={request.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <User size={14} className="text-teal-500" />
                                            <span className="font-semibold text-gray-800 dark:text-white">
                                                {request.userName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <Mail size={12} />
                                            {request.userEmail}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            <Calendar size={12} />
                                            Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        {request.status === "pending" && (
                                            <Chip color="warning" variant="flat" size="sm" startContent={<Clock size={12} />}>
                                                Pending
                                            </Chip>
                                        )}
                                        {request.status === "approved" && (
                                            <Chip color="success" variant="flat" size="sm" startContent={<CheckCircle size={12} />}>
                                                Approved
                                            </Chip>
                                        )}
                                        {request.status === "rejected" && (
                                            <Chip color="danger" variant="flat" size="sm" startContent={<XCircle size={12} />}>
                                                Rejected
                                            </Chip>
                                        )}
                                    </div>
                                </div>
                                {request.status === "pending" && selectedPet.status === "available" && (
                                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <Button
                                            size="sm"
                                            color="success"
                                            onPress={() => handleApproveRequest(request.id)}
                                            startContent={<CheckCircle size={14} />}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="bordered"
                                            onPress={() => handleRejectRequest(request.id)}
                                            startContent={<XCircle size={14} />}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer - White/Clean */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="bordered" onPress={() => setIsRequestsModalOpen(false)} className="w-full">
                    Close
                </Button>
            </div>
        </div>
    </div>
)}

            {/* ========== DELETE CONFIRMATION MODAL ========== */}
            {isDeleteModalOpen && petToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 w-full max-w-md mx-4">
                        <div className="p-6 pb-2">
                            <div className="flex items-center gap-2 text-red-600">
                                <Trash2 size={24} />
                                <h2 className="text-xl font-bold">Delete Pet Listing</h2>
                            </div>
                        </div>
                        <div className="p-6 pt-4">
                            <p className="text-gray-700 dark:text-gray-300">
                                Are you sure you want to delete <span className="font-semibold">{petToDelete.name}</span>'s listing?
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                This action cannot be undone. This pet listing will be permanently removed.
                            </p>
                        </div>
                        <div className="p-6 pt-2 flex gap-3">
                            <Button variant="bordered" onPress={() => setIsDeleteModalOpen(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                color="danger"
                                onPress={handleDeleteConfirm}
                                startContent={<Trash2 size={14} />}
                                className="flex-1"
                            >
                                Delete Pet
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyListingsPage;