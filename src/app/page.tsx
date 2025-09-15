import { lazy } from "react"

const Hero = lazy(() => import("../components/sections/hero"))
const Features = lazy(() => import("@/components/sections/features"))
//const Demo = lazy(() => import("@/components/sections/demo"))
const Contact = lazy(() => import("@/components/sections/contact"))
const Footer = lazy(() => import("@/components/footer"))
const HowItWorks = lazy(() => import("@/components/sections/how-it-works"))
const CaseStudiesPreview = lazy(() => import("@/components/sections/case-studies-preview"))
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
        {/*<section id="demo" className="scroll-mt-20">
          <Demo />
        </section>*/}
        <section id="case-studies" className="scroll-mt-20">
          <CaseStudiesPreview />
        </section>

        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
