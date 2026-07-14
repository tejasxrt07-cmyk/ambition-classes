import { Link } from 'wouter';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { PublicLayout } from '@/components/public-layout';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="glass p-12 rounded-3xl max-w-md text-center border-primary/20 glow-emerald">
          <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-6 glow-emerald">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            404
          </h1>
          
          <p className="text-lg text-white/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary hover:text-primary-foreground border border-primary/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}