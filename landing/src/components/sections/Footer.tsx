import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/tsp-logo.jpg"
              alt="TSP Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div className="text-sm text-muted-foreground">
              TSP © {new Date().getFullYear()}
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://t.me/daggy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Telegram
            </a>
            <a
              href="mailto:dagmawi.inbox@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}