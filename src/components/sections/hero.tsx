"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Hero() {
  const phrases = ["Lead qualification", "HR interview", "feedback"]
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % phrases.length)
    }, 3000) // Change phrase every 3 seconds
    
    return () => clearInterval(interval)
  }, [])
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">AI Voice Agent For</span> 
            <br />
            <div className="h-[1.25em] overflow-hidden relative gradient-text">
              <AnimatePresence mode="sync">
                <motion.span 
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 gradient-text"
                >
                {phrases[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div> 
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          From lead qualification to follow-ups,  our AI does the heavy lifting in multi language.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-bold cursor-pointer text-lg px-8 py-6 hover:from-purple-700 hover:to-blue-800 transition-all">
              Try It Now - It's Free
            </Button>

          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Integrate with AI workflow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Multilingual Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>Easy Customization</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
