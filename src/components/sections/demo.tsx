"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mic, Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  useRTVIClient,
  RTVIClientAudio,
} from "@pipecat-ai/client-react";
import { div } from "framer-motion/client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Demo() {
  const [isCalling, setIsCalling] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioInput, setAudioInput] = useState(false)
  const [waveform, setWaveform] = useState([])
  const audioClient = useRTVIClient();

  // Generate waveform data with smoothing
  useEffect(() => {
    if (!isCalling) return;
    
    
  }, [audioInput, isProcessing, isCalling]);

  const toggleMicrophone = () => {
    setAudioInput(prev => !prev);
  };

  const startCall = () => {
    setIsProcessing(true);
    // Simulate call connection
    setTimeout(() => {
      setIsProcessing(false);
      setIsCalling(true);
      setAudioInput(true); // Auto-start listening
    }, 1500);
  };

  const endCall = () => {
    setIsProcessing(true);
    setAudioInput(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      } 
    },
    tap: { 
      scale: 0.98,
      transition: { 
        duration: 0.1 
      } 
    }
  };

  const [selectedAssistant, setSelectedAssistant] = useState("hr_interview");
  const assistants = {
    "en": {
      "hr_interview": "HR Interview",
      "lead_qualification": "Lead Qualification",
      "feedback": "Feedback",
    },
    "hi": {
      "lead_qualification_hindi": "Lead Qualification (Hindi)",
      "feedback_hindi": "Feedback (Hindi)",
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
      
      <div className="w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Experience the <span className="text-primary">Power</span> of AI</h2>
          <p className="text-xl text-muted-foreground">Try our AI call agent in action - no signup required</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-background to-muted/20 border border-border/50 rounded-2xl p-1 max-w-2xl mx-auto"
          whileHover={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-background rounded-xl p-6">
            <div className="flex items-center justify-center h-80 relative">
              <AnimatePresence mode="wait">
                {!isCalling ? (
                  <motion.div 
                    key="start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center gap-10 w-full"
                  >
                    <motion.div 
                      className="w-full max-w-xs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Select onValueChange={setSelectedAssistant} value={selectedAssistant}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Assistant"  />
                        </SelectTrigger>
                        <SelectContent >
                          <SelectGroup>
                            <SelectLabel>English</SelectLabel>
                            {Object.entries(assistants.en).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Hindi</SelectLabel>
                            {Object.entries(assistants.hi).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Input 
                        type="text" 
                        placeholder="Enter your phone number" 
                        className="text-lg py-4 my-4"
                      />
                    </motion.div>
                    
                    <motion.button
                      key="start-circle"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center relative overflow-hidden outline-none focus:ring-2 focus:ring-primary/50"
                      onClick={startCall}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      ) : (
                        <>
                          <motion.div 
                            className="absolute w-full h-full rounded-full border-2 border-primary/30"
                            animate={{ 
                              scale: [1, 1.1, 1], 
                              opacity: [1, 0.5, 1] 
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                          />
                          <motion.div 
                            className="absolute w-full h-full rounded-full border border-primary/20"
                            animate={{ 
                              scale: [1, 1.2, 1], 
                              opacity: [1, 0.3, 1] 
                            }}
                            transition={{ 
                              duration: 2.5, 
                              repeat: Infinity, 
                              ease: "easeInOut", 
                              delay: 0.2 
                            }}
                          />
                          <div className="z-10 flex flex-col items-center justify-center">
                            <Phone className="w-8 h-8 text-primary mb-2" />
                            <span className="font-medium text-primary text-lg cursor-pointer">Start Demo</span>
                          </div>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                ) : (
                  <p>you will have receive a call from our AI call agent</p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-6">Ready to implement this in your business?</p>
          <Button size="lg" className="cursor-pointer" onClick={() => window.location.href = "#contact"}>
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}