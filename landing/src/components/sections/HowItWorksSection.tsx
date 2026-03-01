import React from 'react';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '@/components/ui/motion';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Selection",
      description: "We hand-pick applicants based on depth of character, grit, and raw curiosity. Skills can be taught; drive cannot.",
      details: ["Motivation check", "Technical baseline", "Vision alignment"]
    },
    {
      number: "02",
      title: "Construction",
      description: "Across 3 intensive months, you'll architect and build a polished product with practical developer guidance.",
      details: ["Weekly sprints", "Hands-on help", "Pragmatic design"]
    },
    {
      number: "03",
      title: "Showcase",
      description: "Share your work with the community and fellow builders. Graduate with a project that showcases your true potential.",
      details: ["Community showcase", "Active alumni", "Better portfolio"]
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-20">
          <div className="max-w-3xl">
            <FadeIn variants={fadeInVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-[10px] font-black text-foreground uppercase tracking-widest">
                The Process
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter font-display uppercase italic">
                How it works.
              </h2>
              <p className="text-muted-foreground uppercase tracking-[0.3em] font-black text-[10px]">
                A structured path from idea to production-grade engineering.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <SlideUp key={index} variants={slideUpVariants} className="relative group h-full">
                <EtherealShadow variant="subtle" className="h-full rounded-none">
                  <Card className="h-full flex flex-col border border-border bg-card/60 backdrop-blur-md transition-all duration-500 hover:border-foreground/30 overflow-hidden rounded-none">
                    <CardContent className="p-8 space-y-8 flex-1">
                      {/* Number Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-5xl font-black text-foreground/10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-teal-400 group-hover:to-blue-500 transition-all duration-500 font-display">
                          {step.number}
                        </span>
                        <div className="w-10 h-10 border border-border bg-muted flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 group-hover:border-teal-400/50 group-hover:text-teal-500 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase font-display">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>

                      <ul className="space-y-3 pt-4">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-foreground/70">
                            <CheckCircle2 className="w-4 h-4 text-foreground" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-foreground transition-all duration-700 group-hover:w-full" />
                  </Card>
                </EtherealShadow>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}