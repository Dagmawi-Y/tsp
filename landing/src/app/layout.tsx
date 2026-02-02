import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
