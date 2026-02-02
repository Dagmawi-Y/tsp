'use client';

import { Button } from '../ui';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '../ui/motion';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50"></div>

        {/* Geometric shapes for visual interest */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-muted/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-muted/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-muted/10 rounded-full blur-lg"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <StaggerContainer
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-12"
        >
          {/* Logo */}
          <FadeIn variants={fadeInVariants} className="flex justify-center">
            <div className="relative">
              <Image
                src="/assets/tsp-logo.jpg"
                alt="TSP Logo"
                width={120}
                height={120}
                className="rounded-2xl shadow-lg"
                priority
              />
            </div>
          </FadeIn>

          {/* Main Title */}
          <SlideUp variants={slideUpVariants}>
            <h1
              id="hero-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight"
            >
              TSP
            </h1>
          </SlideUp>

          {/* Tagline */}
          <FadeIn variants={fadeInVariants}>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              3-month mentorship. Real projects. Career readiness.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn variants={fadeInVariants} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-8">
            <Link href="/apply">
              <Button
                variant="default"
                size="lg"
                className="rounded-none px-8 py-4 text-lg font-semibold min-w-[200px] h-14 transition-transform hover:scale-105"
                aria-label="Apply for Cohort 2 - Navigate to application form"
              >
                Apply for Cohort 2
              </Button>
            </Link>
            <Link href="/prev-cohorts">
              <Button
                variant="outline"
                size="lg"
                className="rounded-none px-8 py-4 text-lg font-semibold min-w-[200px] h-14 transition-transform hover:scale-105"
                aria-label="See Previous Cohorts - Navigate to showcase section"
              >
                See Previous Cohorts
              </Button>
            </Link>
          </FadeIn>
        </StaggerContainer>
      </div>
    </section>
  );
}