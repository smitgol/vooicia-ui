import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How it works", href: "#how-it-works" },
        { name: "Demo", href: "#demo" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Case Studies", href: "case-studies" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },  
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ]

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-md md:max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Mobile: Hidden, will be shown after links */}
          <div className="lg:col-span-2 space-y-4 hidden lg:block">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Voycia
              </span>
            </Link>
            <p className="text-muted-foreground">
              Revolutionizing customer service with AI-powered call agents for businesses. 
              Available 24/7 with multilingual support.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Mobile: Show logo and description after links */}
          <div className="col-span-2 lg:hidden space-y-4 pt-8 border-t border-border/50 mt-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Voycia
              </span>
            </Link>
            <p className="text-muted-foreground">
              Revolutionizing customer service with AI-powered call agents for businesses. 
              Available 24/7 with multilingual support.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Voycia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
