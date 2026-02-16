'use client';

import { APPLICATION_OPEN } from '@/lib/config';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { ApplicationData } from '@/types/application';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, fadeInVariants } from '@/components/ui/motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-40 min-h-[70vh]">
      {/* Logo with Glow */}
      <div className="relative mb-12 group">
        <div className="absolute -inset-6 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-100 dark:opacity-40 transition-opacity duration-700 -z-10" />
        <div className="p-1 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 dark:via-transparent dark:to-black/20 backdrop-blur-xl ring-1 ring-border shadow-2xl transition-transform duration-500 hover:scale-105">
          <Image
            src="/assets/tsp-logo.jpg"
            alt="TSP Logo"
            width={100}
            height={100}
            className="rounded-[1.8rem] shadow-sm select-none"
            priority
          />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
        Coming Soon.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground/90 max-w-md mb-2 font-medium">
        Applications for Cohort 2 will open shortly.
      </p>
      <p className="text-sm text-muted-foreground/60 mb-12 font-medium">
        Stay tuned — we&apos;ll announce it everywhere.
      </p>

      <Link href="/">
        <Button variant="outline" size="lg" className="rounded-xl px-8 h-14 font-bold transition-all duration-300 active:scale-95 group">
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

export default function ApplyPage() {
  if (!APPLICATION_OPEN) {
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
    console.log('Application submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 2000));
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
