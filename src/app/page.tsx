
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Demo } from "@/components/sections/demo"
//import { Testimonials } from "@/components/sections/testimonials"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"



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
