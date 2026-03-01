'use client';

import { Button } from '../ui';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '../ui/motion';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  isApplicationOpen?: boolean;
}

export function HeroSection({ isApplicationOpen = false }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20"
      aria-labelledby="hero-title"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden="true">
        {/* Subtle monochrome ambient lights */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[10%] left-[10%] w-[60%] h-[60%] bg-foreground/5 blur-[120px]"
          />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <StaggerContainer
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-10"
        >

          {/* Logo - Monochrome & Sharp */}
          <FadeIn variants={fadeInVariants} className="relative group">
            <div className="p-1 border border-border bg-background shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/assets/tsp-logo.jpg"
                alt="TSP Logo"
                width={140}
                height={140}
                className="grayscale group-hover:grayscale-0 transition-all duration-700 select-none"
                priority
              />
            </div>
          </FadeIn>

          {/* Hero Content */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <SlideUp variants={slideUpVariants}>
              <h1
                id="hero-title"
                className="text-5xl md:text-8xl lg:text-9xl font-black text-foreground leading-[0.85] tracking-tighter font-display mb-8"
              >
                THE SIDE <br />
                <span className="text-foreground italic">
                  PROJECT.
                </span>
              </h1>
            </SlideUp>

            <FadeIn variants={fadeInVariants}>
              <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight">
                A 3-month mentorship to help you build projects that stand out.
              </p>
            </FadeIn>
          </div>

          {/* Enhanced CTA Buttons Area */}
          <FadeIn variants={fadeInVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-xl mx-auto">
            <Link href="/apply" className="w-full sm:w-auto">
              {isApplicationOpen ? (
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto rounded-none px-12 h-16 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-background hover:text-foreground border border-foreground active:translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group"
                  aria-label="Apply for Cohort 2"
                >
                  Build your breakout project
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-none px-12 h-16 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 bg-muted/30 hover:bg-foreground hover:text-background text-muted-foreground border-2 border-dashed border-border group flex items-center justify-center gap-3 relative overflow-hidden"
                  aria-label="Waitlist / Opening Soon"
                >
                  <div className="grid grid-cols-1 grid-rows-1 place-items-center">
                    <div className="col-start-1 row-start-1 flex items-center justify-center gap-3 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                      </span>
                      <span>C2 Opening Soon</span>
                    </div>
                    <div className="col-start-1 row-start-1 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <span>Join Waitlist</span>
                    </div>
                  </div>
                </Button>
              )}
            </Link>

            <Link href="/prev-cohorts" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-none px-12 h-16 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-foreground hover:text-background border border-border group"
                aria-label="See Previous Cohorts"
              >
                Showcase
              </Button>
            </Link>
          </FadeIn>

        </StaggerContainer>
      </div>
    </section>
  );
}