'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { FadeIn, SlideUp, StaggerContainer, fadeInVariants, slideUpVariants, staggerVariants } from '@/components/ui/motion';
import { ExternalLink, Github, ArrowLeft, Filter, Sparkles, Code2, Users2, Layers } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { allProjects, categories, cohorts } from '@/data/projects';

export default function PrevCohortsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCohort, setSelectedCohort] = useState('All');

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const cohortMatch = selectedCohort === 'All' || project.cohort === selectedCohort;
    return categoryMatch && cohortMatch;
  });

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Navigation & Header */}
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn variants={fadeInVariants} initial="hidden" animate="visible">
            <Link href="/">
              <Button variant="ghost" className="group rounded-full pl-3 pr-5 h-10 text-muted-foreground hover:text-foreground transition-all">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </FadeIn>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4">
            <div className="space-y-4">
              <SlideUp variants={slideUpVariants} initial="hidden" animate="visible">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">
                  <Sparkles className="w-3 h-3" /> Showcase
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Legacy.</span>
                </h1>
              </SlideUp>
              <FadeIn variants={fadeInVariants} initial="hidden" animate="visible">
                <p className="text-lg text-muted-foreground font-medium max-w-xl">
                  A small but focused collection of projects built during our previous cohorts. Real problems, real shipping.
                </p>
              </FadeIn>
            </div>

            {/* Glassmorphism Filters */}
            <FadeIn variants={fadeInVariants} initial="hidden" animate="visible" className="w-full md:w-auto">
              <EtherealShadow variant="subtle" className="rounded-2xl overflow-hidden">
                <div className="bg-card/40 backdrop-blur-xl border border-white/10 p-2 flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2 px-3 text-muted-foreground/60">
                    <Filter className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Filter</span>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[160px] h-10 bg-transparent border-0 focus:ring-0">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="w-px h-8 bg-border/20 hidden sm:block self-center" />
                  <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                    <SelectTrigger className="w-full sm:w-[160px] h-10 bg-transparent border-0 focus:ring-0">
                      <SelectValue placeholder="Cohort" />
                    </SelectTrigger>
                    <SelectContent>
                      {cohorts.map(cohort => (
                        <SelectItem key={cohort} value={cohort}>{cohort}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </EtherealShadow>
            </FadeIn>
          </div>

          {/* Projects Grid */}
          <StaggerContainer
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-12 pt-12 ${filteredProjects.length === 1
              ? 'grid-cols-1 max-w-2xl mx-auto'
              : filteredProjects.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <EtherealShadow variant="default" className="h-full rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                    <Card className="h-full flex flex-col border-0 bg-card/60 backdrop-blur-md overflow-hidden rounded-[2.5rem]">
                      {/* Image Area with Overlay */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        {project.imageUrl?.length > 0 && project.imageUrl[0] !== '' ? (
                          <Image
                            src={project.imageUrl[0]}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40 space-y-2">
                            <Code2 className="w-10 h-10" />
                            <span className="text-xs font-bold uppercase tracking-widest">No Preview</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-6 flex gap-2">
                          {project.technologies.slice(0, 2).map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <CardHeader className="pt-8 px-8 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-60">
                              <Layers className="w-3 h-3" /> {project.category} • {project.cohort}
                            </div>
                            <CardTitle className="text-2xl font-black tracking-tight">{project.title}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-muted-foreground font-medium leading-relaxed line-clamp-3">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="px-8 pb-8 pt-2 flex-1 flex flex-col space-y-8">
                        {/* Authors - Distinct Look */}
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {project.author.map((name, i) => (
                              <div key={name} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary flex items-center justify-center ring-2 ring-background text-[10px] font-bold text-white uppercase">
                                {name[0]}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-muted-foreground/80">
                            {project.author.join(', ')}
                          </span>
                        </div>

                        {/* Push actions to bottom */}
                        <div className="mt-auto flex items-center gap-3">
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" asChild className="rounded-xl font-bold gap-2">
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" /> Code
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button variant="default" size="sm" asChild className="rounded-xl font-bold gap-2 flex-1 shadow-md">
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </EtherealShadow>
                </motion.div>
              ))}
            </AnimatePresence>
          </StaggerContainer>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <FadeIn initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center space-y-6">
              <div className="inline-flex p-6 rounded-full bg-muted/50 border border-border/50">
                <Filter className="w-8 h-8 text-muted-foreground/30 font-thin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">No projects found.</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">Try adjusting your filters or check back later for new additions.</p>
              </div>
              <Button variant="ghost" onClick={() => { setSelectedCategory('All'); setSelectedCohort('All'); }}>
                Clear Filters
              </Button>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
