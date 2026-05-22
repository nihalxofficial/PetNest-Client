"use client";
import React, { useState } from 'react';
import {
    Button,
    Card,
    Input,
    Chip,
    Avatar,
    TextField,
    TextArea,
} from "@heroui/react";
import { Calendar, DateField, DatePicker, Description, Label } from "@heroui/react";

import {
    PawPrint,
    MapPin,
    Syringe,
    Heart,
    User,
    Mail,
    Phone,
    MessageCircle,
    CheckCircle,
    Info,
} from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { requestAdoption } from '@/lib/pets/action';
import { toast } from 'react-toastify';
import Link from 'next/link';

const AdoptionForm = ({ id, petData, user }) => {
    const [date, setDate] = useState(today(getLocalTimeZone()));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedPetName, setSubmittedPetName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        const requestData = Object.fromEntries(formData.entries());
        
        const nativeDate = date ? date.toDate(getLocalTimeZone()) : null;

        const modifiedData = {
            petId: id,
            userId: user.id,
            ...requestData,
            status: "pending",
            pickUpDate: nativeDate
        };
        
        try {
            const data = await requestAdoption(id, modifiedData);
            if (data.insertedId) {
                toast.success(`Adoption request for ${petData.name} successful!`);
                setSubmittedPetName(petData.name);
                setIsSubmitted(true);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show confirmation after successful submission
    if (isSubmitted) {
        return (
            <Card className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
                <div className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Adoption Request Sent! 🎉
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                        Thank you for your interest in adopting <span className="font-semibold text-teal-600">{submittedPetName}</span>!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        The shelter will review your request and contact you within 24-48 hours.
                        Your request status will be updated to "Approved" or "Rejected" soon.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/dashboard/my-requests">
                            <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                Go to My Requests
                            </Button>
                        </Link>
                        <Link href="/all-pets">
                            <Button variant="bordered" className="w-full">
                                Browse More Pets
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center justify-center gap-1">
                            <Info size={12} className="text-amber-500" />
                            You can track your request status in "My Requests" page
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50">
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-teal-500" />
                    Adoption Request
                </h2>

                <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Pet Name - Read Only */}
                    <div>
                        <TextField isReadOnly defaultValue={petData?.name} type="text" name="petName">
                            <Label className="flex items-center gap-1">
                                <PawPrint size={14} className="text-teal-500" />
                                Pet Name
                            </Label>
                            <Input placeholder="" className="text-gray-400" />
                        </TextField>
                    </div>

                    {/* User Name - Read Only */}
                    <div>
                        <TextField isReadOnly defaultValue={user?.name} type="text" name="userName">
                            <Label className="flex items-center gap-1">
                                <User size={14} className="text-teal-500" />
                                Your Name
                            </Label>
                            <Input placeholder="" className="text-gray-400" />
                        </TextField>
                    </div>

                    {/* User Email - Read Only */}
                    <div>
                        <TextField isReadOnly defaultValue={user?.email} type="email" name="userEmail">
                            <Label className="flex items-center gap-1">
                                <Mail size={14} className="text-teal-500" />
                                Your Email
                            </Label>
                            <Input placeholder="" className="text-gray-400" />
                        </TextField>
                    </div>

                    {/* Pickup Date - Date Picker */}
                    <div className="flex flex-col gap-2">
                        <DatePicker className="w-full gap-2" value={date} onChange={setDate}>
                            <Label className="flex w-full items-center gap-1.5 text-start text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <CalendarIcon size={14} className="text-teal-500 shrink-0" />
                                <span>Pickup Date</span>
                            </Label>

                            <DateField.Group fullWidth>
                                <DateField.Input className="flex items-center gap-1">
                                    {(segment) => <DateField.Segment segment={segment} className="text-gray-900 dark:text-white" />}
                                </DateField.Input>
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

                        <input type="hidden" name="date" value={date ? date.toString() : ""} />
                    </div>

                    {/* Message - Textarea */}
                    <div>
                        <TextField name="message">
                            <Label className="flex items-center gap-1">
                                <MessageCircle size={14} className="text-teal-500" />
                                Opinion
                            </Label>
                            <TextArea
                                className="w-full"
                                placeholder="Tell us why you'd like to adopt this pet..."
                                rows={4}
                            />
                        </TextField>
                    </div>

                    {/* Status Note */}
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            <Info size={12} className="text-amber-500" />
                            Your request will be sent to the shelter for review. Status will be set to &quot;pending&quot; until approved.
                        </p>
                    </div>

                    {/* Adopt Button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        startContent={<Heart size={16} />}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Adoption Request"}
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default AdoptionForm;