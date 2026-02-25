'use client';

import React, { useState, useEffect } from 'react';
import { ApplicationData } from '@/types/application';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Loader2, ArrowLeft, ChevronRight, Sparkles, Github, Linkedin, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationFormProps {
  onSubmit: (data: ApplicationData) => Promise<void>;
  isSubmitting?: boolean;
}

const experienceOptions = [
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Back-end' },
  { value: 'fullstack', label: 'Full-stack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'ml-ai', label: 'ML/AI' },
  { value: 'design', label: 'UI/UX Design' },
];

const statusOptions = [
  { value: 'student', label: 'University Student' },
  { value: 'professional', label: 'Software Engineer' },
  { value: 'self-taught', label: 'Self-taught Learner' },
  { value: 'bootcamp', label: 'Bootcamp Student/Grad' },
  { value: 'other', label: 'Other' },
];

const hoursOptions = [
  { value: '10-15', label: '10-15 hours/week' },
  { value: '15-20', label: '15-20 hours/week' },
  { value: '25+', label: '25+ hours/week' },
];

// Helper for consistent input styling that removes all rings and default outlines
const inputStyles = "h-16 text-2xl font-black bg-transparent border-0 border-b-2 border-border focus:border-foreground focus-visible:border-foreground focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none rounded-none px-4 transition-all placeholder:opacity-20 !ring-0 !outline-none uppercase tracking-tight";
const textareaStyles = "min-h-[200px] text-xl font-medium bg-muted/30 border border-border focus:border-foreground focus-visible:border-foreground focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none rounded-none p-6 transition-all !ring-0 !outline-none";

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    telegramUsername: '',
    githubUrl: '',
    linkedinUrl: '',
    currentStatus: '',
    projectDescription: '',
    projectLink: '',
    technicalChallenge: '',
    experience: [],
    whyJoin: '',
    canCommit: false,
    hoursPerWeek: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) { // Name
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    } else if (step === 2) { // Contact
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.telegramUsername.trim()) newErrors.telegramUsername = 'Telegram is required';
    } else if (step === 3) { // Socials
      if (!formData.githubUrl?.trim()) newErrors.githubUrl = 'GitHub URL is required';
      if (!formData.linkedinUrl?.trim()) newErrors.linkedinUrl = 'LinkedIn URL is required';
    } else if (step === 4) { // Status
      if (!formData.currentStatus) newErrors.currentStatus = 'Please select your status';
    } else if (step === 5) { // Experience
      if (formData.experience.length === 0) newErrors.experience = 'Select at least one specialization';
    } else if (step === 6) { // Project
      if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Description is required';
      if (!formData.projectLink?.trim()) newErrors.projectLink = 'Project link is required';
    } else if (step === 7) { // Challenge
      if (!formData.technicalChallenge?.trim()) newErrors.technicalChallenge = 'This section is required';
    } else if (step === 8) { // Motivation
      if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Motivation is required';
    } else if (step === 9) { // Commitment
      if (!formData.canCommit) newErrors.canCommit = 'Commitment is required';
      if (!formData.hoursPerWeek) newErrors.hoursPerWeek = 'Hours per week is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setSubmitStatus('success');
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.target instanceof HTMLTextAreaElement) return;

      if (currentStep < totalSteps - 1) {
        e.preventDefault();
        nextStep();
      } else if (currentStep === totalSteps - 1) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const steps = [
    // 0: Welcome
    {
      id: 'welcome',
      title: 'Ready to build your breakout project?',
      description: 'Applications for Cohort 2 are now open. This will take about 4 minutes.',
      content: (
        <div className="flex flex-col items-center md:items-start gap-6">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-foreground" /> Become part of Cohort 2
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" className="rounded-none px-8 h-12 font-black uppercase tracking-widest text-[10px] border border-border hover:bg-foreground hover:text-background transition-all">
                Explore Website
              </Button>
            </Link>
          </div>
        </div>
      )
    },
    // 1: Name
    {
      id: 'name',
      title: 'First, what is your name?',
      description: 'Your identity in our cohort.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">First Name</Label>
            <Input
              autoFocus
              placeholder="Elon"
              value={formData.firstName}
              onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.firstName && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.firstName}</p>}
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Last Name</Label>
            <Input
              placeholder="Musk"
              value={formData.lastName}
              onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.lastName && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.lastName}</p>}
          </div>
        </div>
      )
    },
    // 2: Contact
    {
      id: 'contact',
      title: 'Where can we reach you?',
      description: 'Primary channels for communication.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Email</Label>
            <Input
              autoFocus
              type="email"
              placeholder="elon@mars.com"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.email && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.email}</p>}
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Telegram @</Label>
            <Input
              placeholder="mars_elon"
              value={formData.telegramUsername}
              onChange={e => setFormData(prev => ({ ...prev, telegramUsername: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.telegramUsername && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.telegramUsername}</p>}
          </div>
        </div>
      )
    },
    // 3: Socials
    {
      id: 'socials',
      title: 'Show us your digital footprint.',
      description: 'We want to see what you have built and how you contribute.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
              <Github className="w-4 h-4" /> GitHub URL
            </Label>
            <Input
              autoFocus
              placeholder="github.com/username"
              value={formData.githubUrl}
              onChange={e => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.githubUrl && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.githubUrl}</p>}
          </div>
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
              <Linkedin className="w-4 h-4" /> LinkedIn Profile
            </Label>
            <Input
              placeholder="linkedin.com/in/username"
              value={formData.linkedinUrl}
              onChange={e => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.linkedinUrl && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.linkedinUrl}</p>}
          </div>
        </div>
      )
    },
    // 4: Current Status
    {
      id: 'status',
      title: 'What is your current focus?',
      description: 'Helps me understand how to best support your rhythm.',
      content: (
        <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setFormData(prev => ({ ...prev, currentStatus: option.value }));
                setTimeout(nextStep, 200);
              }}
              className={cn(
                "group relative flex items-center justify-between p-6 border transition-all duration-300 text-left",
                formData.currentStatus === option.value
                  ? "border-foreground bg-foreground/5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] translate-x-[-2px] translate-y-[-2px]"
                  : "border-border hover:border-foreground/30 hover:bg-muted/50"
              )}
            >
              <span className="text-xl font-bold">{option.label}</span>
              <div className={cn(
                "w-6 h-6 border flex items-center justify-center transition-all",
                formData.currentStatus === option.value ? "border-foreground bg-foreground" : "border-border"
              )}>
                {formData.currentStatus === option.value && <div className="w-2 h-2 bg-background" />}
              </div>
            </button>
          ))}
          {errors.currentStatus && <p className="text-red-500 text-sm font-bold text-center mt-2">{errors.currentStatus}</p>}
        </div>
      )
    },
    // 5: Experience
    {
      id: 'experience',
      title: 'Choose your specializations.',
      description: 'Select all that apply to you.',
      content: (
        <div className="w-full max-w-3xl space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {experienceOptions.map((option) => {
              const isSelected = formData.experience.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    const updated = isSelected
                      ? formData.experience.filter(e => e !== option.value)
                      : [...formData.experience, option.value];
                    setFormData(prev => ({ ...prev, experience: updated }));
                  }}
                  className={cn(
                    "p-6 border transition-all duration-300 text-center space-y-2",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className="text-lg font-bold block">{option.label}</span>
                </button>
              );
            })}
          </div>
          {errors.experience && <p className="text-red-500 text-sm font-bold text-center">{errors.experience}</p>}
        </div>
      )
    },
    // 6: Project
    {
      id: 'project',
      title: 'Brag a little. Tell us about a project you are proud of.',
      description: 'Describe the stack, your role, and provide a link.',
      content: (
        <div className="w-full max-w-3xl space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Project Story</Label>
            <Textarea
              autoFocus
              placeholder="I built a distributed system for..."
              value={formData.projectDescription}
              onChange={e => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
              className={textareaStyles}
            />
            {errors.projectDescription && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.projectDescription}</p>}
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Repo or Demo Link</Label>
            <Input
              placeholder="github.com/..."
              value={formData.projectLink}
              onChange={e => setFormData(prev => ({ ...prev, projectLink: e.target.value }))}
              className={inputStyles}
              onKeyDown={handleKeyDown}
            />
            {errors.projectLink && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.projectLink}</p>}
          </div>
        </div>
      )
    },
    // 7: Challenge
    {
      id: 'challenge',
      title: 'Describe a technical hurdle you solved.',
      description: 'We care about your thought process and problem-solving skills.',
      content: (
        <div className="w-full max-w-3xl space-y-3">
          <Label className="text-sm font-bold uppercase tracking-widest opacity-60">The Challenge</Label>
          <Textarea
            autoFocus
            placeholder="There was a race condition in the..."
            value={formData.technicalChallenge}
            onChange={e => setFormData(prev => ({ ...prev, technicalChallenge: e.target.value }))}
            className={textareaStyles}
          />
          {errors.technicalChallenge && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.technicalChallenge}</p>}
        </div>
      )
    },
    // 8: Motivation
    {
      id: 'motivation',
      title: 'Why The Side Project (TSP)?',
      description: 'What do you hope to gain, and what will you bring to the cohort?',
      content: (
        <div className="w-full max-w-3xl space-y-3">
          <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Your Motivation</Label>
          <Textarea
            autoFocus
            placeholder="I want to level up my system design skills and build..."
            value={formData.whyJoin}
            onChange={e => setFormData(prev => ({ ...prev, whyJoin: e.target.value }))}
            className={textareaStyles}
          />
          {errors.whyJoin && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.whyJoin}</p>}
        </div>
      )
    },
    // 9: Commitment
    {
      id: 'commitment',
      title: 'Final checks. Can you commit?',
      description: 'The program is high-intensity and requires 3 months of focus.',
      content: (
        <div className="w-full max-w-lg space-y-12">
          <div
            onClick={() => setFormData(prev => ({ ...prev, canCommit: !prev.canCommit }))}
            className={cn(
              "flex items-center gap-6 p-6 border transition-all duration-300 cursor-pointer",
              formData.canCommit ? "border-foreground bg-foreground/5 translate-x-[-2px] translate-y-[-2px]" : "border-border hover:bg-muted/50"
            )}
          >
            <div className={cn(
              "w-10 h-10 border flex items-center justify-center transition-all",
              formData.canCommit ? "bg-foreground text-background border-foreground" : "bg-muted text-transparent border-border"
            )}>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold">Yes, I commit to 3 months.</p>
              <p className="text-sm text-muted-foreground font-medium">Program duration: Mar 2026 - May 2026</p>
            </div>
          </div>

          <div className="space-y-6">
            <Label className="text-sm font-bold uppercase tracking-widest opacity-60">Hours per week available</Label>
            <div className="grid grid-cols-1 gap-3">
              {hoursOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData(prev => ({ ...prev, hoursPerWeek: option.value }))}
                  className={cn(
                    "p-4 border transition-all duration-300 text-left font-bold uppercase tracking-widest text-[10px]",
                    formData.hoursPerWeek === option.value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.hoursPerWeek && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2">{errors.hoursPerWeek}</p>}
          </div>
          {errors.canCommit && <p className="text-foreground text-[10px] font-black uppercase tracking-widest mt-2 text-center">{errors.canCommit}</p>}
        </div>
      )
    }
  ];

  const totalSteps = steps.length;

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          if (currentStep > 0) {
            e.preventDefault();
            prevStep();
          }
        } else {
          if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            if (e.target instanceof HTMLTextAreaElement) return;
            e.preventDefault();
          }

          if (currentStep < totalSteps - 1) {
            nextStep();
          } else if (currentStep === totalSteps - 1) {
            handleSubmit();
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentStep, formData, totalSteps]);

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center space-y-12 py-20 px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-32 h-32 bg-foreground border-border border flex items-center justify-center mx-auto"
        >
          <CheckCircle className="w-16 h-16 text-background" />
        </motion.div>

        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tight font-display"
          >
            Application <br /> <span className="text-foreground">Received.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground font-medium leading-relaxed"
          >
            We&apos;ve added your portal to our review queue. <br />
            Keep an eye on your Telegram — we usually reach out <br />
            within 48 hours to schedule a deep-dive call.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <Button size="lg" className="rounded-none px-12 h-16 text-xl font-black uppercase tracking-widest transition-all hover:bg-background hover:text-foreground border border-foreground">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Confetti-like elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: (i - 2.5) * 100, y: (i % 2 === 0 ? -1 : 1) * 50 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            className="absolute left-1/2 top-1/2 -z-10 w-4 h-4 rounded-full bg-primary/20 backdrop-blur-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative min-h-[70vh] flex flex-col justify-between py-10">
      {/* Dynamic Ambient Blur */}
      <motion.div
        animate={{
          x: (currentStep % 3 - 1) * 100,
          y: (Math.floor(currentStep / 3) - 1) * 100,
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-foreground/5 blur-[120px] pointer-events-none"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-[110]">
        <motion.div
          className="h-full bg-foreground"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Step Metadata */}
      <div className="flex items-center justify-between mb-12">
        <span className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">
          Step {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
        </span>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full space-y-12"
          >
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-black text-foreground tracking-tighter leading-tight font-display">
                {steps[currentStep].title}
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="flex justify-center md:justify-start pt-4">
              {steps[currentStep].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {currentStep > 0 && (
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={prevStep}
                className="rounded-none px-8 h-16 text-[10px] font-black uppercase tracking-widest hover:bg-muted/50 transition-all group border border-border"
              >
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
              </Button>
              <span className="text-[10px] font-bold text-muted-foreground/40 mt-1 hidden md:block uppercase tracking-widest">
                Shift + Enter
              </span>
            </div>
          )}

          <div className="hidden md:flex flex-col items-center">
            <div className="flex items-center gap-3 text-muted-foreground/60 p-4">
              <div className="px-2 py-1 rounded bg-muted text-[10px] font-bold border border-border">ENTER</div>
              <span className="text-xs font-bold uppercase tracking-widest">to continue</span>
            </div>
            <div className="h-[21px]" /> {/* Spacer for symmetry with Back hint */}
          </div>
        </div>

        {currentStep === totalSteps - 1 ? (
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-none px-12 h-16 text-[10px] font-black uppercase tracking-widest border border-foreground hover:bg-background hover:text-foreground transition-all active:translate-y-0.5 group"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Final Submit <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={nextStep}
            className="rounded-none px-12 h-16 text-[10px] font-black uppercase tracking-widest bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-all active:translate-y-0.5 group"
          >
            {currentStep === 0 ? 'Start Application' : 'Continue'} <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 border border-border bg-muted text-foreground flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px]"
        >
          <AlertCircle className="w-5 h-5" />
          There was an error saving your response. Please try again.
        </motion.div>
      )}
    </div>
  );
};