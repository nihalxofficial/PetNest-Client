"use client"
import React, { useState } from 'react';
import {
    Button,
    Card,
    Input,
    Chip,
    Avatar,
} from "@heroui/react";
import {Calendar, DateField, DatePicker, Description, Label} from "@heroui/react";

import {
    PawPrint,
    MapPin,
    // Calendar,
    Syringe,
    Heart,
    User,
    Mail,
    Phone,
    MessageCircle,
    CheckCircle,
    Info,
} from "lucide-react";


const loggedInUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};
const AdoptionForm = ({ petId, petData }) => {
    // const [selectedDate, setSelectedDate] = useState(null);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [value, setValue] = useState();
    const handleAdopt = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <Card className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-teal-500" />
                    Adoption Request
                </h2>

                <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    {/* Pet Name - Read Only */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            <PawPrint size={14} className="inline mr-1 text-teal-500" />
                            Pet Name
                        </label>
                        <Input
                            value={petData.name}
                            isReadOnly
                            className="w-full"
                        />
                    </div>

                    {/* User Name - Read Only */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            <User size={14} className="inline mr-1 text-teal-500" />
                            Your Name
                        </label>
                        <Input
                            value={loggedInUser.name}
                            isReadOnly
                            className="w-full"
                        />
                    </div>

                    {/* User Email - Read Only */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            <Mail size={14} className="inline mr-1 text-teal-500" />
                            Your Email
                        </label>
                        <Input
                            value={loggedInUser.email}
                            isReadOnly
                            className="w-full"
                        />
                    </div>

                    {/* Pickup Date - Date Picker */}
                    <div>
                        {/* <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            <Calendar size={14} className="inline mr-1 text-teal-500" />
                            Pickup Date
                        </label>
                        <DatePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                            className="w-full"
                        /> */}

                        <DatePicker name="date" value={value} onChange={setValue}>
                            <Label>Date</Label>
                            <DateField.Group fullWidth>
                                <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                <DateField.Suffix>
                                    <DatePicker.Trigger>
                                        <DatePicker.TriggerIndicator />
                                    </DatePicker.Trigger>
                                </DateField.Suffix>
                            </DateField.Group>
                            <DatePicker.Popover>
                                <Calendar aria-label="Event date">
                                    <Calendar.Header>
                                        <Calendar.YearPickerTrigger>
                                            <Calendar.YearPickerTriggerHeading />
                                            <Calendar.YearPickerTriggerIndicator />
                                        </Calendar.YearPickerTrigger>
                                        <Calendar.NavButton slot="previous" />
                                        <Calendar.NavButton slot="next" />
                                    </Calendar.Header>
                                    <Calendar.Grid>
                                        <Calendar.GridHeader>
                                            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                        </Calendar.GridHeader>
                                        <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                    </Calendar.Grid>
                                    <Calendar.YearPickerGrid>
                                        <Calendar.YearPickerGridBody>
                                            {({ year }) => <Calendar.YearPickerCell year={year} />}
                                        </Calendar.YearPickerGridBody>
                                    </Calendar.YearPickerGrid>
                                </Calendar>
                            </DatePicker.Popover>
                        </DatePicker>
                    </div>

                    {/* Message - Native Textarea with HeroUI styling */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            <MessageCircle size={14} className="inline mr-1 text-teal-500" />
                            Message (Optional)
                        </label>
                        <textarea
                            placeholder="Tell us why you'd like to adopt this pet..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                        />
                    </div>

                    {/* Status Note */}
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                            <Info size={12} className="inline mr-1" />
                            Your request will be sent to the shelter for review. Status will be set to "pending" until approved.
                        </p>
                    </div>

                    {/* Adopt Button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        startContent={<Heart size={16} />}
                        isLoading={isSubmitting}
                        onClick={handleAdopt}
                    >
                        Submit Adoption Request
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default AdoptionForm;