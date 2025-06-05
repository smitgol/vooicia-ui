import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "24/7 Availability",
    description: "Never miss a customer call, even outside business hours. Our AI is always ready to assist.",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Multilingual Support",
    description: "Communicate with customers in their preferred language with support for multiple Indian languages.",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing CRM, helpdesk, or business tools.",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Real-time Analytics",
    description: "Gain valuable insights with detailed call analytics and customer interaction reports.",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Customizable Responses",
    description: "Tailor the AI's responses to match your brand voice and business requirements.",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Compliance & Data Security",
    description: "Built with privacy and regulatory standards in mind for Indian businesses.",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />
  }
]

export default function Features() {
  return (
    <section className="py-20">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for <span className="text-primary">Seamless</span> Communication</h2>
          <p className="text-xl text-muted-foreground">Everything you need to transform your customer support and sales calls</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="md:py-6 py-3 md:gap-6 gap-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center md:mb-4 mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
