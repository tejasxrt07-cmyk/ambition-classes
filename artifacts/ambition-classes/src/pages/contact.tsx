import { PublicLayout } from "@/components/public-layout";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";

export default function Contact() {
  return (
    <PublicLayout>
      <div className="bg-black/50 py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-1/3 h-full bg-primary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-primary font-medium">We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-white/60 leading-relaxed text-lg max-w-md">
                Have questions about admissions, batch timings, or our methodology? Reach out to us directly or visit our institute.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="glass p-6 rounded-2xl border-white/5 flex gap-5 items-start group hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:glow-emerald transition-all">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
                  <p className="text-white/70 leading-relaxed">
                    Ambition Classes<br />
                    Station Road, Bihariganj<br />
                    Madhepura, Bihar<br />
                    India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="glass p-6 rounded-2xl border-white/5 flex gap-5 items-start group hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:glow-emerald transition-all">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Call Amit Sir</h3>
                  <a href="tel:9801435867" className="text-white/70 hover:text-primary transition-colors text-lg">
                    +91 98014 35867
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="glass p-6 rounded-2xl border-white/5 flex gap-5 items-start group hover:border-[#25D366]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,211,102,0)] group-hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                  <a 
                    href="https://wa.me/919801435867" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#25D366] transition-colors text-lg flex items-center gap-2"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden glass border-primary/20 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14358.558235229641!2d86.8797!3d25.7153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee45f1b138e9c1%3A0x8e826b52a5a54160!2sBihariganj%2C%20Bihar%20852101!5e0!3m2!1sen!2sin!4v1709904260000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%) saturate(150%) sepia(10%)" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Ambition Classes Location"
            />
            {/* Map overlay to blend better with theme */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-color" />
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}