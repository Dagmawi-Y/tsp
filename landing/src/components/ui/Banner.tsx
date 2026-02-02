'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BannerProps {
    isVisible: boolean;
    onClose: () => void;
}

export function Banner({ isVisible, onClose }: BannerProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 sm:py-2 text-primary-foreground shadow-lg backdrop-blur-md bg-primary/95"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center justify-center gap-3">
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary-foreground/20 text-[10px] font-bold uppercase tracking-wider">
                                New
                            </span>
                            <p className="text-sm sm:text-base font-bold tracking-tight text-center">
                                Applications for Cohort 2 are now open! <span className="hidden sm:inline">Build your breakout project.</span>
                            </p>
                            <Link href="/apply" className="hidden md:flex items-center text-sm font-black no-underline hover:opacity-80 transition-opacity !text-primary-foreground">
                                Apply Now <ArrowRight className="ml-1 w-4 h-4" />
                            </Link>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Dismiss banner"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
