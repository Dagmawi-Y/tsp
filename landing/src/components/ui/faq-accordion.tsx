import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './Accordion';
import { HelpCircle, Plus, Minus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { EtherealShadow } from './ethereal-shadow';

interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  className = '',
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("space-y-6", className)}
    >
      {items.map((item, index) => (
        <EtherealShadow
          key={item.id}
          variant="subtle"
          className="rounded-none"
        >
          <AccordionItem
            value={item.id}
            className="border border-border bg-card/60 backdrop-blur-md rounded-none overflow-hidden transition-all duration-500 hover:bg-card/80 group"
          >
            <AccordionTrigger
              hideChevron
              className={cn(
                "px-8 py-6 text-left hover:no-underline transition-all duration-300",
                "data-[state=open]:bg-foreground/5"
              )}
            >
              <div className="flex items-center gap-6 w-full">
                <div className="shrink-0 w-10 h-10 border border-border bg-muted flex items-center justify-center text-foreground group-hover:bg-linear-to-br group-hover:from-teal-400 group-hover:to-blue-500 group-hover:border-teal-400 group-hover:text-white transition-all duration-500 group-data-[state=open]:bg-linear-to-br group-data-[state=open]:from-teal-400 group-data-[state=open]:to-blue-500 group-data-[state=open]:text-white">
                  <span className="text-sm font-black">{index + 1}</span>
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300 uppercase">
                  {item.question}
                </span>
                <div className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 transition-transform duration-500 group-data-[state=open]:rotate-90" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-8 pb-8 text-muted-foreground/90 leading-relaxed text-lg">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="pt-4 border-t border-border/40"
              >
                {item.answer}
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </EtherealShadow>
      ))}
    </Accordion>
  );
};