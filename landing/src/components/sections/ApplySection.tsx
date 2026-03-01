'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '@/components/ui/motion';
import { ArrowRight, Users, Clock, Target } from 'lucide-react';
import Link from 'next/link';

interface ApplySectionProps {
  isApplicationOpen?: boolean;
}

export const ApplySection: React.FC<ApplySectionProps> = ({ isApplicationOpen = false }) => {
  return (
    <section id="apply" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn variants={fadeInVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tighter font-display uppercase italic">
            APPLY FOR COHORT 2.
          </h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] font-black text-[10px]">
            Ready to build something meaningful? Join a small, focused group of builders and ship your project.
          </p>
        </FadeIn>

        <StaggerContainer
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <SlideUp variants={slideUpVariants} className="h-full">
            <EtherealShadow variant="subtle" className="h-full rounded-none">
              <Card className="text-center h-full border border-border rounded-none bg-card/40">
                <CardHeader>
                  <Users className="w-12 h-12 mx-auto mb-4 text-foreground" />
                  <CardTitle className="text-xl font-black uppercase tracking-widest font-display">Small Cohorts</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest">
                    Limited spots for focused group guidance
                  </CardDescription>
                </CardHeader>
              </Card>
            </EtherealShadow>
          </SlideUp>

          <SlideUp variants={slideUpVariants} className="h-full">
            <EtherealShadow variant="subtle" className="h-full rounded-none">
              <Card className="text-center h-full border border-border rounded-none bg-card/40">
                <CardHeader>
                  <Clock className="w-12 h-12 mx-auto mb-4 text-foreground" />
                  <CardTitle className="text-xl font-black uppercase tracking-widest font-display">3 Months</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest">
                    Intensive program with weekly check-ins
                  </CardDescription>
                </CardHeader>
              </Card>
            </EtherealShadow>
          </SlideUp>

          <SlideUp variants={slideUpVariants} className="h-full">
            <EtherealShadow variant="subtle" className="h-full rounded-none">
              <Card className="text-center h-full border border-border rounded-none bg-card/40">
                <CardHeader>
                  <Target className="w-12 h-12 mx-auto mb-4 text-foreground" />
                  <CardTitle className="text-xl font-black uppercase tracking-widest font-display">Real Projects</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest">
                    Build something meaningful for your portfolio
                  </CardDescription>
                </CardHeader>
              </Card>
            </EtherealShadow>
          </SlideUp>
        </StaggerContainer>

        <FadeIn
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <EtherealShadow className="rounded-none">
            <Card className="max-w-2xl mx-auto border border-border rounded-none bg-card/40">
              <CardHeader className="space-y-6">
                <CardTitle className="text-4xl font-black uppercase tracking-tighter font-display">
                  {isApplicationOpen ? 'READY TO START?' : 'OPENING SOON'}
                </CardTitle>
                <CardDescription className="text-lg font-medium text-foreground/80">
                  {isApplicationOpen
                    ? "The application takes about 5 minutes to complete. We'll review it and get back to you within a week."
                    : 'Applications for Cohort 2 will open shortly. Stay tuned!'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/apply">
                  <Button size="lg" className="w-full md:w-auto rounded-none h-16 px-12 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground uppercase font-black text-[10px] tracking-widest" variant={isApplicationOpen ? 'default' : 'outline'}>
                    {isApplicationOpen ? 'Start Application' : 'Learn More'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </EtherealShadow>
        </FadeIn>
      </div>
    </section>
  );
};