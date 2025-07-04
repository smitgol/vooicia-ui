"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const lineAnimation = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { 
    scaleY: 1, 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const steps = [
  {
    number: '01',
    title: 'Share Your Support Call Requirements',
    description: 'Tell us what your AI agent should handle — common queries, FAQs, or escalation rules.',
    info: 'We collect your use case, business hours, and support call types over a short call.'
  },
  {
    number: '02',
    title: 'We Set Up the Voice Agent for You',
    description: 'Our team builds the voice script, sets language preferences, and integrates with your call number.',
    info: 'No coding or tool setup needed on your end — we do it all.'
  },
  {
    number: '03',
    title: 'AI Starts Answering Calls',
    description: 'We connect the AI to your business number. It begins answering calls instantly with a human-like voice.',
    info: 'Your support line is now smart, fast, and available 24/7.'
  },
  {
    number: '04',
    title: 'You Get Reports & Insights',
    description: 'Get regular reports with call summaries, feedback, and suggestions for improvement.',
    info: 'Track resolved queries, missed calls, and escalation rates from our simple dashboard or via email.'
  }
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 overflow-hidden max-w-5xl md:max-w-7xl mx-auto">
      <div className="container mx-auto px-4 text-center">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block px-4 py-2 mb-20 text-sm font-medium bg-violet-100 text-violet-600 rounded-full text-center"
        >
          How It Works
        </motion.span>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.number} 
              className="group relative"
              variants={fadeIn}
            >
              <div className={`h-full flex ${index%2 === 0 ? 'flex-col' : 'flex-col-reverse'} items-center text-center bg-white transition-all duration-300 gap-16 hover:scale-[1.02]`}>
                <motion.div 
                  className="relative z-10 w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-6 group-hover:bg-violet-200 transition-colors duration-300 hidden md:flex"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl font-bold text-violet-700">{step.number}</span>
                </motion.div>
                
                <motion.div 
                  className={`absolute left-1/2 w-0.5 h-48 bg-gradient-to-b from-violet-200 to-violet-100 transform ${index%2 === 0 ? 'top-10' : 'bottom-10'} -translate-x-1/2 hidden md:block`}
                  variants={lineAnimation}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                
                <motion.div 
                  className="w-full z-10"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="w-full border-1 shadow-none hover:shadow-md bg-white p-6 gap-0">
                    <CardHeader className="px-0 md:pb-3 pb-0">
                      <CardTitle className="text-xl font-semibold text-violet-900">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                        <p className="text-sm text-violet-800">{step.info}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;