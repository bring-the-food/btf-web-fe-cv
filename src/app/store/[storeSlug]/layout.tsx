import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bring This Food",
  description:
    "Bring This Food connects customers with local vendors through reliable, tech-driven last-mile delivery — fast, professional service for customers, vendors and riders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen overflow-hidden bg-white">
        <div className="mx-auto max-w-[1024px] pb-[83px] bg-white">
          {children}
        </div>
        <Toaster richColors position="top-right" />
        <Footer />
      </main>
    </>
  );
}
