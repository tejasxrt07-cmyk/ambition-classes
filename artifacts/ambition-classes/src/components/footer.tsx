import { Link } from "wouter";
import { GraduationCap, MapPin, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent glow-emerald" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-emerald">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-none text-white">
                  Ambition Classes
                </span>
                <span className="text-xs text-primary font-medium tracking-wide">
                  By Amit Sir
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Premier coaching institute in Bihariganj, dedicated to shaping futures and building strong academic foundations for Classes 8-10.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/60 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-primary transition-colors text-sm">
                  About Amit Sir
                </Link>
              </li>
              <li>
                <Link href="/notes" className="text-white/60 hover:text-primary transition-colors text-sm">
                  Study Notes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Connect With Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Station Road, Bihariganj,<br />Madhepura, Bihar, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:9801435867" className="hover:text-white transition-colors">+91 98014 35867</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <a href="https://wa.me/919801435867" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Ambition Classes. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Guided by Amit Sir
          </p>
        </div>
      </div>
    </footer>
  );
}
