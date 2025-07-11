"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string
  imageAlt: string
  readTime: string
  date: string
  category: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Case Study: Automating Ecommerce Support with AI Voice Agents",
    description: "Learn how AI voice agents can transform your business with real-world examples, from automated order confirmations to instant refund processing and beyond.",
    url: "https://medium.com/@smitgol007/from-order-updates-to-instant-refunds-ai-voice-agents-in-action-0b3f7cfccf18",
    imageUrl: "/images/blog_1_thumb.png",
    imageAlt: "AI Voice Agent in Action",
    readTime: "5 min read",
    date: "July 3, 2025",
    category: "AI Voice Agents"
  },
  {
    id: "2",
    title: "Case Study: Automating Order Tracking Calls in ECommerce & D2C with AI Voice Agents",
    description: "Learn how AI voice agents can automate order tracking calls in eCommerce & D2C with AI voice agents.",
    url: "https://medium.com/@smitgol007/case-study-automating-order-tracking-calls-in-ecommerce-d2c-with-ai-voice-agents-b390232b5a9f",
    imageUrl: "/images/blog_2_thumb.png",
    imageAlt: "AI Voice Agent in Action",
    readTime: "5 min read",
    date: "July 5, 2025",
    category: "AI Voice Agents"
  },
  {
    id: "3",
    title: "Case Study: Automating Return & Refund Requests in eCommerce with AI Voice Agents",
    description: "Learn how AI voice agents can automate return & refund requests in eCommerce & D2C with AI voice agents.",
    url: "https://medium.com/@smitgol007/case-study-automating-return-refund-requests-in-ecommerce-with-ai-voice-agents-37fceb3d018a",
    imageUrl: "/images/blog_3_thumb.png",
    imageAlt: "AI Voice Agent in Action",
    readTime: "5 min read",
    date: "July 6, 2025",
    category: "AI Voice Agents"
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function Blog() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4">
            Our Case Studies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the case studies of our platform and the AI industry.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card className="group pt-0 h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800/50 transition-all duration-300 cursor-pointer border-0 shadow-none hover:rounded-xl hover:shadow-none" onClick={() => window.open(post.url, '_blank')}>
                <div className="relative h-56 w-full overflow-hidden rounded-xl">
                  <Image 
                    width={500}
                    height={500}
                    src={post.imageUrl} 
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 hover:-translate-y-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col py-6 px-2">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <CardTitle className="text-xl font-bold leading-snug tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link 
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors"
                    >
                      Read full article
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link 
            href="#" 
            className={cn(
              "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-primary to-primary/90",
              "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            )}
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
