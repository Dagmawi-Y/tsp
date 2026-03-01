import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "The Side Project (TSP) - 3-Month Mentorship Program",
  description: "A 3-month mentorship helping aspiring engineers build real projects and get ready for their career. Apply for Cohort 2 and join our community of builders.",
  keywords: ["mentorship", "software development", "side projects", "engineering", "programming", "web development"],
  authors: [{ name: "Daggy" }],
  creator: "Daggy",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "The Side Project (TSP)",
    description: "A 3-month mentorship helping aspiring engineers build real projects and get ready for their career",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/tsp-logo.jpg",
        width: 1200,
        height: 630,
        alt: "TSP Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Side Project (TSP)",
    description: "A 3-month mentorship helping aspiring engineers build real projects and get ready for their career",
    images: ["/assets/tsp-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-6 right-6 z-50 p-1 border-2 border-border bg-background/80 backdrop-blur-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-1">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
