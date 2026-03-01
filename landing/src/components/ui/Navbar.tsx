'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavbarProps {
  offsetTop?: boolean;
}

export function Navbar({ offsetTop = false }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'previous-cohorts'];
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      // Special case for home section when at top
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'apply') {
      window.location.href = '/apply';
      return;
    }
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -100; // Account for fixed navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', ariaLabel: 'Navigate to home section' },
    { id: 'about', label: 'About', ariaLabel: 'Navigate to about section' },
    { id: 'previous-cohorts', label: 'Cohorts', ariaLabel: 'Navigate to previous cohorts section' },
    { id: 'apply', label: 'Apply', ariaLabel: 'Navigate to application section' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
        offsetTop ? "top-16 md:top-14" : "top-6"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <motion.div
        className="bg-background/95 backdrop-blur-md border border-border px-2 py-1.5"
      >
        <div className="flex items-center space-x-1">
          <ul className="flex items-center space-x-1" role="list">
            {navItems.map((item) => (
              <li key={item.id} role="listitem">
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-center px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 min-w-[44px] min-h-[44px] ${activeSection === item.id
                    ? 'bg-foreground text-background'
                    : 'text-foreground/70 hover:text-foreground'
                    }`}
                  aria-label={item.ariaLabel}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="sm:hidden">{item.label.charAt(0)}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.nav>
  );
}