import { lazy } from "react"

const Hero = lazy(() => import("../components/sections/hero"))
const Features = lazy(() => import("@/components/sections/features"))
const Demo = lazy(() => import("@/components/sections/demo"))
const Contact = lazy(() => import("@/components/sections/contact"))
const Footer = lazy(() => import("@/components/footer"))

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <section id="features" className="scroll-mt-20">
          <Features />
        </section>
        <section id="demo" className="scroll-mt-20">
          <Demo />
        </section>
        {/*<section id="testimonials" className="scroll-mt-20">
          <Testimonials />
        </section>*/}
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
