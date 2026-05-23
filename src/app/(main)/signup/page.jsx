"use client";
import { motion, AnimatePresence } from "framer-motion";

import React, { useState } from "react";
import {
    Input,
    Button,
    InputGroup,
    Label
} from "@heroui/react";
import {
    EyeOff,
    PawPrint,
    Heart,
    Mail,
    Lock,
    User,
    MapPin,
    Shield,
    Image as ImageIcon,
    Award,
    CheckCircle,
    XCircle
} from "lucide-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import bgImage from "@/assets/signup.jpg"
import signupImage from "@/assets/welcome.png"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    // Password validation checks
    const passwordChecks = {
        minLength: password.length >= 6,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
    };

    const allPasswordChecksMet = passwordChecks.minLength && passwordChecks.hasUppercase && passwordChecks.hasLowercase;

    const validatePassword = (pwd) => {
        if (pwd.length < 6) {
            return "Password must be at least 6 characters";
        }
        if (!/[A-Z]/.test(pwd)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(pwd)) {
            return "Password must contain at least one lowercase letter";
        }
        return null;
    };

    // Get confirm password status
    const getConfirmPasswordStatus = () => {
        if (confirmPassword.length === 0) return null;
        if (password !== confirmPassword) return { type: "error", message: "Passwords do not match" };
        if (password === confirmPassword && allPasswordChecksMet && confirmPassword.length > 0) return { type: "success", message: "Password matched ✓" };
        return null;
    };

    const confirmPasswordStatus = getConfirmPasswordStatus();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const { name, email, image, location, password, confirmPassword } = userData;

        // Validate name
        if (name.length < 3) {
            setErrors({ name: "Name must be at least 3 characters" });
            return;
        }

        // Validate email
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setErrors({ email: "Please enter a valid email address" });
            return;
        }

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrors({ password: passwordError });
            return;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        // Clear errors
        setErrors({});

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
            location,
        });
        if (data) {
            toast.success("SignUp Successful! 🎉")
            router.push(callbackUrl)
        }
        if (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: callbackUrl,
        });
    }

    // Real-time error clearing when user types
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors({ ...errors, password: null });
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) {
            setErrors({ ...errors, confirmPassword: null });
        }
    };

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
                                    <span className="text-xs text-white font-medium">Trusted Platform</span>
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
                                    Join thousands of happy<br />pet parents
                                </h3>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-emerald-400" />
                                        <span>10,000+ successful adoptions</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-emerald-400" />
                                        <span>Verified shelters & rescues</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-emerald-400" />
                                        <span>24/7 adoption support</span>
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
                                Create an account
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                Join our loving pet community today
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={onSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="flex items-center gap-1 mb-1">
                                        <User size={14} className="text-teal-500" />
                                        Name
                                    </Label>
                                    <Input
                                        name="name"
                                        placeholder="John Doe"
                                        startContent={<User size={16} className="text-gray-400" />}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <Label className="flex items-center gap-1 mb-1">
                                        <Mail size={14} className="text-teal-500" />
                                        Email
                                    </Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        startContent={<Mail size={16} className="text-gray-400" />}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="flex items-center gap-1 mb-1">
                                        <ImageIcon size={14} className="text-teal-500" />
                                        Photo Url
                                    </Label>
                                    <Input
                                        name="image"
                                        type="url"
                                        placeholder="https://example.com/photo.jpg"
                                        startContent={<ImageIcon size={16} className="text-gray-400" />}
                                    />
                                </div>
                                <div>
                                    <Label className="flex items-center gap-1 mb-1">
                                        <MapPin size={14} className="text-teal-500" />
                                        Location
                                    </Label>
                                    <Input
                                        name="location"
                                        placeholder="City, State"
                                        startContent={<MapPin size={16} className="text-gray-400" />}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="flex items-center gap-1 mb-1">
                                        <Lock size={14} className="text-teal-500" />
                                        Password
                                    </Label>
                                    <InputGroup>
                                        <InputGroup.Input
                                            className="w-full"
                                            type={isVisible ? "text" : "password"}
                                            placeholder="Create a password"
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordChange}
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
                                                {isVisible ? <EyeOff className="size-4" /> : <EyeOff className="size-4" />}
                                            </Button>
                                        </InputGroup.Suffix>
                                    </InputGroup>

                                    {/* Password Checklist */}
                                    <AnimatePresence mode="wait">
                                        {password.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                                exit={{ opacity: 0, y: -10, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                                            >
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Password requirements:</p>
                                                <div className="space-y-1.5">
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        {passwordChecks.minLength ? (
                                                            <CheckCircle size={12} className="text-green-500" />
                                                        ) : (
                                                            <XCircle size={12} className="text-gray-400" />
                                                        )}
                                                        <span className={`text-xs ${passwordChecks.minLength ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            Minimum 6 characters
                                                        </span>
                                                    </motion.div>
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        {passwordChecks.hasUppercase ? (
                                                            <CheckCircle size={12} className="text-green-500" />
                                                        ) : (
                                                            <XCircle size={12} className="text-gray-400" />
                                                        )}
                                                        <span className={`text-xs ${passwordChecks.hasUppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            At least one uppercase letter
                                                        </span>
                                                    </motion.div>
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        {passwordChecks.hasLowercase ? (
                                                            <CheckCircle size={12} className="text-green-500" />
                                                        ) : (
                                                            <XCircle size={12} className="text-gray-400" />
                                                        )}
                                                        <span className={`text-xs ${passwordChecks.hasLowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            At least one lowercase letter
                                                        </span>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="flex items-center gap-1 mb-1">
                                        <Lock size={14} className="text-teal-500" />
                                        Confirm Password
                                    </Label>
                                    <InputGroup>
                                        <InputGroup.Input
                                            className="w-full"
                                            type={isConfirmVisible ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            startContent={<Lock size={16} className="text-gray-400" />}
                                        />
                                        <InputGroup.Suffix className="pr-0">
                                            <Button
                                                isIconOnly
                                                aria-label={isConfirmVisible ? "Hide password" : "Show password"}
                                                size="sm"
                                                variant="ghost"
                                                onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                                            >
                                                {isConfirmVisible ? <EyeOff className="size-4" /> : <EyeOff className="size-4" />}
                                            </Button>
                                        </InputGroup.Suffix>
                                    </InputGroup>

                                    {/* Single Password Match Status Indicator */}
                                    {confirmPassword.length > 0 && confirmPasswordStatus && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="mt-2"
                                        >
                                            {confirmPasswordStatus.type === "error" && (
                                                <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                                                    <XCircle size={14} className="text-red-500" />
                                                    <span className="text-xs text-red-600 dark:text-red-400">{confirmPasswordStatus.message}</span>
                                                </div>
                                            )}
                                            {confirmPasswordStatus.type === "success" && (
                                                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                                    <CheckCircle size={14} className="text-green-500" />
                                                    <span className="text-xs text-green-600 dark:text-green-400">{confirmPasswordStatus.message}</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-linear-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Sign Up
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
                                onClick={handleGoogleLogin}
                                variant="outline"
                                size="lg"
                                className="w-full flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                            >
                                <FcGoogle />
                                Sign up with Google
                            </Button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href={`/login?callbackUrl=${callbackUrl}`}
                                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                                >
                                    Log in
                                </Link>
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

export default SignUpPage;