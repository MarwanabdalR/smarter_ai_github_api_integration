import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import LayoutContainer from "./LayoutContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GitHub API Integration Challenge - AI-Powered Profile Analysis",
    template: "%s | GitHub API Integration Challenge"
  },
  description: "A comprehensive Next.js application with AI-powered GitHub profile analysis, user comparison, and smart note-taking. Built with TypeScript, Tailwind CSS, and modern web technologies.",
  keywords: [
    "GitHub API",
    "Profile Analysis",
    "AI Analysis",
    "User Comparison",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Query",
    "Developer Tools",
    "GitHub Integration",
    "Portfolio Analysis",
    "Code Analysis"
  ],
  authors: [{ name: "Marwan" }],
  creator: "Marwan",
  publisher: "Marwan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://smarter-ai-github-api-integration.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smarter-ai-github-api-integration.vercel.app/",
    title: "GitHub API Integration Challenge - AI-Powered Profile Analysis",
    description: "Analyze GitHub profiles with AI, compare users, and take smart notes. Built with Next.js, TypeScript, and modern web technologies.",
    siteName: "GitHub API Integration Challenge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHub API Integration Challenge - AI-Powered Profile Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub API Integration Challenge - AI-Powered Profile Analysis",
    description: "Analyze GitHub profiles with AI, compare users, and take smart notes. Built with Next.js, TypeScript, and modern web technologies.",
    images: ["/og-image.png"],
    creator: "@marwanabdalrady503",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="application-name" content="GitHub API Integration Challenge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GitHub API Challenge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "GitHub API Integration Challenge",
              "description": "A comprehensive Next.js application with AI-powered GitHub profile analysis, user comparison, and smart note-taking capabilities.",
              "url": "https://smarter-ai-github-api-integration.vercel.app/",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Marwan"
              },
              "creator": {
                "@type": "Person",
                "name": "Marwan"
              },
              "keywords": "GitHub API, Profile Analysis, AI Analysis, User Comparison, Next.js, TypeScript, Tailwind CSS, React Query, Developer Tools",
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "1.0.0",
              "dateCreated": "2024-01-01",
              "dateModified": new Date().toISOString().split('T')[0]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}
      >
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}
