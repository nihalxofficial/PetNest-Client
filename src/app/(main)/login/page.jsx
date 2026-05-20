"use client";

import React, { useState } from "react";
import {
    Button,
    Input,
    Link as HeroUILink,
    InputGroup,
    Label,
    TextField,
    FieldError,
} from "@heroui/react";
import {
    Eye,
    EyeOff,
    PawPrint,
    Heart,
    Mail,
    Lock,
    Shield,
    Award,
    CheckCircle
} from "lucide-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import bgImage from "@/assets/signup.jpg";
import signupImage from "@/assets/welcome.png";

const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Image with Overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Happy pets background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
                <div className="absolute inset-0 bg-linear-to-br from-teal-500/20 via-transparent to-emerald-500/20" />
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-linear(circle at 1px 1px, white 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            {/* Main Card */}
            <div className="relative z-10 max-w-5xl w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Image Section */}
                    <div className="hidden md:block relative w-full md:w-2/4 bg-linear-to-br from-teal-600 to-emerald-700">
                        <div className="absolute inset-0">
                            <Image
                                src={signupImage}
                                alt="Happy pet owner with dog"
                                fill
                                className="object-cover rounded-l-2xl"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-l-2xl" />
                            <div className="absolute inset-0 bg-linear-to-r from-teal-600/30 to-transparent rounded-l-2xl" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between p-8">
                            <div className="flex justify-start">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                    <Award size={14} className="text-yellow-400" />
                                    <span className="text-xs text-white font-medium">Welcome Back</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                                        <PawPrint size={24} className="text-white" />
                                    </div>
                                    <span className="text-white font-bold text-xl">PetNest</span>
                                </div>

                                <h3 className="text-white text-2xl font-bold leading-tight">
                                    Welcome back to<br />your pet family
                                </h3>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-emerald-400" />
                                        <span>Access your saved pets</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-emerald-400" />
                                        <span>Track adoption applications</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-emerald-400" />
                                        <span>Connect with shelters</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <div className="text-center">
                                        <p className="text-white text-2xl font-bold">10K+</p>
                                        <p className="text-white/70 text-xs">Happy Pets</p>
                                    </div>
                                    <div className="w-px bg-white/30" />
                                    <div className="text-center">
                                        <p className="text-white text-2xl font-bold">50+</p>
                                        <p className="text-white/70 text-xs">Shelters</p>
                                    </div>
                                    <div className="w-px bg-white/30" />
                                    <div className="text-center">
                                        <p className="text-white text-2xl font-bold">98%</p>
                                        <p className="text-white/70 text-xs">Success Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Section */}
                    <div className="w-full md:w-2/4 p-6 md:p-8">
                        <div className="flex justify-center md:hidden mb-6">
                            <div className="bg-linear-to-br from-teal-500 to-emerald-500 p-3 rounded-2xl shadow-lg">
                                <PawPrint size={28} className="text-white" />
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                Welcome back
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                Please enter your credentials to access your account
                            </p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <TextField
                                    isRequired
                                    name="email"
                                    type="email"
                                    validate={(value) => {
                                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                            return "Please enter a valid email address";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label className="flex items-center gap-1">
                                        <Mail size={14} className="text-teal-500" />
                                        Email Address
                                    </Label>
                                    <Input 
                                        placeholder="hello@petnest.com" 
                                        startContent={<Mail size={16} className="text-gray-400" />} 
                                    />
                                    <FieldError />
                                </TextField>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <TextField isRequired className="w-full" name="password">
                                    <Label className="flex items-center gap-1">
                                        <Lock size={14} className="text-teal-500" />
                                        Password
                                    </Label>
                                    <InputGroup>
                                        <InputGroup.Input
                                            className="w-full"
                                            type={isVisible ? "text" : "password"}
                                            placeholder="Enter your password"
                                            startContent={<Lock size={16} className="text-gray-400" />}
                                        />
                                        <InputGroup.Suffix className="pr-0">
                                            <Button
                                                isIconOnly
                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                size="sm"
                                                variant="ghost"
                                                onPress={() => setIsVisible(!isVisible)}
                                            >
                                                {isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                                            </Button>
                                        </InputGroup.Suffix>
                                    </InputGroup>
                                </TextField>
                            </div>

                            <div className="text-right">
                                <HeroUILink
                                    href="/forgot-password"
                                    className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
                                >
                                    Forgot password?
                                </HeroUILink>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Log In
                            </Button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 py-1 bg-white dark:bg-gray-900 text-xs font-medium text-gray-500 dark:text-gray-400 rounded-full shadow-sm">
                                    OR CONTINUE WITH
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                            >
                                <FcGoogle size={20} />
                                Continue with Google
                            </Button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don&apos;t have an account?{" "}
                                <HeroUILink
                                    href="/signup"
                                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                                >
                                    Sign up
                                </HeroUILink>
                            </p>
                        </div>

                        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-1.5">
                                <Heart size={14} className="text-teal-500 fill-teal-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">10K+ Happy Adoptions</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Shield size={14} className="text-teal-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Secure & Safe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;