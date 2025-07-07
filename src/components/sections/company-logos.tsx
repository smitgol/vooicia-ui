"use client";
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../ui/button";

const companies = [
  { name: "Replay", logo: "https://reply.io/wp-content/uploads/logo-2.svg" },
  { name: "PillowCube", logo: "https://www.pillowcube.com/cdn/shop/files/logo_2_340x.png" },
  { name: "Wild", logo: "data:image/png;base64,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" },
  { name: "LOOkFANTASTIC", logo: "https://cdn.gymshark.com/images/branding/gs-icon-text.svg" },
]

export default function CompanyLogos() {
  const router = useRouter()

  return (
    <section className="pt-0 md:pt-20 overflow-hidden max-w-5xl md:max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2 md:mb-16">
          <h2 className="text-4xl font-bold mb-0">Our <span className="text-primary">Clients</span></h2>
        </div>

        {/* Continuous marquee animation from left to right */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex space-x-12 items-center"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {companies.map((company, index) => (
              <div key={index} className="flex items-center justify-center w-32 h-32 md:w-48 md:h-48">
                <div className="relative w-full h-full group">
                  <div className="relative w-full h-full ">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-2 md:mt-16 text-center">
          <p className="text-xl mb-6">Join the growing list of businesses transforming their customer service</p>
          <Button
            size="lg"
            className=""
            onClick={() => router.push("#contact")}
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  )
}
