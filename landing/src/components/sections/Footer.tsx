import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 uppercase tracking-widest text-[10px] font-black">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <div className="p-0.5 border border-border bg-background">
              <Image
                src="/assets/tsp-logo.jpg"
                alt="TSP Logo"
                width={28}
                height={28}
                className="grayscale"
              />
            </div>
            <div className="text-muted-foreground">
              TSP © {new Date().getFullYear()}<br />
              WITH 🖤 BY <a href="https://t.me/dag_mawi" target="_blank" rel="noopener noreferrer" className='text-foreground hover:underline'>DAGMAWI</a>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex items-center space-x-8">
            <a
              href="https://t.me/dag_mawi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Telegram
            </a>
            <a
              href="mailto:dagmawi.inbox@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}