import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants, cardHoverVariants } from '@/components/ui/motion';
import { Code, Users, Target, Zap, BookOpen, Rocket } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Code,
      title: 'Real Projects',
      description: 'Build production-ready applications that solve actual problems'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from experienced developers with 1-on-1 guidance'
    },
    {
      icon: Target,
      title: 'Industry Focus',
      description: 'Master the tools and practices used in top tech companies'
    },
    {
      icon: Zap,
      title: 'Fast-Track Learning',
      description: 'Accelerate your growth with structured, intensive training'
    },
    {
      icon: BookOpen,
      title: 'Best Practices',
      description: 'Learn clean code, testing, deployment, and collaboration'
    },
    {
      icon: Rocket,
      title: 'Career Ready',
      description: 'Graduate with a portfolio that gets you hired'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn variants={fadeInVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
            About TSP
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
              Transform from aspiring developer to industry-ready engineer in just 3 months.
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <SlideUp key={index} variants={slideUpVariants}>
                <EtherealShadow variant="subtle">
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </EtherealShadow>
              </SlideUp>
            );
          })}
        </StaggerContainer>

        {/* Stats Section */}
        <FadeIn
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <EtherealShadow variant="intense">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">3</h3>
                    <p className="text-primary-foreground/80 text-lg">Months to Transform</p>
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">1:1</h3>
                    <p className="text-primary-foreground/80 text-lg">Mentorship Sessions</p>
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">100%</h3>
                    <p className="text-primary-foreground/80 text-lg">Project Completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </EtherealShadow>
        </FadeIn>

        {/* Mission Statement */}
        <SlideUp
          variants={slideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <EtherealShadow>
            <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-0">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                  We believe that with the right guidance, dedication, and hands-on experience,
                  anyone can become a world-class developer. TSP bridges the gap between learning to code
                  and becoming a professional software engineer.
                </p>
              </CardContent>
            </Card>
          </EtherealShadow>
        </SlideUp>
      </div>
    </section>
  );
}