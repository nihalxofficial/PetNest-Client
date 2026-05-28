"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Button,
    Card,
    Chip,
    Avatar,
    Input,
    Label,
    TextArea,
} from "@heroui/react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Heart,
    PawPrint,
    Edit,
    Save,
    X,
    Camera,
    Award,
    CheckCircle,
    Clock,
    MessageCircle,
    Shield,
    Globe,
} from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

// Hardcoded profile data
const profileData = {
    id: "user_1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400",
    coverImage: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=300&fit=crop",
    phone: "+1 (555) 123-4567",
    location: "Austin, TX",
    joinDate: "2024-01-15",
    role: "Pet Owner & Adopter",
    bio: "Passionate pet lover and advocate for animal adoption. Proud owner of two rescued pets - a Golden Retriever named Luna and a Maine Coon cat named Oliver. I believe every animal deserves a loving home and I'm committed to making pet adoption accessible and joyful for everyone.",
    interests: ["Dog Walking", "Pet Photography", "Animal Rescue", "Volunteering"],
    socialLinks: {
        twitter: "https://twitter.com/johndoe",
        instagram: "https://instagram.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
    },
    stats: {
        totalListings: 5,
        activeListings: 3,
        adoptedPets: 2,
        totalRequests: 8,
        approvedRequests: 6,
        pendingRequests: 2,
        responseRate: 95,
        avgResponseTime: "2 hours",
    },
    recentActivity: [
        {
            id: 1,
            type: "listing",
            message: "Added new pet listing - Luna",
            time: "2 days ago",
            icon: PawPrint,
        },
        {
            id: 2,
            type: "request",
            message: "Received adoption request for Oliver",
            time: "3 days ago",
            icon: MessageCircle,
        },
        {
            id: 3,
            type: "adoption",
            message: "Rocky was successfully adopted!",
            time: "1 week ago",
            icon: Heart,
        },
    ],
    badges: [
        { name: "Early Adopter", icon: Award, color: "text-amber-500" },
        { name: "Verified Owner", icon: Shield, color: "text-teal-500" },
        { name: "5 Listings", icon: PawPrint, color: "text-emerald-500" },
    ],
};

const ProfilePage = () => {
    const [profile, setProfile] = useState(profileData);
    const [isEditing, setIsEditing] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [editForm, setEditForm] = useState({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setProfile(prev => ({
            ...prev,
            name: editForm.name,
            email: editForm.email,
            phone: editForm.phone,
            location: editForm.location,
            bio: editForm.bio,
        }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            bio: profile.bio,
        });
        setIsEditing(false);
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                        <User size={24} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        My Profile
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    View and manage your personal information
                </p>
            </div>

            {/* Cover Image & Avatar Section */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 overflow-hidden mb-6">
                {/* Cover Image */}
                <div className="relative h-40 md:h-48 w-full bg-linear-to-r from-teal-500 to-emerald-500">
                    <Image
                        src={profile.coverImage}
                        alt="Cover"
                        fill
                        className="object-cover opacity-60"
                    />
                    <button className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                        <Camera size={16} className="text-white" />
                    </button>
                </div>

                {/* Avatar Section */}
                <div className="relative px-6 pb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12">
                        <div className="relative">
                            <Avatar
                                src={profile.avatar}
                                name={profile.name.charAt(0)}
                                size="xl"
                                className="ring-4 ring-white dark:ring-gray-900 shadow-xl"
                            />
                            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-teal-500 hover:bg-teal-600 transition-colors">
                                <Camera size={12} className="text-white" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {user?.name}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Chip color="primary" variant="flat" size="sm" className="text-teal-600 dark:text-teal-400">
                                            <Shield size={10} className="inline mr-1" />
                                            {profile.role}
                                        </Chip>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar size={12} />
                                            Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                                {!isEditing ? (
                                    <Button
                                        onPress={() => setIsEditing(true)}
                                        startContent={<Edit size={14} />}
                                        className="bg-linear-to-r from-teal-600 to-emerald-500 text-white"
                                    >
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            onPress={handleCancel}
                                            startContent={<X size={14} />}
                                            variant="bordered"
                                            className="border-gray-300 dark:border-gray-600"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onPress={handleSave}
                                            startContent={<Save size={14} />}
                                            className="bg-linear-to-r from-teal-600 to-emerald-500 text-white"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Personal Info & Badges */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <User size={18} className="text-teal-500" />
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                {!isEditing ? (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <Mail size={16} className="text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="text-sm text-gray-900 dark:text-white">{profile.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone size={16} className="text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Phone</p>
                                                <p className="text-sm text-gray-900 dark:text-white">{profile.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin size={16} className="text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Location</p>
                                                <p className="text-sm text-gray-900 dark:text-white">{profile.location}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            <Label className="flex items-center gap-1 mb-1">
                                                <Mail size={14} className="text-teal-500" />
                                                Email
                                            </Label>
                                            <Input
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter email"
                                                className="bg-white/80 dark:bg-gray-900/80"
                                            />
                                        </div>
                                        <div>
                                            <Label className="flex items-center gap-1 mb-1">
                                                <Phone size={14} className="text-teal-500" />
                                                Phone
                                            </Label>
                                            <Input
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter phone number"
                                                className="bg-white/80 dark:bg-gray-900/80"
                                            />
                                        </div>
                                        <div>
                                            <Label className="flex items-center gap-1 mb-1">
                                                <MapPin size={14} className="text-teal-500" />
                                                Location
                                            </Label>
                                            <Input
                                                name="location"
                                                value={editForm.location}
                                                onChange={handleInputChange}
                                                placeholder="City, State"
                                                className="bg-white/80 dark:bg-gray-900/80"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Badges */}
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Award size={18} className="text-teal-500" />
                                Achievements
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.badges.map((badge, index) => {
                                    const Icon = badge.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                                            <Icon size={14} className={badge.color} />
                                            <span className="text-xs text-gray-700 dark:text-gray-300">{badge.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>

                    {/* Social Links */}
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Globe size={18} className="text-teal-500" />
                                Social Links
                            </h3>
                            <div className="flex gap-3">
                                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                                    <FaSquareXTwitter size={18} className="text-gray-600 dark:text-gray-400" />
                                </a>
                                <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                                    <FiInstagram size={18} className="text-gray-600 dark:text-gray-400" />
                                </a>
                                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                                    <FaLinkedin size={18} className="text-gray-600 dark:text-gray-400" />
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Bio, Stats & Activity */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <User size={18} className="text-teal-500" />
                                About Me
                            </h3>
                            {!isEditing ? (
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {profile.bio}
                                </p>
                            ) : (
                                <TextArea
                                    name="bio"
                                    value={editForm.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself"
                                    rows={5}
                                    className="w-full bg-white/80 dark:bg-gray-900/80"
                                />
                            )}
                        </div>
                    </Card>

                    {/* Interests */}
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Heart size={18} className="text-teal-500" />
                                Interests
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map((interest, index) => (
                                    <span key={index} className="px-3 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Statistics Grid */}
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <PawPrint size={18} className="text-teal-500" />
                                Adoption Statistics
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.totalListings}</p>
                                    <p className="text-xs text-gray-500">Total Listings</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-green-600">{profile.stats.activeListings}</p>
                                    <p className="text-xs text-gray-500">Active Listings</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-rose-600">{profile.stats.adoptedPets}</p>
                                    <p className="text-xs text-gray-500">Adopted Pets</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-teal-600">{profile.stats.responseRate}%</p>
                                    <p className="text-xs text-gray-500">Response Rate</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.totalRequests}</p>
                                    <p className="text-xs text-gray-500">Total Requests</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-green-600">{profile.stats.approvedRequests}</p>
                                    <p className="text-xs text-gray-500">Approved</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-2xl font-bold text-yellow-600">{profile.stats.pendingRequests}</p>
                                    <p className="text-xs text-gray-500">Pending</p>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{profile.stats.avgResponseTime}</p>
                                    <p className="text-xs text-gray-500">Avg Response</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;