"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PawPrint,
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "FAQs", href: "/faqs" },
  ];

  const adoptionLinks = [
    { name: "Browse Pets", href: "/pets" },
    { name: "Adoption Process", href: "/adoption-process" },
    { name: "Success Stories", href: "/stories" },
    { name: "Adoption Fees", href: "/fees" },
    { name: "Post-Adoption Care", href: "/post-adoption" },
  ];

  const servicesLinks = [
    { name: "Pet Grooming", href: "/grooming" },
    { name: "Veterinary Care", href: "/veterinary" },
    { name: "Pet Training", href: "/training" },
    { name: "Pet Boarding", href: "/boarding" },
    { name: "Emergency Support", href: "/emergency" },
  ];

  const socialIcons = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Pet Street, New York, NY 10001", href: null },
    { icon: Phone, text: "+1 (888) 123-PAWS (7297)", href: "tel:+18881237297" },
    { icon: Mail, text: "hello@petnest.com", href: "mailto:hello@petnest.com" },
    { icon: Clock, text: "Mon-Sun: 24/7 Support Available", href: null },
  ];

  return (
    <footer className="relative bg-linear-to-r from-teal-900 to-emerald-800 dark:from-teal-950 dark:to-emerald-900 text-gray-300 w-full overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-400 via-emerald-400 to-teal-400" />

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-10 border-b border-teal-800/50">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="bg-linear-to-br from-teal-500 to-emerald-500 p-2 rounded-xl shadow-md">
                  <PawPrint size={24} className="text-white" />
                </div>
                <span className="text-2xl font-extrabold bg-linear-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  PetNest
                </span>
              </motion.div>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Giving every pet a loving home. We connect compassionate adopters with deserving pets.
              </p>
              <div className="flex space-x-3">
                {socialIcons.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-teal-400" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Adoption Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Heart size={16} className="text-teal-400" />
                Adoption
              </h3>
              <ul className="space-y-2">
                {adoptionLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <PawPrint size={16} className="text-teal-400" />
                Services
              </h3>
              <ul className="space-y-2">
                {servicesLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Phone size={16} className="text-teal-400" />
                Contact Info
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <Icon size={16} className="text-teal-400 mt-0.5 shrink-0" />
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-300"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">{item.text}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="py-10 border-b border-teal-800/50"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-white font-semibold text-lg mb-1">
                  Subscribe to Our Newsletter
                </h4>
                <p className="text-sm text-gray-400">
                  Get updates on new pets, adoption tips, and success stories.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2.5 rounded-full bg-white/10 border border-teal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 w-full sm:w-72"
                />
                <button className="px-6 py-2.5 rounded-full bg-linear-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div> */}

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>© {currentYear} PetNest.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="hover:text-teal-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/cookies" className="hover:text-teal-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart size={12} className="text-rose-500 fill-rose-500" />
              <span>for paws everywhere</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;