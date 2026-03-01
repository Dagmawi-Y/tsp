'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
interface BannerProps {
    isVisible: boolean;
    onClose: () => void;
    isApplicationOpen?: boolean;
}

export function Banner({ isVisible, onClose, isApplicationOpen = false }: BannerProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={`fixed top-0 left-0 right-0 z-[100] px-4 py-1.5 text-white shadow-md ${isApplicationOpen
                        ? 'bg-linear-to-r from-teal-400 to-blue-400'
                        : 'bg-linear-to-r from-violet-400 to-fuchsia-400'
                        }`}
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center justify-center gap-4">
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border border-white/30 text-[9px] font-black uppercase tracking-widest text-white shadow-sm">
                                {isApplicationOpen ? 'OPEN' : 'SOON'}
                            </span>
                            <p className="text-[11px] font-black uppercase tracking-widest text-center text-white drop-shadow-sm">
                                {isApplicationOpen
                                    ? <>Applications for Cohort 2 are now open! <span className="hidden sm:inline opacity-90">Build your breakout project.</span></>
                                    : <>Cohort 2 is opening soon! <span className="hidden sm:inline opacity-90">Stay tuned for updates.</span></>}
                            </p>
                            <Link href="/apply" className="hidden md:flex items-center text-[11px] font-black uppercase tracking-widest no-underline hover:underline transition-all text-white drop-shadow-sm">
                                {isApplicationOpen ? 'Apply' : 'Waitlist'} <ArrowRight className="ml-1 w-3 h-3" />
                            </Link>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/20 transition-colors rounded-full text-white"
                            aria-label="Dismiss banner"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

