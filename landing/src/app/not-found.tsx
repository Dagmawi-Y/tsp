import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-lg mx-auto">
        <h1 className="text-8xl md:text-9xl font-black text-foreground tracking-tighter font-display leading-none">
          404.
        </h1>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-muted-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground font-medium text-lg pb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="outline" size="lg" className="rounded-none px-8 h-14 font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-foreground border-border hover:border-foreground transition-all active:translate-y-0.5 group">
            <ArrowLeft className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}