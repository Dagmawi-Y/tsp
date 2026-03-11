import React from 'react';
import { FAQAccordion } from '../ui/faq-accordion';
import { EtherealShadow } from '../ui/ethereal-shadow';
import { FadeIn, SlideUp, fadeInVariants, slideUpVariants } from '../ui/motion';

const faqData = [
  {
    id: 'who-can-apply',
    question: 'Who can apply?',
    answer: 'Anyone with basic full-stack experience who has built at least one project.'
  },
  {
    id: 'is-it-free',
    question: 'Is it free?',
    answer: 'Completely free. No fees, no costs, no catches.'
  },
  {
    id: 'time-commitment',
    question: 'Time commitment?',
    answer: '3 months, 10-15 hours/week. Project work, mentorship sessions, community activities.'
  },
  {
    id: 'remote-or-in-person',
    question: 'Remote or in-person?',
    answer: 'Fully remote. Work from anywhere in the world.'
  },
  {
    id: 'what-projects',
    question: 'What projects?',
    answer: 'Real-world projects that solve actual problems. Web apps, mobile apps, dev tools, open source.'
  },
  {
    id: 'mentorship-format',
    question: 'How does mentorship work?',
    answer: 'Weekly sessions with experienced developers, group discussions, and code reviews. Tailored to your project needs.'
  },
  {
    id: 'selection-process',
    question: 'How are people selected?',
    answer: 'Selection is based on motivation, consistency, and evidence of basic full-stack experience.'
  },
  {
    id: 'after-program',
    question: 'What happens after?',
    answer: 'You leave with a finished project, sharper skills, and a community of fellow builders.'
  }
];

export const FAQSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn variants={fadeInVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tighter font-display uppercase italic">
            FAQ.
          </h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] font-black text-[10px]">
            Quick answers to common questions.
          </p>
        </FadeIn>

        <SlideUp
          variants={slideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative"
        >
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 blur-[80px] -z-10" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10" />

          <FAQAccordion items={faqData} />
        </SlideUp>
      </div>
    </section>
  );
};