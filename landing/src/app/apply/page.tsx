'use client';

import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { ApplicationData } from '@/types/application';
import { Button } from '@/components/ui';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, fadeInVariants } from '@/components/ui/motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/sections/Footer';

export default function ApplyPage() {
  const handleSubmit = async (data: ApplicationData) => {
    // TODO: Replace with actual API call
    console.log('Application submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For now, just log the data
    // In a real app, you'd send this to your backend
  };

  return (
    <FadeIn
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
    >
      <EtherealShadow className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/assets/tsp-logo.jpg"
                    alt="TSP Logo"
                    width={80}
                    height={80}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                  Apply for Cohort 2
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Ready to build something amazing? Let&apos;s get started.
                </p>
              </div>
            </div>

            <ApplicationForm onSubmit={handleSubmit} />
          </div>
        </div>

        <Footer />
      </EtherealShadow>
    </FadeIn>
  );
}

