// No "use server" here — this is just a Server Component by default
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    Chip,
    Avatar,
} from "@heroui/react";
import {
    PawPrint, MapPin, Calendar as CalendarIcon,
    Syringe, Heart, User, Mail,
    CheckCircle, Info, Clock, XCircle, Frown, Search,
} from "lucide-react";
import AdoptionForm from "@/components/AdoptionForm";
import OwnerRightContainer from "@/components/OwnerRightContainer";
import { getPetById, getUserById } from "@/lib/pets/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PetDetailsPage = async ({ params }) => {
    const { id } = await params;

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const petData = await getPetById(id, token);

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    if (petData.error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30 py-8 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">

                    {/* Back Button — use Link directly, styled as button */}
                    <Link
                        href="/all-pets"
                        className="inline-flex items-center gap-2 mb-6 text-teal-600 dark:text-teal-400 hover:underline"
                    >
                        <PawPrint size={16} />
                        Back to All Pets
                    </Link>

                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                        <div className="p-12 text-center">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 rounded-full bg-amber-100 dark:bg-amber-900/30 animate-pulse" />
                                <div className="absolute inset-2 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
                                    <Frown size={48} className="text-amber-600 dark:text-amber-400" />
                                </div>
                                {/* <div className="absolute -top-2 -right-2">
                                    <Search size={24} className="text-teal-500 animate-bounce" />
                                </div> */}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                Pet Not Found
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                                We couldn't find the pet you're looking for. It may have been removed, adopted, or the link might be incorrect.
                            </p>

                            <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

                            <div className="text-left max-w-md mx-auto mb-8">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                    <Info size={14} className="text-teal-500" />
                                    Here are some suggestions:
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={12} className="text-teal-500" />
                                        Check the URL for any typos
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={12} className="text-teal-500" />
                                        Browse our available pets gallery
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={12} className="text-teal-500" />
                                        Contact support if you need assistance
                                    </li>
                                </ul>
                            </div>

                            {/* Action Buttons — use Link styled as button, no as={Link} */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href="/all-pets"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <PawPrint size={16} />
                                    Browse All Pets
                                </Link>
                                <button className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                                    <Heart size={16} />
                                    Contact Support
                                </button>
                            </div>

                            {/* <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">50+</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Available Pets</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">200+</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Happy Adoptions</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">24/7</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Support Available</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    const ownerID = petData?.ownerID;
    const owner = await getUserById(ownerID, token);
    const isOwner = user?.email === petData?.ownerEmail;

    return (
        <div className="min-h-screen bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30 py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">

                {/* Back Button */}
                <Link
                    href="/all-pets"
                    className="inline-flex items-center gap-2 mb-6 text-teal-600 dark:text-teal-400 hover:underline"
                >
                    <PawPrint size={16} />
                    Back to All Pets
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="flex-1 space-y-6">
                        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                            <div className="relative h-96 md:h-125">
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
                                        className="bg-linear-to-r from-teal-500 to-emerald-500 text-white"
                                    >
                                        Adoption Fee: ${petData.fee}
                                    </Chip>
                                </div>
                            </div>
                        </Card>

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
                                        {petData.status === "available" && (
                                            <Chip variant="flat" color="success" className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400">
                                                <div className="flex items-center gap-1.5">
                                                    <CheckCircle size={14} />
                                                    Available
                                                </div>
                                            </Chip>
                                        )}
                                        {petData.status === "adopting" && (
                                            <Chip variant="flat" color="warning" className="bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={14} />
                                                    Adopting
                                                </div>
                                            </Chip>
                                        )}
                                        {petData.status === "adopted" && (
                                            <Chip variant="flat" color="secondary" className="bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Heart size={14} className="fill-rose-500" />
                                                    Adopted
                                                </div>
                                            </Chip>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                        <CalendarIcon size={20} className="text-teal-500" />
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

                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Syringe size={18} className="text-teal-500" />
                                        Health & Status
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {petData.vaccinated === true ? (
                                            <Chip variant="flat" color="success" className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400">
                                                <div className="flex items-center gap-1.5"><CheckCircle size={14} />Vaccinated</div>
                                            </Chip>
                                        ) : (
                                            <Chip variant="flat" color="danger" className="bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400">
                                                <div className="flex items-center gap-1.5"><XCircle size={14} />Not Vaccinated</div>
                                            </Chip>
                                        )}
                                        {petData.microchipped === true && (
                                            <Chip variant="flat" color="success" className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400">
                                                <div className="flex items-center gap-1.5"><CheckCircle size={14} />Microchipped</div>
                                            </Chip>
                                        )}
                                        <Chip variant="flat" color="primary" startContent={<Info size={14} />}>
                                            Health: {petData.healthStatus}
                                        </Chip>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        About {petData.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {petData.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Heart size={18} className="text-teal-500" />
                                        Owner Information
                                    </h3>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                        <Avatar>
                                            <Avatar.Image alt={owner.name} src={owner.image} />
                                            <Avatar.Fallback>{owner.name.charAt(0)}</Avatar.Fallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">{owner.name}</p>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                <Mail size={14} />
                                                {owner.email}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Member since {new Date(owner.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'long', day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-96">
                        {isOwner ? (
                            <OwnerRightContainer petData={petData} />
                        ) : petData.status === "adopted" ? (
                            <Card className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center">
                                        <Heart size={40} className="text-rose-500 fill-rose-500" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        This Pet Has Been Adopted
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                                        {petData.name} has found their forever home.
                                    </p>
                                    {/* Link styled as button — no as={Link} needed */}
                                    <Link
                                        href="/all-pets"
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        <PawPrint size={16} />
                                        Browse Other Pets
                                    </Link>
                                </div>
                            </Card>
                        ) : (
                            <AdoptionForm id={id} petData={petData} user={user} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetailsPage;