"use client"
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stepsData = [
  {
    number: "01",
    title: "Setup & Configuration",
    description: "Configure your business knowledge base, FAQs, and customer service protocols.",
    image: "/images/setup_step.png"
  },
  {
    number: "02",
    title: "Voice Training",
    description: "Train the AI with your brand voice, tone, and specific terminology for personalized customer interactions.",
    image: "/images/voice_training_step.png"
  },
  {
    number: "03",
    title: "Integration & Testing",
    description: "Connect Voycia to your phone systems and run comprehensive tests to ensure optimal performance.",
    image: "/images/testing_step.png"
  },
  {
    number: "04",
    title: "Go Live & Monitor",
    description: "Launch your AI voice agent and monitor performance with real-time analytics and continuous optimization.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
  }
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".fade-in-stagger");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${0.1 * (index + 1)}s`;
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={ref} className="py-16 mx-auto max-w-5xl md:max-w-7xl">
      <div className="container mx-auto px-4 text-start">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block px-4 py-2 md:text-sm text-xs font-medium bg-primary/10 text-primary rounded-full mb-4"
        >
          How We Work
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='md:w-2/3 w-full'
        >
          <h2 className='font-bold md:text-5xl text-4xl my-0 md:my-5 font-[Gambit]'>A consultative approach</h2>
          <p className='text-muted-foreground text-sm md:text-lg mt-4 md:mt-12 leading-6'>
          {"Based on your business needs, we’ll help you tailor an AI voice agent that maximizes value capture from your existing operations and development pipeline. We’ll then work on your behalf to expedite timelines, optimize outcomes, and manage customer support."}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-8 md:mt-16 divide-x divide-y md:divide-y-0 border rounded-xl overflow-hidden">
          {stepsData.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start md:px-8 md:py-12 p-6 md:gap-10 gap-2 hover:bg-accent/30 transition-colors"
            >
              <div className="text-2xl font-bold text-primary">{step.number}</div>
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-start leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;