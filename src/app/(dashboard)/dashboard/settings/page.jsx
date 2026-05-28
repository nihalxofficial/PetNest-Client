"use client";

import React, { useState } from "react";
import {
    Card,
    Input,
    Button,
    Avatar,
    Switch,
} from "@heroui/react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Bell,
    Moon,
    Shield,
    Eye,
    Palette,
    Save,
    Camera,
    Trash2,
    Heart,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const SettingsPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [profileForm, setProfileForm] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "Austin, TX",
        bio: "Pet lover and proud owner of two rescued dogs. Passionate about animal welfare and adoption.",
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        adoptionUpdates: true,
        messageAlerts: true,
        newsletter: false,
    });

    const [privacy, setPrivacy] = useState({
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
    });

    const [appearance, setAppearance] = useState({
        theme: "system",
        compactView: false,
        reduceAnimations: false,
    });

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage your account preferences and settings
                </p>
            </div>

            {/* Profile Settings */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                            <User size={20} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Profile Information
                        </h2>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-3">
                            <Avatar
                                src={user?.image}
                                name="JD"
                                size="xl"
                                className="ring-4 ring-teal-500/20"
                            />
                            <Button
                                size="sm"
                                variant="bordered"
                                startContent={<Camera size={14} />}
                                className="border-teal-500 text-teal-600"
                            >
                                Change Photo
                            </Button>
                        </div>

                        {/* Profile Fields */}
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        <User size={14} className="inline mr-1 text-teal-500" />
                                        Full Name
                                    </label>
                                    <Input
                                        value={user?.name}
                                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        <Mail size={14} className="inline mr-1 text-teal-500" />
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        value={user?.email}
                                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                        placeholder="Your email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        <Phone size={14} className="inline mr-1 text-teal-500" />
                                        Phone Number
                                    </label>
                                    <Input
                                        value={profileForm.phone}
                                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                        placeholder="Your phone"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        <MapPin size={14} className="inline mr-1 text-teal-500" />
                                        Location
                                    </label>
                                    <Input
                                        value={profileForm.location}
                                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                                        placeholder="Your location"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Bio
                                </label>
                                <textarea
                                    value={profileForm.bio}
                                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                    placeholder="Tell us about yourself and your love for pets"
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                                />
                            </div>
                            <Button
                                className="bg-linear-to-r from-teal-600 to-emerald-500 text-white"
                                startContent={<Save size={16} />}
                            >
                                Save Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                            <Bell size={20} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Notifications
                        </h2>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Email Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                            </div>
                            <Switch
                                isSelected={notifications.emailNotifications}
                                onValueChange={(val) => setNotifications({ ...notifications, emailNotifications: val })}
                                color="success"
                            />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Push Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get real-time alerts on your device</p>
                            </div>
                            <Switch
                                isSelected={notifications.pushNotifications}
                                onValueChange={(val) => setNotifications({ ...notifications, pushNotifications: val })}
                                color="success"
                            />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Adoption Updates</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Updates about your adoption requests</p>
                            </div>
                            <Switch
                                isSelected={notifications.adoptionUpdates}
                                onValueChange={(val) => setNotifications({ ...notifications, adoptionUpdates: val })}
                                color="success"
                            />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Message Alerts</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Notifications for new messages</p>
                            </div>
                            <Switch
                                isSelected={notifications.messageAlerts}
                                onValueChange={(val) => setNotifications({ ...notifications, messageAlerts: val })}
                                color="success"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Privacy & Security */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                            <Shield size={20} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Privacy & Security
                        </h2>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                <Eye size={14} className="inline mr-1 text-teal-500" />
                                Profile Visibility
                            </label>
                            <select
                                value={privacy.profileVisibility}
                                onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                                className="w-full md:w-64 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="contacts">Only Contacts</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Show Email on Profile</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see your email</p>
                            </div>
                            <Switch
                                isSelected={privacy.showEmail}
                                onValueChange={(val) => setPrivacy({ ...privacy, showEmail: val })}
                                color="success"
                            />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Show Phone on Profile</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see your phone number</p>
                            </div>
                            <Switch
                                isSelected={privacy.showPhone}
                                onValueChange={(val) => setPrivacy({ ...privacy, showPhone: val })}
                                color="success"
                            />
                        </div>
                        <Button
                            variant="bordered"
                            startContent={<Lock size={16} />}
                            className="border-teal-500 text-teal-600"
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Appearance Settings */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50">
                            <Palette size={20} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Appearance
                        </h2>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                <Moon size={14} className="inline mr-1 text-teal-500" />
                                Theme
                            </label>
                            <select
                                value={appearance.theme}
                                onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                                className="w-full md:w-64 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Compact View</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Show more content with tighter spacing</p>
                            </div>
                            <Switch
                                isSelected={appearance.compactView}
                                onValueChange={(val) => setAppearance({ ...appearance, compactView: val })}
                                color="success"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-red-200 dark:border-red-800">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/50">
                            <Trash2 size={20} className="text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                            Danger Zone
                        </h2>
                    </div>

                    <div className="border-t border-red-200 dark:border-red-800 my-4" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-red-600 dark:text-red-400">Delete Account</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <Button
                                variant="bordered"
                                className="border-red-500 text-red-600 hover:bg-red-50"
                                startContent={<Trash2 size={16} />}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Footer Note */}
            <div className="text-center py-4">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    <Heart size={10} className="inline mr-1" />
                    Your data is safe with us. We&apos;ll never share your personal information.
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;