import type { Metadata } from "next";
import { Caprasimo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bringthisfood.com"),
  title: {
    default: "Bring This Food: Reliable Last-Mile Delivery for Everyone",
    template: "%s | Bring This Food",
  },
  description:
    "Connect with local vendors through our reliable, tech-driven delivery service. Professional and fast service for customers, vendors, and riders.",
  keywords: [
    // Primary Keywords
    "last-mile delivery platform",
    "food delivery service",
    "local vendor delivery",
    "tech-driven delivery",
    "reliable food delivery",

    // Customer-Focused
    "food delivery near me",
    "order food online",
    "quick food delivery",
    "fast food delivery service",
    "reliable food delivery app",

    // Vendor-Focused
    "restaurant delivery service",
    "local business delivery platform",
    "food vendor delivery solutions",
    "restaurant delivery partnership",

    // Rider-Focused
    "food delivery jobs",
    "delivery rider opportunities",
    "local delivery work",

    // Feature-Based
    "tech-driven food delivery",
    "professional food delivery",
    "efficient food delivery",
  ],
  // authors: [{ name: "Your Name" }],
  // creator: "Your Name",
  // publisher: "Your Company",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bringthisfood.com/",
    siteName: "Bring This Food",
    title: "Bring This Food: Reliable Last-Mile Delivery for Everyone",
    description:
      "Connect with local vendors through our reliable, tech-driven delivery service. Professional and fast service for customers, vendors, and riders.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bring This Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bring This Food: Reliable Last-Mile Delivery for Everyone",
    description:
      "Connect with local vendors through our reliable, tech-driven delivery service. Professional and fast service for customers, vendors, and riders.",
    // creator: "@yourtwitter",
    images: ["/images/og-image.png"],
  },
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   yahoo: "your-yahoo-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${caprasimo.variable} ${jakarta.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
