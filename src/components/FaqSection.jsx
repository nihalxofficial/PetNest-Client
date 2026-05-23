"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Heart,
  Shield,
  Clock,
  DollarSign,
  Home,
  Syringe,
  FileText,
  Users,
} from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How does the pet adoption process work?",
      answer: "Our adoption process is simple and transparent. First, browse available pets and submit an adoption application. Once approved, you'll schedule a meet-and-greet with the pet. If it's a perfect match, you'll complete the adoption agreement and take your new family member home. Our team guides you through every step of the journey.",
      category: "Process",
      icon: HelpCircle,
    },
    {
      id: 2,
      question: "What documents do I need to adopt a pet?",
      answer: "You'll need a valid government ID, proof of residence (utility bill or lease agreement), and references from your veterinarian (if you've had pets before). Some adoptions may require landlord approval if you're renting. Our team will guide you through all documentation requirements.",
      category: "Documents",
      icon: FileText,
    },
    {
      id: 3,
      question: "Are the pets vaccinated and health-checked?",
      answer: "Yes! All pets available for adoption are fully vaccinated, dewormed, spayed/neutered, and receive a complete health examination by licensed veterinarians. We provide complete medical records before adoption. Each pet comes with a health guarantee and post-adoption medical support.",
      category: "Health",
      icon: Syringe,
    },

    {
      id: 6,
      question: "What post-adoption support do you offer?",
      answer: "We provide lifetime post-adoption support including veterinary consultation discounts, training tips, behavioral advice, and access to our 24/7 pet helpline. You'll also join our community of adopters for playdates, events, and ongoing guidance from our expert team.",
      category: "Support",
      icon: MessageCircle,
    },
    {
      id: 7,
      question: "Can I meet the pet before deciding?",
      answer: "Yes! We encourage meet-and-greets before finalizing any adoption. You can schedule in-person visits at our adoption center or virtual video calls. This helps ensure the pet's personality matches your lifestyle and family. Multiple visits are welcome!",
      category: "Process",
      icon: Users,
    },
    {
      id: 8,
      question: "What if the adoption doesn't work out?",
      answer: "We understand that sometimes matches aren't perfect. We have a 30-day adjustment period where we'll work with you to resolve any issues. If it's still not working, we'll help rehome the pet or accept them back. Your pet's wellbeing is our top priority, no questions asked.",
      category: "Policy",
      icon: Heart,
    },

  ];

  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 via-white/30 to-emerald-50/50 dark:from-teal-950/30 dark:via-gray-900/50 dark:to-emerald-950/30" />

      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold mb-4">
              <Sparkles size={12} className="fill-teal-500" />
              Got Questions?
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Everything you need to know about adopting your new best friend
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-teal-600 dark:bg-teal-500 text-white shadow-md"
                  : "bg-white/70 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 border border-white/50 dark:border-gray-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <div
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/50 shrink-0">
                        <Icon size={20} className="text-teal-600 dark:text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-left">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"
                    >
                      <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
                    </motion.div>
                  </button>

                  {/* Answer - Animated */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex gap-4">
                            <div className="w-10 shrink-0" />
                            <div className="flex-1">
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {faq.answer}
                              </p>
                              
                              {/* Helpful Links/CTA inside answer */}
                              <div className="mt-4 flex items-center gap-4">
                                <button className="text-xs cursor-pointer text-teal-600 dark:text-teal-400 font-medium hover:underline flex items-center gap-1">
                                  <Heart size={12} />
                                  Contact Support
                                </button>
                                <button className="text-xs cursor-pointer text-teal-600 dark:text-teal-400 font-medium hover:underline flex items-center gap-1">
                                  <Clock size={12} />
                                  Schedule Call
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions - Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 dark:border-gray-700/50 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={28} className="text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our adoption counselors are here to help you 24/7
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-500 dark:to-emerald-400 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300">
                <Heart size={14} />
                Contact Support
              </button>
              <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-2 rounded-full border-2 border-teal-500 text-teal-700 dark:border-teal-400 dark:text-teal-400 font-medium text-sm hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-300">
                <Shield size={14} />
                View Adoption Guide
              </button>
            </div>
          </div>
        </motion.div>
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
      `}</style>
    </section>
  );
};

export default FAQSection;