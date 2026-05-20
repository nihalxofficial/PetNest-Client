"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Ambulance,
  Clock,
  MapPin,
  AlertTriangle,
  Droplets,
  Thermometer,
  Bandage,
  Pill,
  ArrowRight,
} from "lucide-react";

const EmergencySupportSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const emergencyContacts = [
    { number: "+1 (888) 123-PAWS", label: "Emergency Hotline", available: "24/7", icon: Phone },
    { number: "+1 (888) 456-VETS", label: "Vet Support", available: "24/7", icon: Ambulance },
    { number: "+1 (888) 789-CARE", label: "Poison Control", available: "24/7", icon: AlertTriangle },
  ];

  const firstAidTips = [
    { icon: Bandage, title: "Bleeding", tip: "Apply gentle pressure with clean cloth" },
    { icon: Thermometer, title: "Fever", tip: "Check temperature, keep pet hydrated" },
    { icon: Droplets, title: "Dehydration", tip: "Offer small amounts of water frequently" },
    { icon: Pill, title: "Medication", tip: "Never give human medication to pets" },
  ];

  const nearbyVets = [
    { name: "24/7 Animal Hospital", distance: "0.5 miles", status: "Open Now", phone: "(555) 123-4567" },
    { name: "Pet Emergency Clinic", distance: "1.2 miles", status: "Open 24/7", phone: "(555) 234-5678" },
    { name: "VCA Animal Hospital", distance: "2.5 miles", status: "Open until 10PM", phone: "(555) 345-6789" },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

      {/* Decorative blobs - softer colors */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold mb-4">
              <AlertTriangle size={12} className="fill-amber-500" />
              24/7 Emergency Support
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Emergency Pet Support
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Immediate veterinary assistance & emergency hotline available 24/7 for your furry friends
            </p>
          </motion.div>
        </div>

        {/* Main Emergency CTA Card - Softer gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 shadow-2xl">
            {/* Animated background */}
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-1/2" />
            
            <div className="relative p-8 md:p-10 text-center text-white">
              {/* Emergency Icon */}
              <div className="mb-4">
                <div className="inline-flex p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Ambulance size={48} className="text-white animate-pulse" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Veterinary Emergency?
              </h3>
              
              <p className="text-amber-100 mb-6 max-w-md mx-auto">
                Don&apos;t wait. Get immediate professional help for your pet&apos;s emergency situation.
              </p>

              {/* Emergency Phone Number */}
              <div className="mb-6">
                <a href="tel:+018881237297">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-white text-amber-600 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Phone size={24} className="animate-pulse" />
                    +1 (888) 123-PAWS (7297)
                  </motion.button>
                </a>
                <p className="text-amber-200 text-sm mt-2 flex items-center justify-center gap-1">
                  <Clock size={12} />
                  Available 24/7 • Free consultation
                </p>
              </div>

              {/* Current Time Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                <Clock size={12} />
                Current Time: {currentTime || "--:--"} • Always Open
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts Grid - Softer colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50 dark:border-gray-700/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/50">
                    <Icon size={24} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {contact.label}
                    </h3>
                    <a href={`tel:${contact.number.replace(/\D/g, '')}`}>
                      <p className="text-lg font-semibold text-amber-600 dark:text-amber-400 hover:underline">
                        {contact.number}
                      </p>
                    </a>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={10} className="text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        {contact.available}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Two Column Layout: First Aid Tips & Nearby Vets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* First Aid Tips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Bandage size={24} className="text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                First Aid Tips
              </h3>
            </div>
            <div className="space-y-4">
              {firstAidTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/50">
                      <Icon size={16} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tip.tip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/first-aid">
              <button className="mt-4 text-sm cursor-pointer text-amber-600 dark:text-amber-400 font-medium hover:underline flex items-center gap-1">
                View Complete First Aid Guide
                <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>

          {/* Nearby Veterinary Clinics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={24} className="text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl  font-bold text-gray-800 dark:text-white">
                Nearby Veterinary Clinics
              </h3>
            </div>
            <div className="space-y-4">
              {nearbyVets.map((vet, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {vet.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        📍 {vet.distance}
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        {vet.status}
                      </span>
                    </div>
                  </div>
                  <a href={`tel:${vet.phone.replace(/\D/g, '')}`}>
                    <button className="text-xs cursor-pointer text-amber-600 dark:text-amber-400 font-medium hover:underline">
                      Call
                    </button>
                  </a>
                </div>
              ))}
            </div>
            <Link href="/find-vet">
              <button className="mt-4 cursor-pointer text-sm text-amber-600 dark:text-amber-400 font-medium hover:underline flex items-center gap-1">
                Find More Vets Near You
                <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Warning Note - Softer colors */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-950/50 rounded-full text-sm text-amber-700 dark:text-amber-300">
            <AlertTriangle size={14} />
            For life-threatening emergencies, please call 911 or go to the nearest emergency vet immediately
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default EmergencySupportSection;