"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { useState, useRef } from "react";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = project.imageUrl.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  return (
    <section className="min-h-screen bg-background pt-20 pb-32 relative overflow-hidden">
      {/* Decorative Colorful Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full point-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full point-events-none -z-10" />

      {/* Navigation Bar */}
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/prev-cohorts">
            <Button variant="ghost" className="rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-muted text-muted-foreground hover:text-foreground h-10 px-4">
              <ArrowLeft className="w-3 h-3 mr-2" />
              BACK TO SHOWCASE
            </Button>
          </Link>
          <div className="flex gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none font-black text-[10px] uppercase tracking-widest border-border hover:border-foreground hover:bg-foreground hover:text-background h-10 px-6">
                  VIEW GITHUB
                </Button>
              </a>
            )}
            {/* Live Button disabled directly as per request */}
            <Button disabled className="rounded-none font-black text-[10px] uppercase tracking-widest bg-muted text-muted-foreground border-border border h-10 px-6 opacity-60 cursor-not-allowed cursor-pointer-none">
              LIVE DEMO: OFFLINE
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">

        {/* Header Block */}
        <div className="space-y-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-12">
          <div className="space-y-4 flex-1">
            <span className="inline-block border-none bg-linear-to-r from-teal-400 to-blue-500 text-white shadow-md text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter font-display uppercase leading-[0.9]">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="mt-8 md:mt-0 text-left md:text-right space-y-4 shrink-0">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Built By</p>
              <ul className="text-sm font-bold">
                {project.author.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Cohort</p>
              <p className="text-sm font-bold uppercase tracking-widest">{project.cohort}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Image Carousel Strip */}
        <div className="relative group/carousel -mx-4 sm:mx-0">
          <div className="absolute top-1/2 -left-6 md:-left-12 -translate-y-1/2 z-20">
            <button
              onClick={prev}
              className="bg-background border border-border p-3 hover:bg-foreground hover:text-background transition duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:block"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div ref={containerRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar hover-scrollbar pl-4 sm:pl-0">
            {project.imageUrl.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 w-[280px] md:w-[320px] lg:w-[400px] h-[500px] md:h-[600px] border border-border bg-muted/10 snap-center transition-opacity"
              >
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-contain p-4"
                  priority={i < 3}
                />
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 -right-6 md:-right-12 -translate-y-1/2 z-20">
            <button
              onClick={next}
              className="bg-background border border-border p-3 hover:bg-foreground hover:text-background transition duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:block"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Two Column Layout for Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">

          {/* Main Body */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-6 relative inline-block">
                The Project
                <div className="absolute -bottom-2 left-0 w-3/4 h-1 bg-linear-to-r from-teal-400 to-blue-500"></div>
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed font-medium">
                {project.briefDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph.trim()}</p>
                ))}
              </div>
            </div>

            {project.highlights && (
              <div>
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-6 relative inline-block">
                  Highlights
                  <div className="absolute -bottom-2 left-0 w-3/4 h-1 bg-linear-to-r from-teal-400 to-blue-500"></div>
                </h2>
                <ul className="space-y-4">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-teal-400 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                      <span className="text-muted-foreground font-medium leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Tech Stack */}
          <div className="md:col-span-1 space-y-8 sticky top-32">
            <div className="border border-border p-8 bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)]">
              <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 border border-border bg-linear-to-br from-muted to-muted/50 text-[10px] uppercase font-bold tracking-widest text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-linear-to-br from-teal-500 to-blue-600 text-white shadow-lg">
              <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-4 text-white">Want to build something like this?</h3>
              <Link href="/apply">
                <Button variant="outline" className="w-full rounded-none font-black text-[10px] uppercase tracking-widest border-white/20 bg-white/10 hover:bg-white hover:text-blue-600 text-white h-12 transition-all">
                  Apply for next Cohort
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
