// app/pets/[id]/page.jsx

import Image from "next/image";
import Link from "next/link";
import {
    Button,
    Card,
    Input,
    DatePicker,
    Chip,
    Avatar,
} from "@heroui/react";
import {
    PawPrint,
    MapPin,
    Calendar,
    Syringe,
    Heart,
    User,
    Mail,
    Phone,
    MessageCircle,
    CheckCircle,
    Info,
} from "lucide-react";
import AdoptionForm from "@/components/AdoptionForm";
import OwnerRightContainer from "@/components/OwnerRightContainer";

// Static pet data (will be replaced with API call later)
const petData = {
    id: 1,
    name: "Luna",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    ageMonths: 24,
    gender: "Female",
    location: "Austin, TX",
    vaccinated: true,
    fee: 85,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=500&fit=crop",
    description: "Luna is a friendly, playful, and loving Golden Retriever who adores children and other pets. She is well-trained, housebroken, and up-to-date on all vaccinations. Luna loves playing fetch, going for long walks, and cuddling on the couch. She would make a wonderful addition to any active family looking for a loyal companion.",
    healthStatus: "Excellent",
    temperament: "Friendly, Playful, Loyal",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    houseTrained: true,
    owner: {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        memberSince: "2022",
    },
};

// Mock logged-in user data (will be replaced with actual auth data)


const PetDetailsPage = async ({ params }) => {
    const petId = params.id;



    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30 py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Back Button */}
                <Button
                    variant="light"
                    className="mb-6 text-teal-600 dark:text-teal-400"

                >
                    <Link href={"/all-pets"} className="flex justify-between items-center gap-2">
                    <PawPrint size={16} />
                        Back to All Pets
                    </Link>
                </Button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Pet Information */}
                    <div className="flex-1 space-y-6">
                        {/* Pet Image Card */}
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                            <div className="relative h-96 md:h-[500px]">
                                <Image
                                    src={petData.image}
                                    alt={petData.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute top-4 right-4">
                                    <Chip
                                        color="primary"
                                        variant="shadow"
                                        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                                    >
                                        Adoption Fee: ${petData.fee}
                                    </Chip>
                                </div>
                            </div>
                        </Card>

                        {/* Pet Name and Basic Info */}
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                            <div className="p-6">
                                <div className="flex justify-between items-start flex-wrap gap-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                            {petData.name}
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">
                                            {petData.breed} • {petData.species}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Chip
                                            variant="flat"
                                            color="success"
                                            startContent={<CheckCircle size={14} />}
                                        >
                                            Available
                                        </Chip>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                                {/* Pet Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                        <Calendar size={20} className="text-teal-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                                            <p className="font-semibold text-gray-800 dark:text-white">{petData.age}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                        <User size={20} className="text-teal-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                                            <p className="font-semibold text-gray-800 dark:text-white">{petData.gender}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                        <MapPin size={20} className="text-teal-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                                            <p className="font-semibold text-gray-800 dark:text-white">{petData.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Health Status Section */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Syringe size={18} className="text-teal-500" />
                                        Health & Status
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {petData.vaccinated && (
                                            <Chip
                                                variant="flat"
                                                color="success"
                                                startContent={<CheckCircle size={14} />}
                                            >
                                                Vaccinated
                                            </Chip>
                                        )}
                                        {petData.neutered && (
                                            <Chip
                                                variant="flat"
                                                color="success"
                                                startContent={<CheckCircle size={14} />}
                                            >
                                                Neutered/Spayed
                                            </Chip>
                                        )}
                                        {petData.microchipped && (
                                            <Chip
                                                variant="flat"
                                                color="success"
                                                startContent={<CheckCircle size={14} />}
                                            >
                                                Microchipped
                                            </Chip>
                                        )}
                                        <Chip
                                            variant="flat"
                                            color="primary"
                                            startContent={<Info size={14} />}
                                        >
                                            Health: {petData.healthStatus}
                                        </Chip>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        About {petData.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {petData.description}
                                    </p>
                                </div>

                                {/* Owner Info */}
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Heart size={18} className="text-teal-500" />
                                        Owner Information
                                    </h3>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                        <Avatar
                                            src={petData.owner.avatar}
                                            name={petData.owner.name.charAt(0)}
                                            size="lg"
                                            className="ring-2 ring-teal-500/20"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">
                                                {petData.owner.name}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                <Mail size={14} />
                                                {petData.owner.email}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                <Phone size={14} />
                                                {petData.owner.phone}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Member since {petData.owner.memberSince}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Adoption Form */}
                    <div className="lg:w-96">
                        <OwnerRightContainer />
                        {/* <AdoptionForm petId={petId} petData={petData} />                                             */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetailsPage;