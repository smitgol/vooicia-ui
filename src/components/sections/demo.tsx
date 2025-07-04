"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, MessageSquare, Mic, Zap } from "lucide-react"

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
];

const VoiceWave = ({ isActive }: { isActive: boolean }) => {
  const bars = Array(5).fill(0);
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      const animateBars = async () => {
        while (isActive) {
          await controls.start({
            scaleY: [1, 1.5, 1],
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }
          });
        }
      };
      animateBars();
    } else {
      controls.stop();
    }
  }, [isActive, controls]);

  return (
    <div className="flex items-end h-12 gap-1">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
          style={{ height: `${20 + Math.random() * 30}%` }}
          animate={isActive ? controls : { scaleY: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
};

export default function Demo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(ASSISTANTS[0].id);

  //states to handle assistant
  const [rtviClient, setRtviClient] = useState<RTVIClient | null>(null);
  const botAudioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    const botAudio = document.createElement('audio');
    botAudio.autoplay = true;
    botAudioRef.current = botAudio;
    document.body.appendChild(botAudio);
  }, [])

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
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

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
    setIsProcessing(true);
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
            setIsRecording(true);
            setIsProcessing(false);
          },
          onDisconnected: () => {
            setIsRecording(false);
            setIsProcessing(false);
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
            setIsProcessing(false);
          },
          onError: (error) => {
            console.error('Error:', error);
            setIsProcessing(false);
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
      setIsProcessing(false);
    }
  }

  const disconnectAssistant = async () => {
    console.log('Disconnecting from assistant...');
    setIsProcessing(true);
    try {
      await rtviClient?.disconnect();
      setRtviClient(null);
      console.log('Bot audio srcObject', botAudioRef.current?.srcObject)
      if (botAudioRef.current?.srcObject && "getAudioTracks" in botAudioRef.current.srcObject) {
        botAudioRef.current.srcObject.getAudioTracks().forEach((track) => track.stop())
        botAudioRef.current.srcObject = null;
      }
      setIsRecording(false);
      setIsProcessing(false);
    } catch (error) {
      console.error('Disconnection error:', error);
      setIsProcessing(false);
    }
  }

  return (
    <section className="relative pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block px-4 py-2 text-sm font-medium bg-violet-100 text-violet-600 rounded-full mb-4">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              AI Voice Assistant Demo
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Experience the Future of Voice AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interact with our AI assistant using natural voice commands. Try it out below!
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto my-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="overflow-hidden shadow-none md:max-w-sm max-w-md mx-auto border-0">
            <CardContent className="pt-8 pb-12">
              <div className="flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAssistant}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full mb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                        {ASSISTANTS.map((assistant) => (
                          <motion.div
                            key={assistant.id}
                            className={cn(
                              "relative p-4 rounded-lg border cursor-pointer transition-all duration-200",
                              selectedAssistant === assistant.id
                                ? "border-primary/30 bg-primary/2"
                                : "border-border/40 hover:border-border/60 hover:bg-accent/30"
                            )}
                            onClick={() => setSelectedAssistant(assistant.id)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                                  `bg-violet-500`
                                )}
                              >
                                {assistant.icon}
                              </div>
                              <div className="text-left">
                                <h4 className="font-medium text-foreground">
                                  {assistant.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {assistant.language === 'hi' ? 'हिंदी' : 'English'}
                                </p>
                              </div>
                            </div>
                            {selectedAssistant === assistant.id && (
                              <div className="absolute top-2 right-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Voice Wave Visualization */}
                    <div className="w-full flex justify-center h-16">
                      {isRecording && (
                        <VoiceWave isActive={isRecording} />
                      )}
                    </div>

                    {/* Record Button */}
                    <motion.button
                      onClick={isRecording ? disconnectAssistant : connectToAssistant}
                      disabled={isProcessing}
                      className={cn(
                        "relative flex items-center justify-center w-20 h-20 rounded-full text-white shadow-lg transition-all duration-300 cursor-pointer",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-background",
                        isProcessing ? "bg-violet-400 cursor-not-allowed" : "bg-violet-500 hover:bg-violet-600",
                        isRecording ? "animate-pulse" : ""
                      )}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover={!isProcessing ? "hover" : undefined}
                      whileTap={!isProcessing ? "tap" : undefined}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : isRecording ? (
                        <div className="w-6 h-6 bg-white rounded-sm"></div>
                      ) : (
                        <Mic className="w-8 h-8 my-0"/>
                      )}
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}