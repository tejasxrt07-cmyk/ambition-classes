import { PublicLayout } from "@/components/public-layout";
import { GraduationCap, Award, BookOpen, Star } from "lucide-react";

export default function About() {
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-black/50 py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg text-primary font-medium">Meet the mentor shaping futures.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image/Visual side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass border-primary/20 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              {/* Abstract representation of a teacher/mentor since we don't have a real photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mb-6 glow-emerald">
                  <GraduationCap className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Amit Sir</h3>
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-6">Founder & Lead Mentor</p>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-[40px] rounded-full" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 blur-[40px] rounded-full" />
          </div>

          {/* Content side */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Empowering Students in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Bihariganj</span>
            </h2>
            
            <div className="space-y-6 text-white/70 leading-relaxed text-lg">
              <p>
                Ambition Classes was founded with a singular vision: to provide top-tier academic coaching to the students of Bihariganj. Under the dedicated mentorship of Amit Sir, the institute has become a beacon of excellence for Classes 8, 9, and 10.
              </p>
              <p>
                We believe that early foundation years are critical. Our methodology focuses on stripping away the fear of difficult subjects like Mathematics and Science, replacing it with deep conceptual understanding and logical problem-solving skills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {[
                {
                  icon: BookOpen,
                  title: "Classes 8-10",
                  desc: "Specialized focus on board prep and core fundamentals."
                },
                {
                  icon: Award,
                  title: "Proven Results",
                  desc: "Consistent track record of academic excellence."
                },
                {
                  icon: Star,
                  title: "All Subjects",
                  desc: "Maths, Science, English, Hindi, SST, AI & Sanskrit."
                },
                {
                  icon: GraduationCap,
                  title: "Expert Mentorship",
                  desc: "Direct guidance and doubt-clearing by Amit Sir."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl glass border-white/5 hover:border-primary/30 transition-colors">
                  <div className="shrink-0 mt-1">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}