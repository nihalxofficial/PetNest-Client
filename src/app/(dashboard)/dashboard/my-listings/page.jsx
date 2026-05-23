"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
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
import { getAdoptionByPet, getPetByOwner } from "@/lib/pets/data";
import { authClient } from "@/lib/auth-client";
import { CircleCheckFill } from "@gravity-ui/icons";
import { approveAdoption, deletePetData, rejectAdoption, updatePetData } from "@/lib/pets/action";
import { toast } from "react-toastify";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import { RequestSkeleton } from "@/components/RequestSkeleton";

// Poll interval for new adoption requests (in ms)
const POLL_INTERVAL = 15000;

const MyListingsPage = () => {
    const [selectedPet, setSelectedPet] = useState(null);
    const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRequestsLoading, setIsRequestsLoading] = useState(false);

    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [vaccination, setVaccination] = useState("not-vaccinated");
    const [token, setToken] = useState(null); // ✅ token in state

    const { data: session } = authClient.useSession();
    const ownerID = session?.user?.id;

    const [adoptions, setAdoptions] = useState([]);
    const [listings, setListings] = useState([]);

    // Ref to track the currently open pet for polling without stale closure
    const selectedPetRef = useRef(null);
    // eslint-disable-next-line react-hooks/refs
    selectedPetRef.current = selectedPet;

    // ─── Get JWT token once on mount ─────────────────────────────────────────
    useEffect(() => {
        const getToken = async () => {
            const { data: jwtData } = await authClient.token();
            setToken(jwtData?.token);
        };
        getToken();
    }, []);

    // ─── Initial data fetch ───────────────────────────────────────────────────
    useEffect(() => {
        if (!ownerID || !token) return;
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                const listingsData = await getPetByOwner(ownerID, token);
                setListings(listingsData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, [ownerID, token]);

    // ─── Fetch adoptions whenever selectedPet changes ─────────────────────────
    const fetchAdoptions = useCallback(async (petId) => {
        if (!petId || !token) return;
        setIsRequestsLoading(true);
        try {
            const adoptionData = await getAdoptionByPet(petId, token);
            setAdoptions(Array.isArray(adoptionData) ? adoptionData : []);
        } catch (error) {
            console.error(error);
            setAdoptions([]);
        } finally {
            setIsRequestsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (!selectedPet?._id) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAdoptions(selectedPet._id);
    }, [selectedPet?._id, fetchAdoptions]);

    // ─── Auto-poll for new adoption requests while modal is open ─────────────
    useEffect(() => {
        if (!isRequestsModalOpen) return;

        const interval = setInterval(() => {
            const pet = selectedPetRef.current;
            if (pet?._id && token) {
                getAdoptionByPet(pet._id, token)
                    .then((fresh) => {
                        const freshArray = Array.isArray(fresh) ? fresh : [];
                        setAdoptions((prev) => {
                            if (JSON.stringify(freshArray) !== JSON.stringify(prev)) {
                                return freshArray;
                            }
                            return prev;
                        });
                    })
                    .catch(console.error);
            }
        }, POLL_INTERVAL);

        return () => clearInterval(interval);
    }, [isRequestsModalOpen, token]);

    // ─── Stats ────────────────────────────────────────────────────────────────
    const totalListings = listings.length;
    const availablePets = listings.filter((pet) => pet.status === "available").length;
    const adoptedPets = listings.filter((pet) => pet.status === "adopted").length;

    // ─── Handlers ─────────────────────────────────────────────────────────────

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const updateData = {
            ...data,
            fee: Number(data.fee),
            species,
            gender,
            healthStatus,
            vaccination: vaccination === "vaccinated",
        };

        setListings((prev) =>
            prev.map((pet) =>
                pet._id === selectedPet._id ? { ...pet, ...updateData } : pet
            )
        );

        setIsEditModalOpen(false);

        try {
            const result = await updatePetData(selectedPet._id, updateData);
            if (result) {
                toast.success("Data Updated!");
                if (ownerID && token) {
                    const fresh = await getPetByOwner(ownerID, token);
                    setListings(fresh);
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Update failed. Please try again.");
            if (ownerID && token) {
                const fresh = await getPetByOwner(ownerID, token);
                setListings(fresh);
            }
        }
    };

    const handleDelete = async () => {
        const result = await deletePetData(petToDelete._id);

        if (result?.deletedCount > 0) {
            toast.warning(`${petToDelete.name} is deleted from listings`);
            setListings((prev) => prev.filter((pet) => pet._id !== petToDelete._id));
            setIsDeleteModalOpen(false);
            setPetToDelete(null);
        }
    };

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

    // ── Approve: optimistic update, then server call ──────────────────────────
    const handleApproveRequest = async (adoptionId) => {
        setAdoptions((prev) =>
            prev.map((a) => (a._id === adoptionId ? { ...a, status: "approved" } : a))
        );
        try {
            await approveAdoption(adoptionId);
            if (ownerID && token) {
                const fresh = await getPetByOwner(ownerID, token);
                setListings(fresh);
            }
        } catch (err) {
            toast.error("Failed to approve. Please try again.");
            setAdoptions((prev) =>
                prev.map((a) => (a._id === adoptionId ? { ...a, status: "pending" } : a))
            );
        }
    };

    // ── Reject: optimistic update, then server call ───────────────────────────
    const handleRejectRequest = async (adoptionId) => {
        setAdoptions((prev) =>
            prev.map((a) => (a._id === adoptionId ? { ...a, status: "rejected" } : a))
        );
        try {
            await rejectAdoption(adoptionId);
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject. Please try again.");
            setAdoptions((prev) =>
                prev.map((a) => (a._id === adoptionId ? { ...a, status: "pending" } : a))
            );
        }
    };

    const StatusChip = ({ status }) => {
        if (status === "available") {
            return (
                <Chip color="success">
                    <CircleCheckFill width={12} />
                    <Chip.Label>Available</Chip.Label>
                </Chip>
            );
        }
        if (status === "adopting") {
            return (
                <Chip color="warning">
                    <Clock width={12} />
                    <Chip.Label>adopting</Chip.Label>
                </Chip>
            );
        }
        return (
            <Chip color="secondary" variant="flat" className="text-rose-500">
                <Heart size={12} />
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

            {/* Listings Grid with Skeleton Loader */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isLoading ? (
                    <>
                        <ListingSkeleton />
                        <ListingSkeleton />
                        <ListingSkeleton />
                        <ListingSkeleton />
                    </>
                ) : (
                    listings.map((pet) => (
                        <Card key={pet._id} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
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
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            onPress={() => handleViewRequests(pet)}
                                            startContent={<MessageCircle size={14} />}
                                            className="border-teal-500 text-teal-600"
                                        >
                                            Requests
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            startContent={<Eye size={14} />}
                                            className="border-blue-500 text-blue-600"
                                        >
                                            <Link href={`/all-pets/${pet._id}`}>View</Link>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            onClick={() => handleEditPet(pet)}
                                            startContent={<Edit size={14} />}
                                            className="border-amber-500 text-amber-600"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            onClick={() => handleDeleteClick(pet)}
                                            startContent={<Trash2 size={14} />}
                                            className="border-red-500 text-red-600"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Empty State */}
            {!isLoading && listings.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <PawPrint size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Listings Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven&apos;t added any pets for adoption yet.
                    </p>
                    <Link href="/dashboard/add-pet">
                        <Button className="bg-linear-to-r from-teal-600 to-emerald-500 text-white">
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
                                <form onSubmit={onSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <TextField defaultValue={selectedPet?.name} name="name">
                                            <Label className="flex items-center gap-1">
                                                <User size={14} className="text-teal-500" />
                                                Pet Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="Enter pet name" />
                                        </TextField>

                                        <TextField defaultValue={selectedPet?.age} isRequired name="age">
                                            <Label className="flex items-center gap-1">
                                                <Calendar size={14} className="text-teal-500" />
                                                Age <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="e.g., 2 years, 6 months" />
                                        </TextField>

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

                                        <TextField defaultValue={selectedPet?.breed} name="breed">
                                            <Label className="flex items-center gap-1">
                                                <PawPrint size={14} className="text-teal-500" />
                                                Breed
                                            </Label>
                                            <Input placeholder="Enter breed" />
                                        </TextField>

                                        <TextField defaultValue={selectedPet?.image} type="url" name="image">
                                            <Label className="flex items-center gap-1">
                                                <Upload size={14} className="text-teal-500" />
                                                Image URL
                                            </Label>
                                            <Input placeholder="https://example.com/pet-image.jpg" startContent={<Upload size={16} className="text-gray-400" />} />
                                        </TextField>

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

                                        <TextField defaultValue={selectedPet?.location} name="location">
                                            <Label className="flex items-center gap-1">
                                                <MapPin size={14} className="text-teal-500" />
                                                Location <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="City, State" />
                                        </TextField>

                                        <TextField defaultValue={selectedPet?.fee} name="fee" type="number">
                                            <Label className="flex items-center gap-1">
                                                <DollarSign size={14} className="text-teal-500" />
                                                Adoption Fee ($) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input placeholder="Enter adoption fee" startContent="$" />
                                        </TextField>

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

            {/* ========== REQUESTS MODAL ========== */}
            {isRequestsModalOpen && selectedPet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] flex flex-col">
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
                                    className="p-1 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <XCircle size={22} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {isRequestsLoading ? (
                                <>
                                    <RequestSkeleton />
                                </>
                            ) : adoptions.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No adoption requests yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {adoptions.map((adoption) => (
                                        <div key={adoption._id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <User size={14} className="text-teal-500" />
                                                        <span className="font-semibold text-gray-800 dark:text-white">
                                                            {adoption.userName}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <Mail size={12} />
                                                        {adoption.userEmail}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        <Calendar size={12} />
                                                        Pickup: {new Date(adoption.pickUpDate).toLocaleDateString()}
                                                    </div>
                                                    {adoption.message && (
                                                        <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                            <MessageCircle size={12} className="text-teal-500 mt-0.5" />
                                                            <span className="italic">{adoption.message}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    {adoption.status === "pending" && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                            <Clock size={10} />
                                                            Pending
                                                        </span>
                                                    )}
                                                    {adoption.status === "approved" && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                            <CheckCircle size={10} />
                                                            Approved
                                                        </span>
                                                    )}
                                                    {adoption.status === "rejected" && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                                            <XCircle size={10} />
                                                            Rejected
                                                        </span>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onPress={() => console.log("View user:", adoption.userId)}
                                                        startContent={<User size={12} />}
                                                        className="text-blue-600 dark:text-blue-400"
                                                    >
                                                        View User
                                                    </Button>
                                                </div>
                                            </div>
                                            {adoption.status === "pending" && (
                                                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        onClick={() => handleApproveRequest(adoption._id)}
                                                        startContent={<CheckCircle size={14} />}
                                                        className="bg-green-600 text-white"
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        variant="danger"
                                                        onClick={() => handleRejectRequest(adoption._id)}
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

                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <Button variant="outline" onPress={() => setIsRequestsModalOpen(false)} className="w-full">
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
                                Are you sure you want to delete <span className="font-semibold">{petToDelete.name}</span>&apos;s listing?
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
                                variant="danger"
                                onPress={handleDelete}
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