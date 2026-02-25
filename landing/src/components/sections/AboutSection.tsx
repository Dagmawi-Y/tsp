import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '@/components/ui/motion';
import { Code, Users, Target, Zap, BookOpen, Rocket, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutSection() {
  const features = [
    {
      icon: Code,
      title: 'Real Projects',
      description: 'Ditch the tutorials. We focus on building functional projects that solve actual problems.'
    },
    {
      icon: Users,
      title: 'Direct Guidance',
      description: 'Work with experienced developers dedicated to helping you solve blockers and stay on track.'
    },
    {
      icon: Target,
      title: 'Practical Skills',
      description: 'Master the habits of shipping—from clean architecture to effective technical decision making.'
    }
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <StaggerContainer
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-32"
        >
          {/* Mission Block - Clean & High Impact */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FadeIn variants={fadeInVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-[10px] font-black text-foreground uppercase tracking-widest mb-4">
                The Mission
              </div>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.8] font-display uppercase italic">
                BRIDGING THE GAP <br />
                <span className="text-foreground">WANTING</span> <span className="opacity-20">&</span> <span className="opacity-40">BUILDING.</span>
              </h2>
            </FadeIn>

            <FadeIn variants={fadeInVariants}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl mx-auto uppercase tracking-tight">
                The best way to learn is by shipping. I help you cross the finish line on your most ambitious side project.
              </p>
            </FadeIn>
          </div>

          {/* ... (Features grid remains, just updated content above) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <SlideUp key={index} variants={slideUpVariants} className="h-full">
                  <EtherealShadow variant="subtle" className="h-full rounded-none">
                    <Card className="h-full flex flex-col border border-border bg-card/40 backdrop-blur-md transition-all duration-500 hover:border-foreground/30 rounded-none group">
                      <CardContent className="p-8 space-y-6 flex-1">
                        <div className="w-12 h-12 border border-border bg-muted flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-black text-foreground uppercase tracking-widest">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground/90 leading-relaxed font-medium">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </EtherealShadow>
                </SlideUp>
              );
            })}
          </div>

          {/* Core Stats - Neatly integrated */}
          <FadeIn variants={fadeInVariants} className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 border-y border-border/50 font-display">
              <div className="text-center space-y-1">
                <p className="text-4xl md:text-6xl font-black text-foreground">3 MO.</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Intensive</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-4xl md:text-6xl font-black text-foreground">3X</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Weekly Syncs</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-4xl md:text-6xl font-black text-foreground">100%</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Build-Focused</p>
              </div>
            </div>
          </FadeIn>
        </StaggerContainer>
      </div>
    </section>
  );
}