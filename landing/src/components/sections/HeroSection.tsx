'use client';

import { Button } from '../ui';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '../ui/motion';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20"
      aria-labelledby="hero-title"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden="true">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]"
          />
          <motion.div
            animate={{
              y: [0, 50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[10%] left-[20%] w-[60%] h-[30%] rounded-full bg-primary/20 blur-[120px]"
          />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
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

          {/* Logo with Glow */}
          <FadeIn variants={fadeInVariants} className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            <div className="p-1 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 dark:via-transparent dark:to-black/20 backdrop-blur-xl ring-1 ring-border shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/assets/tsp-logo.jpg"
                alt="TSP Logo"
                width={120}
                height={120}
                className="rounded-[1.8rem] shadow-sm select-none"
                priority
              />
            </div>
          </FadeIn>

          {/* Hero Content */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <SlideUp variants={slideUpVariants}>
              <h1
                id="hero-title"
                className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight tracking-tighter"
              >
                The Side{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                  Project.
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
          <FadeIn variants={fadeInVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-lg mx-auto">
            <Link href="/apply" className="w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto rounded-xl px-10 h-16 text-lg font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.3)] shadow-lg active:scale-95 group"
                aria-label="Apply for Cohort 2"
              >
                Apply for Cohort 2
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/prev-cohorts" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-xl px-10 h-16 text-lg font-bold backdrop-blur-sm bg-background/50 transition-all duration-300 hover:bg-accent border-border hover:border-primary/30 active:scale-95 shadow-sm"
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