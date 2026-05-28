"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
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
    { name: "Features", href: "/#features" },
    { name: "How We Work", href: "/#how-it-works" },
    { name: "Case studies", href: "/case-studies" },
  ]

  const handleTryNow = () => {
    if (typeof window === "undefined") return
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      window.dispatchEvent(new CustomEvent("voycia:start-talk"))
    } else {
      router.push("/?talk=1")
    }
  }

  return (
    <header
      className={`fixed w-4/5 md:w-1/2 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled
          ? "top-4 w-1/2 bg-background/40 dark:bg-background/30 backdrop-blur-md shadow-sm dark:shadow-black/40 rounded-4xl border border-border/40"
          : "top-2 w-full md:w-4/5 bg-background/80 dark:bg-background/70 backdrop-blur-sm border border-transparent"
      }`}
    >
      <div className="container mx-auto py-1.5 px-6 flex flex-col justify-center gap-1 sm:gap-2">
        <div className={`flex items-center justify-between w-full`}>
          {/* Logo */}
          <div className="flex justify-between w-full md:w-auto items-center">
            <Logo size="sm" />
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="p-1.5 rounded-md text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground hover:bg-accent hover:rounded-lg p-2 px-3 transition-colors font-medium hover:delay-600 hover:duration-300 hover:ease-in-out"
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <Button
              className="ml-2 font-bold cursor-pointer hover:scale-105 transition delay-200 duration-300 ease-in-out rounded-4xl px-4 py-2"
              onClick={handleTryNow}
            >
              Try Now
            </Button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium hover:delay-600 hover:duration-300 hover:ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                className="w-full mt-2 cursor-pointer rounded-4xl px-4 py-2"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleTryNow()
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
