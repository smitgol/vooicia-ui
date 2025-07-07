"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowRight } from "lucide-react"
import { useState, useRef } from "react"
/**
 * Renders the interactive hero section for the landing page, featuring animated gradients, mouse-tracking effects, and product highlights.
 *
 * The section includes a dynamic blurred gradient that follows the user's cursor, animated decorative dots, a promotional badge, a headline, a description, a call-to-action button that navigates to the demo section, and a list of key product features.
 */
export default function Hero() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  
  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[90vh] flex items-center w-full bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50" onMouseMove={handleMouseMove}>
      <div
        className="pointer-events-none absolute w-80 h-80 rounded-full bg-gradient-to-br from-violet-300 to-purple-300 opacity-20 blur-3xl transition-transform duration-100"
        style={{
          left: position.x - 100,
          top: position.y - 100,
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse hover:scale-150 hover:animate-ping transition-all duration-300 cursor-pointer" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse delay-300 hover:scale-200 hover:animate-bounce transition-all duration-300 cursor-pointer" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse delay-700 hover:scale-150 hover:animate-spin transition-all duration-300 cursor-pointer" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse delay-1000 hover:scale-150 hover:animate-pulse transition-all duration-300 cursor-pointer" />
      </div>
          
      <div className="container relative z-10 px-4 mx-auto flex flex-col items-center justify-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-100 via-purple-100 to-indigo-100 rounded-full border border-violet-200 mb-8 shadow-md shadow-violet-200/50 hover:shadow-violet-300/70 hover:scale-105 hover:border-violet-300 hover:from-violet-200 hover:via-purple-200 hover:to-indigo-200 transition-all duration-300 cursor-pointer group/badge">
            <Sparkles className="w-4 h-4 mr-2 text-violet-600 group-hover/badge:animate-spin group-hover/badge:text-violet-700 transition-all duration-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent group-hover/badge:from-violet-800 group-hover/badge:to-purple-800">Next-Gen AI Customer Service</span>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text bg-[linear-gradient(93deg,#6A1BE0_80%,#FFAEA5_102%)] text-transparent"><span className="text-gray-800">Automate Your Customer Service with </span><span className="">AI Voice Agents</span></span> 
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Answer customer calls 24/7, reduce wait time, and boost satisfaction.All with our intelligent voice agent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-bold cursor-pointer text-lg px-8 py-6 transition-all duration-600 hover:shadow-violet-500/40 hover:-translate-y-1" onClick={() => router.push("#demo")}>
              Try Now  <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

          </div>
            
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-3 md:gap-6 text-muted-foreground w-[65%] mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Integrate with AI workflow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Multilingual Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>Easy Customization</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
