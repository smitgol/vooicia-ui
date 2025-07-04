import { lazy } from "react"
import Link from "next/link"

const Hero = lazy(() => import("../components/sections/hero"))
const Features = lazy(() => import("@/components/sections/features"))
const Demo = lazy(() => import("@/components/sections/demo"))
const Contact = lazy(() => import("@/components/sections/contact"))
const Footer = lazy(() => import("@/components/footer"))
const Testimonials = lazy(() => import("@/components/sections/testimonials"))
const HowItWorks = lazy(() => import("@/components/sections/how-it-works"))
const CompanyLogos = lazy(() => import("@/components/sections/company-logos"))
const Pricing = lazy(() => import("@/components/sections/pricing"))
export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <section id="features" className="scroll-mt-20">
          <Features />
        </section>
        <section id="how-it-works" className="scroll-mt-20">
          <HowItWorks />
        </section>
        <section id="demo" className="scroll-mt-20">
          <Demo />
        </section>
        <section id="testimonials" className="scroll-mt-20">
          <CompanyLogos />
        </section>
        <section id="pricing" className="scroll-mt-20">
          <Pricing />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
