import { Link } from "wouter";
import { PublicLayout } from "@/components/public-layout";
import { ArrowRight, BookOpen, GraduationCap, Users, Trophy } from "lucide-react";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-medium tracking-wide uppercase">Admissions Open for 2024-25</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              Shape Your Future With <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 glow-emerald-text">Ambition Classes</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              Premier coaching institute in Bihariganj under the expert guidance of Amit Sir. 
              Building strong foundations for Classes 8, 9, and 10.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-emerald-400 glow-emerald-hover transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Join Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/notes"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-primary" />
                Study Notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/50 border-y border-white/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Excellence Driven",
                desc: "Focused on core conceptual clarity and academic excellence for board exams."
              },
              {
                icon: Users,
                title: "Personalized Attention",
                desc: "Small batch sizes ensure every student gets the guidance they need to succeed."
              },
              {
                icon: BookOpen,
                title: "Comprehensive Material",
                desc: "Access to high-quality study notes, regular tests, and performance tracking."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="glass p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:glow-emerald transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center border-primary/20 glow-emerald">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to begin your journey?
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Visit our institute at Station Road, Bihariganj, or contact Amit Sir directly to discuss admission and batch timings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:9801435867"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-emerald-400 glow-emerald-hover transition-all duration-300"
              >
                Call +91 98014 35867
              </a>
              <a
                href="https://wa.me/919801435867"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-semibold text-lg hover:bg-[#25D366]/30 transition-all duration-300"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}