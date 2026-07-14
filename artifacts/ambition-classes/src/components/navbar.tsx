import { Link, useLocation } from "wouter";
import { BookOpen, GraduationCap, MapPin, Menu, Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Study Notes" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-emerald group-hover:glow-emerald-hover transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none text-white">
                Ambition Classes
              </span>
              <span className="text-xs text-primary font-medium tracking-wide">
                By Amit Sir
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  location === link.href ? "text-primary" : "text-white/80"
                )}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary glow-emerald rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary/50 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Contact CTA (Desktop) */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-medium text-sm hover:bg-primary hover:text-primary-foreground glow-emerald-hover transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 absolute top-full left-0 w-full animate-in slide-in-from-top-2">
          <nav className="flex flex-col px-4 py-6 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium px-4 py-2 rounded-lg transition-colors",
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-white/80 hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Join Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
