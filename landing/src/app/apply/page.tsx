'use client';

import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { ApplicationData } from '@/types/application';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, fadeInVariants } from '@/components/ui/motion';

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

