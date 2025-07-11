import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Platform Optimization",
    description: "How we helped an online retailer automate thier customer support.",
    category: "E-commerce",
    url: "https://medium.com/@smitgol007/from-order-updates-to-instant-refunds-ai-voice-agents-in-action-0b3f7cfccf18"
  },
  {
    id: 2,
    title: "Order Tracking Calls",
    description: "How we helped an online retailer automate thier order tracking calls.",
    category: "E-commerce and D2C",
    url: "https://medium.com/@smitgol007/case-study-automating-order-tracking-calls-in-ecommerce-d2c-with-ai-voice-agents-b390232b5a9f"
  },
  {
    id: 3,
    title: "Return & Refund Requests",
    description: "How we helped an online retailer automate thier return & refund requests.",
    category: "E-commerce and D2C",
    url: "https://medium.com/@smitgol007/case-study-automating-return-refund-requests-in-ecommerce-with-ai-voice-agents-37fceb3d018a"
  }
]

export default function CaseStudiesPreview() {
  return (
    <section id="case-studies" className="py-16 mt-16">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Case Studies</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {"Explore our success stories and see how we've helped businesses grow"}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Card key={study.id} className="flex flex-col h-full transition-all hover:shadow-lg">
              <CardHeader>
                <span className="text-sm font-medium text-primary">{study.category}</span>
                <CardTitle className="text-xl">{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  {study.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0" asChild>
                  <Link href={study.url} target="_blank">
                    Read case study →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
