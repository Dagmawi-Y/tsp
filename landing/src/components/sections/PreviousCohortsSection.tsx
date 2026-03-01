'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { getFeaturedProjects, hasMoreProjects } from '@/data/projects';

export const PreviousCohortsSection: React.FC = () => {
  const featuredProjects = getFeaturedProjects();
  const showMoreButton = hasMoreProjects();

  return (
    <section
      id="previous-cohorts"
      className="py-16 md:py-24 lg:py-32 bg-background scroll-mt-24"
      aria-labelledby="previous-cohorts-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="previous-cohorts-heading" className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tighter font-display uppercase italic text-center">
            PREVIOUS COHORTS.
          </h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] font-black text-[10px] text-center">
            Amazing projects built by our previous cohort participants.
          </p>
        </div>

        {/* Projects Grid */}
        <div className={`grid gap-8 ${featuredProjects.length === 1
          ? 'grid-cols-1 max-w-md mx-auto'
          : featuredProjects.length === 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
          {featuredProjects.map((project) => (
            <EtherealShadow key={project.id} variant="subtle" className="rounded-none">
              <Card className="group transition-all duration-300 h-full border border-border rounded-none bg-card/40">
                {/* Project Screenshot */}
                <div className="relative overflow-hidden border-b border-border">
                  {project.imageUrl[0] ? (
                    <img
                      src={project.imageUrl[0]}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-48 md:h-56 object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-56 bg-muted flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      No Screenshot
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-linear-to-r from-teal-500/90 to-blue-500/90 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Header */}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl group-hover:text-foreground transition-colors font-black uppercase tracking-tight font-display">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-1 font-medium uppercase tracking-widest text-[10px]">
                        by {project.author} • {project.cohort}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 border border-border bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-2 flex-wrap">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    <Link href={`/projects/${project.id}`} passHref>
                      <Button variant="default" size="sm">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </EtherealShadow>
          ))}
        </div>

        {/* Show More Button */}
        {showMoreButton && (
          <div className="text-center mt-12">
            <EtherealShadow className="rounded-none">
              <Card className="max-w-2xl mx-auto border border-border rounded-none">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter font-display">WANT TO SEE MORE?</h3>
                    <p className="text-muted-foreground font-medium uppercase tracking-tight text-sm">
                      Explore all projects from our previous cohorts and get inspired by what you could build.
                    </p>
                    <Link href="/prev-cohorts">
                      <Button size="lg" className="w-full md:w-auto rounded-none border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground uppercase font-black text-[10px] tracking-widest h-14 px-10">
                        View All Projects
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </EtherealShadow>
          </div>
        )}
      </div>
    </section>
  );
};
