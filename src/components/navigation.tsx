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
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    //{ name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full mx-auto ${isScrolled ? 'bg-background/90 shadow-sm' : 'bg-background/80'} backdrop-blur-md`}
    >
      <div className="container mx-auto py-4 flex flex-col justify-center md:max-w-[80%] max-w-[90%] gap-4 sm:gap-8">
        <div className={`flex items-center justify-between w-full flex`}>
          {/* Logo */}
          <div className="w-full flex justify-between">
            
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
              Vooicia
            </span>
          </Link>
          <button 
            className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground transition-colors md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Button className="ml-4 font-bold cursor-pointer hover:scale-105 transition delay-200 duration-300 ease-in-out" onClick={() => router.push("#demo")}>
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
                  className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                className="w-full mt-2 cursor-pointer"
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
