'use client';

import { useState } from 'react';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { ApplicationData } from '@/types/application';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, fadeInVariants } from '@/components/ui/motion';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

function ComingSoon() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_registered'>('idle');
    const [message, setMessage] = useState('');

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleJoinWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            const { error } = await supabase.from('waitlist').insert([{ email }]);

            if (error) {
                // Check for unique constraint violation (error code 23505 in Postgres)
                if (error.code === '23505') {
                    setStatus('already_registered');
                    setMessage("You're already on the list! We'll keep you posted.");
                } else {
                    console.error(error);
                    setStatus('error');
                    setMessage('Something went wrong. Please try again.');
                }
            } else {
                setStatus('success');
                setMessage("Great! You're officially on the waitlist.");
                setEmail('');
                triggerConfetti();
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-40 min-h-[70vh]">
            {/* Logo Wrapper - Sharp */}
            <div className="relative mb-16 px-6">
                <div className="p-1 border border-border bg-background shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)] transition-transform duration-500 hover:scale-105">
                    <Image
                        src="/assets/tsp-logo.jpg"
                        alt="TSP Logo"
                        width={120}
                        height={120}
                        className="grayscale hover:grayscale-0 transition-all duration-500 select-none"
                        priority
                    />
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 font-display">
                Opening Soon.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-2 font-medium uppercase tracking-widest text-[12px]">
                Applications for Cohort 2 will open shortly.
            </p>
            <p className="text-muted-foreground/40 mb-12 font-bold uppercase tracking-[0.3em] text-[10px]">
                Stay tuned.
            </p>

            <motion.form
                onSubmit={handleJoinWaitlist}
                className="w-full max-w-sm mb-12 flex flex-col gap-3"
                initial={false}
                animate={status === 'error' ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
            >
                <div className="flex flex-col sm:flex-row w-full items-center gap-3">
                    <Input
                        type="email"
                        placeholder="ENTER YOUR EMAIL"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status !== 'idle') setStatus('idle');
                        }}
                        className="flex-1 bg-background border-border focus:border-foreground transition-all duration-300 rounded-none h-14 font-black uppercase tracking-widest text-[10px] px-6"
                        required
                        disabled={status === 'loading'}
                    />
                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="font-black uppercase tracking-widest text-[10px] h-14 px-8 rounded-none transition-all active:translate-y-0.5 min-w-[160px]"
                    >
                        <AnimatePresence mode="wait">
                            {status === 'loading' ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    JOINING
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="idle"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    Join Waitlist
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest p-4 shadow-lg ${status === 'success' || status === 'already_registered'
                                ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-teal-500/25'
                                : 'bg-linear-to-r from-rose-500 to-red-500 text-white shadow-rose-500/25'
                                }`}
                        >
                            {status === 'success' || status === 'already_registered' ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : (
                                <AlertCircle className="w-4 h-4" />
                            )}
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.form>

            <Link href="/">
                <Button variant="ghost" size="lg" className="rounded-none px-8 h-14 font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-foreground transition-all active:translate-y-0.5 group">
                    <ArrowLeft className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}

interface ApplyClientProps {
    isApplicationOpen: boolean;
}

export default function ApplyClient({ isApplicationOpen }: ApplyClientProps) {
    if (!isApplicationOpen) {
        return (
            <FadeIn
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-background"
            >
                <EtherealShadow className="min-h-screen flex flex-col items-center justify-center">
                    <ComingSoon />
                </EtherealShadow>
            </FadeIn>
        );
    }

    const handleSubmit = async (data: ApplicationData) => {
        const { error } = await supabase.from('applications').insert([
            {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                telegram_username: data.telegramUsername,
                github_url: data.githubUrl,
                linkedin_url: data.linkedinUrl,
                current_status: data.currentStatus,
                project_description: data.projectDescription,
                project_link: data.projectLink,
                technical_challenge: data.technicalChallenge,
                experience: data.experience,
                why_join: data.whyJoin,
                can_commit: data.canCommit,
                hours_per_week: data.hoursPerWeek,
            }
        ]);

        if (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    };

    return (
        <FadeIn
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-background"
        >
            <EtherealShadow className="min-h-screen flex flex-col items-center justify-center">
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto">
                        <ApplicationForm onSubmit={handleSubmit} />
                    </div>
                </div>
            </EtherealShadow>
        </FadeIn>
    );
}
