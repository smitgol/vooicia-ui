"use client"

import { cn } from "@/lib/utils"
import { Check, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const pricingPlans = [
  {
    name: 'Basic',
    price: 99,
    description: 'Perfect for small businesses getting started with AI voice assistance',
    features: [
      '900 mins(0.11$/min)',
      'Human handoff system',
      'Standard voice options',
      'Knowledge base integration',
      'CRM Integration',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Advanced',
    price: 299,
    description: 'For growing businesses with more complex needs',
    features: [
      '3,200 mins(0.09$/min)',
      'Custom voice options',
      'Advanced analytics dashboard',
      'Everything in Basic',
    ],
    popular: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 399,
    description: 'Tailored solutions for large organizations',
    features: [
      '5,000 mins(0.0798$/min)',
      'Custom call routing',
      'Everything in Advanced',
    ],
    popular: true,
    cta: 'Contact Sales',
  },
]

export default function Pricing() {
    const router = useRouter()
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-medium bg-violet-100 text-violet-600 rounded-full mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative flex flex-col p-8 rounded-2xl border border-gray-200",
                plan.popular 
                  ? "border-2 border-violet-500 shadow-xl scale-[1.03] bg-gradient-to-b from-white to-violet-50" 
                  : "hover:shadow-lg hover:border-violet-200 transition-all duration-300"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-medium text-white bg-violet-500 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                    </span>
                    {typeof plan.price === 'number' && (
                      <span className="text-gray-500">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">+ $399 one-time setup fee</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                size="lg" 
                className={cn(
                  "w-full mt-auto",
                  plan.popular 
                    ? "bg-violet-600 hover:bg-violet-700 text-white" 
                    : "bg-white text-violet-600 border border-violet-200 hover:bg-violet-50"
                )}
                onClick={() => router.push("#contact")}
              >
                {plan.cta}
                {plan.popular && <Zap className="w-4 h-4 ml-2 fill-current" />}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need something custom?</p>
          <Button variant="outline" className="border-violet-200 text-violet-600 hover:bg-violet-50">
            Contact our sales team
          </Button>
        </div>
      </div>
    </section>
  )
}
