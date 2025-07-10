"use client"
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const StepCard = ({ number, title, description, isActive, onClick }: StepCardProps) => {
  return (
    <div 
      className={
        `rounded-xl p-5 cursor-pointer transition-all duration-500 border
        ${isActive ? "bg-white shadow-elegant border-primary/70 shadow-elegant" : "bg-white/50 hover:bg-white/80 border-transparent"}`
      }
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={
          `flex items-center justify-center rounded-full w-10 h-10 mr-4 flex-shrink-0 transition-colors duration-300
          ${isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`
        }>
          {number}
        </div>
        <div>
          <h3 className={
            `text-lg font-semibold mb-2 transition-colors duration-300
            ${isActive ? "text-primary" : "text-gray-800"}`
          }>
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const stepsData = [
  {
    number: "01",
    title: "Setup & Configuration",
    description: "Configure VoiceAI with your business knowledge base, FAQs, and customer service protocols.",
    image: "/images/setup_step.png"
  },
  {
    number: "02",
    title: "Voice Training",
    description: "Train the AI with your brand voice, tone, and specific terminology for personalized customer interactions.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "03",
    title: "Integration & Testing",
    description: "Connect VoiceAI to your phone systems and run comprehensive tests to ensure optimal performance.",
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
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [stepsData.length]);
  
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
      <div className="container mx-auto px-4 text-center ">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4"
        >
          How It Works
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className='text-center font-bold md:text-5xl text-3xl mb-2'>How VoiceAI Transforms Your Support</h2>
          <p className='text-center text-muted-foreground text-lg md:text-xl'>
            A simple four-step process from setup to full deployment.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-4 order-2">
            {stepsData.map((step, index) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
          <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] w-full md:w-[650px] shadow-elegant order-1 lg:order-2 fade-in-stagger">
            {stepsData.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  activeStep === index ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-pulse-400 font-medium mb-2 block">{step.number}</span>
                    <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/80">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;