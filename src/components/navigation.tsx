"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navigation() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "Case studies", href: "/case-studies" },
  ]

  return (
    <header 
      className={`fixed w-4/5 md:w-1/2 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'top-4 w-1/2 bg-transparent backdrop-blur-md shadow-sm rounded-4xl' : 'top-2 w-full md:w-4/5 bg-white/80 backdrop-blur-sm'}`}
    >
      <div className="container mx-auto py-1.5 px-6 flex flex-col justify-center gap-1 sm:gap-2">
        <div className={`flex items-center justify-between w-full`}>
          {/* Logo */}
          <div className="flex justify-between">
            
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Voocia
            </span>
          </Link>
          <button 
            className="p-1.5 rounded-md text-foreground/80 hover:text-foreground transition-colors md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          </div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-foreground hover:bg-gray-200 hover:rounded-lg p-2 px-3 transition-colors font-medium hover:delay-600 hover:duration-300 hover:ease-in-out"
              >
                {link.name}
              </Link>
            ))}
            <Button className="ml-4 font-bold cursor-pointer hover:scale-105 transition delay-200 duration-300 ease-in-out rounded-4xl px-4 py-2" onClick={() => router.push("#demo")}>
              Try Now
            </Button>
          </nav>

          {/* Mobile menu button */}
          
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-gray-600 hover:text-foreground transition-colors font-medium hover:delay-600 hover:duration-300 hover:ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                className="w-full mt-2 cursor-pointer rounded-4xl px-4 py-2"
                onClick={() => {
                  setIsMenuOpen(false)
                  router.push("#demo")
                }}
              >
                Try Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
