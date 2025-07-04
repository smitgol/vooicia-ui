"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Languages, GitMerge, BarChart3, MessageSquareText, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "24/7 Availability",
    description: "Never miss a customer call, even outside business hours. Our AI is always ready to assist.",
    icon: <Clock className="w-6 h-6 text-violet-500" />
  },
  {
    title: "Multilingual Support",
    description: "Communicate with customers in their preferred language with support for multiple Indian languages.",
    icon: <Languages className="w-6 h-6 text-violet-500" />
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing CRM, helpdesk, or business tools.",
    icon: <GitMerge className="w-6 h-6 text-violet-500" />
  },
  {
    title: "Real-time Analytics",
    description: "Gain valuable insights with detailed call analytics and customer interaction reports.",
    icon: <BarChart3 className="w-6 h-6 text-violet-500" />
  },
  {
    title: "Customizable Responses",
    description: "Tailor the AI's responses to match your brand voice and business requirements.",
    icon: <MessageSquareText className="w-6 h-6 text-violet-500" />
  },
  {
    title: "Compliance & Data Security",
    description: "Built with privacy and regulatory standards in mind for Indian businesses.",
    icon: <ShieldCheck className="w-6 h-6 text-violet-500" />
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-2 text-sm font-medium bg-violet-100 text-violet-600 rounded-full mb-4">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Everything You Need to Transform Your Business
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed to enhance your customer communication and drive business growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-violet-200 hover:-translate-y-1 gap-2">
                <CardHeader className="pb-1">
                  <div className="w-14 h-14 rounded-xl bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground/90">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
