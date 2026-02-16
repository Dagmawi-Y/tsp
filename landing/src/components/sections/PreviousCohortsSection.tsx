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
          <h2 id="previous-cohorts-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Previous Cohorts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
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
            <EtherealShadow key={project.id} variant="subtle">
              <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                {/* Project Screenshot */}
                <div className="relative overflow-hidden rounded-t-lg">
                  {project.imageUrl[0] ? (
                    <img
                      src={project.imageUrl[0]}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-56 bg-muted flex items-center justify-center text-muted-foreground">
                      No Screenshot
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-primary/80 text-primary-foreground text-xs rounded-md font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Header */}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
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
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
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
                    {/* {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )} */}
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
            <EtherealShadow>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Want to See More?</h3>
                    <p className="text-muted-foreground">
                      Explore all projects from our previous cohorts and get inspired by what you could build.
                    </p>
                    <Link href="/prev-cohorts">
                      <Button size="lg" className="w-full md:w-auto">
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
