import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our <span className="gradient-text">Clients</span> Say</h2>
          <p className="text-xl text-muted-foreground">Trusted by businesses across India to handle their customer communications</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all">
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
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl mb-6">Join the growing list of businesses transforming their customer service</p>
          <Button className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  )
}
