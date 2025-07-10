"use client"
import { Button } from "@/components/ui/button"
import { Sparkles, Mic, MessageSquare } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Custom button component that supports Framer Motion props
const AnimatedButton = motion(Button);
import {
  RTVIClient,
  RTVIClientOptions,
  RTVIEvent,
} from '@pipecat-ai/client-js';
import {
  WebSocketTransport
} from "@pipecat-ai/websocket-transport";
import { getPromptById } from "@/prompts/demoPrompts";

interface Assistant {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  language: string;
}

const ASSISTANTS: Assistant[] = [
  {
    id: "customer_support",
    name: "Customer Support",
    description: "24/7 AI customer support assistant",
    icon: <MessageSquare className="w-5 h-5 text-white" />,
    color: "from-violet-300 to-violet-500",
    language: "en"
  },
];/**
 * Renders the interactive hero section for the landing page, featuring animated gradients, mouse-tracking effects, and product highlights.
 *
 * The section includes a dynamic blurred gradient that follows the user's cursor, animated decorative dots, a promotional badge, a headline, a description, a call-to-action button that navigates to the demo section, and a list of key product features.
 */
export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [connecting, setConnecting] = useState(false);

  //states to handle assistant
  const [rtviClient, setRtviClient] = useState<RTVIClient | null>(null);
  const botAudioRef = useRef<HTMLAudioElement | null>(null);
  const selectedAssistant= ASSISTANTS[0].id;
  const [isRecording, setIsRecording] = useState(false);
  const [ripple, setRipple] = useState<{x: number, y: number, id: number}[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    setRipple(prev => [...prev, newRipple]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipple(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };
  

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const startDemo = () => {
    connectToAssistant();
  }
  useEffect(() => {
      const botAudio = document.createElement('audio');
      botAudio.autoplay = true;
      botAudioRef.current = botAudio;
      document.body.appendChild(botAudio);
    }, []);

  
  const setUpMediaTracks = () => {
    const tracks = rtviClient?.tracks();
    if (tracks?.bot?.audio) {
      setupAudioTrack(tracks.bot.audio);
    }
  }

  const setupTrackListeners = () => {
    if (!rtviClient) return;
    rtviClient.on(RTVIEvent.TrackStarted, (track, participant) => {
      // Only handle non-local (bot) tracks
      if (!participant?.local && track.kind === 'audio') {
        setupAudioTrack(track);
      }
    });
  }
  
  const setupAudioTrack = (track: MediaStreamTrack) => {
    console.log('Setting up audio track', track)
    if (!botAudioRef.current) return;
    if (botAudioRef.current.srcObject && "getAudioTracks" in botAudioRef.current.srcObject) {
      const oldTrack = botAudioRef.current.srcObject.getAudioTracks()[0];
      if (oldTrack?.id === track.id) return;
    }
    botAudioRef.current.srcObject = new MediaStream([track]);
  }
  
  const connectToAssistant = async () => {
    setConnecting(true);
    const prompt = getPromptById(selectedAssistant);
    try {
      const transport = new WebSocketTransport();
      const RTVIConfig: RTVIClientOptions = {
        transport,
        params: {
          baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
          endpoints: { connect: "/create_voice_assistant_session" },
          requestData: {
            prompt: prompt?.content,
            language: prompt?.language,
            voice_id: prompt?.voice_id,
            initial_message: prompt?.initial_message,
          }
        },
        enableMic: true,
        enableCam: false,
        callbacks: {
          onConnected: () => {
            setConnecting(false);
            setIsRecording(true);
          },
          onDisconnected: () => {
            setConnecting(false);
            setIsRecording(false);
          },
          onBotReady: (data) => {
            console.log('Bot ready', data);
            setUpMediaTracks();
          },
          onUserTranscript: (data) => {
            if (data.final) {
              console.log(`User: ${data.text}`);
            }
          },
          onBotTranscript: (data) => console.log(`Bot: ${data.text}`),
          onMessageError: (error) => {
            console.error('Message error:', error);
            setConnecting(false);
          },
          onError: (error) => {
            console.error('Error:', error);
            setConnecting(false);
          },
        },
      };
      const client = new RTVIClient(RTVIConfig);
      setupTrackListeners();
      await client.initDevices();
      await client.connect();
      setRtviClient(client);
    } catch (error) {
      console.error('Connection error:', error);
      setConnecting(false);
    }
  }
  
  const disconnectAssistant = async () => {
    console.log('Disconnecting from assistant...');
    setConnecting(true);
    try {
      await rtviClient?.disconnect();
      setRtviClient(null);
      setIsRecording(false);
      if (botAudioRef.current?.srcObject && "getAudioTracks" in botAudioRef.current.srcObject) {
        botAudioRef.current.srcObject.getAudioTracks().forEach((track) => track.stop())
        botAudioRef.current.srcObject = null;
      }
      setConnecting(false);
    } catch (error) {
      console.error('Disconnection error:', error);
      setConnecting(false);
    }
  }

  
  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[90vh] flex items-center w-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100" onMouseMove={handleMouseMove}>
      <div
        className="pointer-events-none absolute w-80 h-80 rounded-full bg-gradient-to-br from-amber-300 to-orange-300 opacity-20 blur-3xl transition-transform duration-100"
        style={{
          left: position.x - 100,
          top: position.y - 100,
        }}
      />
      <div className="absolute inset-0 transition duration-500 opacity-50" 
      style={{backgroundImage: "linear-gradient(90deg, rgb(253, 186, 116) 0%, rgb(251, 146, 60) 71.42%), url(assets/header/bg-grid.svg), url(assets/header/bg-grid.svg)", 
        backgroundSize: 'contain',
        backgroundBlendMode: 'overlay',
        maskImage: `radial-gradient(300px 350px at ${position.x}px ${position.y}px, rgb(255, 255, 255), 40%, transparent)`}}></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse hover:scale-150 hover:animate-ping transition-all duration-300 cursor-pointer" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-pulse delay-300 hover:scale-200 hover:animate-bounce transition-all duration-300 cursor-pointer" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse delay-700 hover:scale-150 hover:animate-spin transition-all duration-300 cursor-pointer" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse delay-1000 hover:scale-150 hover:animate-pulse transition-all duration-300 cursor-pointer" />
      </div>
          
      <div className="container relative z-10 px-4 mx-auto flex flex-col items-center justify-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 rounded-full border border-amber-200 mb-8 shadow-md shadow-amber-200/50 hover:shadow-amber-300/70 hover:scale-105 hover:border-amber-300 hover:from-amber-200 hover:via-orange-200 hover:to-amber-100 transition-all duration-300 cursor-pointer group/badge">
            <Sparkles className="w-4 h-4 mr-2 text-amber-600 group-hover/badge:animate-spin group-hover/badge:text-amber-700 transition-all duration-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent group-hover/badge:from-amber-800 group-hover/badge:to-orange-800">Next-Gen AI Customer Service</span>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text bg-[linear-gradient(93deg,#F59E0B_0%,#EA580C_80%)] text-transparent"><span className="text-gray-800">Automate Your Customer Service with </span><span className="">AI Voice Agents</span></span> 
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Answer customer calls 24/7, reduce wait time, and boost satisfaction. All with our intelligent voice agent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton 
              ref={buttonRef}
              size="lg" 
              className="font-bold cursor-pointer text-lg px-8 py-6 transition-all duration-600 hover:shadow-amber-500/40 relative overflow-hidden w-64 group" 
              onClick={(e) => {
                handleRipple(e);
                if (isRecording) {
                  disconnectAssistant();
                } else if (!connecting) {
                  startDemo();
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence>
                {ripple.map(({ x, y, id }) => (
                  <motion.span
                    key={id}
                    className="absolute rounded-full bg-white/20"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{
                      width: 400,
                      height: 400,
                      opacity: 0,
                      x: x - 200,
                      y: y - 200,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                ))}
              </AnimatePresence>
              
              {connecting ? (
                <span className="typing-animation">Just a Sec...</span>
              ) : isRecording ? (
                <>
                  Stop Talking
                  <div className="flex items-center ml-2 space-x-1">
                    <span className="sound-wave">
                      <span className="sound-wave-bar"></span>
                      <span className="sound-wave-bar"></span>
                      <span className="sound-wave-bar"></span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  Talk to Assistant <Mic className="w-4 h-4 ml-2" />
                </>
              )}

              <style jsx>{`
                @keyframes typing {
                  from { width: 0 }
                  to { width: 100% }
                }
                .typing-animation {
                  display: inline-block;
                  overflow: hidden;
                  white-space: nowrap;
                  border-right: 2px solid;
                  animation: 
                    typing 1.8s steps(12, end) forwards,
                    blink-caret 0.75s step-end infinite;
                }
                @keyframes blink-caret {
                  from, to { border-color: transparent }
                  50% { border-color: currentColor; }
                }
                .sound-wave {
                  display: flex;
                  align-items: center;
                  height: 20px;
                  gap: 3px;
                }
                .sound-wave-bar {
                  display: inline-block;
                  width: 2px;
                  height: 6px;
                  background-color: currentColor;
                  border-radius: 1px;
                  animation: sound-wave-animation 1.5s ease-in-out infinite both;
                }
                .sound-wave-bar:nth-child(1) {
                  animation-delay: 0s;
                }
                .sound-wave-bar:nth-child(2) {
                  animation-delay: 0.2s;
                  height: 12px;
                }
                .sound-wave-bar:nth-child(3) {
                  animation-delay: 0.4s;
                  height: 8px;
                }
                @keyframes sound-wave-animation {
                  0%, 100% {
                    transform: scaleY(0.8);
                    opacity: 0.6;
                  }
                  50% {
                    transform: scaleY(1.5);
                    opacity: 1;
                  }
                }
              `}</style>
            </AnimatedButton>
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
