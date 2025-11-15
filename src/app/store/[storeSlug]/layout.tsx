import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  // description: "Welcome to our amazing website",
  openGraph: {
    title: "Store",
    // description: "Welcome to our amazing website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen overflow-hidden bg-white">
        <div className="mx-auto max-w-5xl pb-[83px] bg-white">
          {children}
        </div>
        <Toaster richColors position="top-right" />
        <Footer />
      </main>
    </>
  );
}
