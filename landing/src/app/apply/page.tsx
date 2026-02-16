'use client';

import { APPLICATION_OPEN } from '@/lib/config';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { ApplicationData } from '@/types/application';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, fadeInVariants } from '@/components/ui/motion';
import { Sparkles } from 'lucide-react';

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-40 min-h-[70vh]">
      {/* Animated glow ring */}
      <div className="relative mb-8">
        <div className="absolute -inset-6 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-primary/30 bg-primary/5">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        Coming Soon
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-2">
        Applications for Cohort 2 will open shortly.
      </p>
      <p className="text-sm text-muted-foreground/70">
        Stay tuned — we&apos;ll announce it everywhere.
      </p>
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
