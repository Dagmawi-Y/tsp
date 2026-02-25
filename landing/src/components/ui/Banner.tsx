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
                    className="fixed top-0 left-0 right-0 z-[100] px-4 py-1.5 text-background bg-foreground border-b border-foreground"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center justify-center gap-4">
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border border-background/20 text-[9px] font-black uppercase tracking-widest text-background">
                                {isApplicationOpen ? 'ACTIVE' : 'LOCKED'}
                            </span>
                            <p className="text-[11px] font-black uppercase tracking-widest text-center">
                                {isApplicationOpen
                                    ? <>Applications for Cohort 2 are now open! <span className="hidden sm:inline">Build your breakout project.</span></>
                                    : <>Cohort 2 is coming soon! <span className="hidden sm:inline">Stay tuned for updates.</span></>}
                            </p>
                            <Link href="/apply" className="hidden md:flex items-center text-[11px] font-black uppercase tracking-widest no-underline hover:underline transition-all !text-background">
                                {isApplicationOpen ? 'Apply' : 'Waitlist'} <ArrowRight className="ml-1 w-3 h-3" />
                            </Link>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-background/10 transition-colors"
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

