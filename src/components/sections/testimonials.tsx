"use client";
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from 'react'
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechSolutions India",
    content: "The AI call agent has transformed our customer support. Response times are down by 70% and customer satisfaction is at an all-time high.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Operations Manager, ShopEasy",
    content: "Multilingual support was a game-changer for our business. Now we can serve customers across India in their preferred language.",
    rating: 5
  },
  {
    name: "Arjun Mehta",
    role: "Founder, HealthPlus",
    content: "The 24/7 availability ensures we never miss an important call, even during odd hours. The AI handles routine queries efficiently.",
    rating: 4
  },
  {
    name: "Sachin",
    role: "Founder, HealthPlus",
    content: "The 24/7 availability ensures we never miss an important call, even during odd hours. The AI handles routine queries efficiently.",
    rating: 4
  }
]

export default function Testimonials() {
  const router = useRouter()  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our <span className="text-violet-500">Clients</span> Say</h2>
          <p className="text-xl text-muted-foreground">Trusted by businesses across India to handle their customer communications</p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.333rem)] px-2">
                  <div className="h-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="flex justify-center mt-8 gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl mb-6">Join the growing list of businesses transforming their customer service</p>
          <Button className="px-8 py-6 text-lg bg-violet-500 hover:bg-violet-600" onClick={() => router.push("#contact")}>
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  )
}
