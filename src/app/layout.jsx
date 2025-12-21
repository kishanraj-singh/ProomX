import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/theme-provider";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "ProomX — The Ultimate AI Prompt Library",
  description:
    "ProomX is a curated AI prompt library for ChatGPT, image generation, coding, marketing, and productivity. Discover high-quality prompts, save time, and unlock better AI outputs with ProomX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={interFont.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="w-full min-h-[100dvh] flex flex-col overflow-x-hidden pt-[80px]">
            <Header />
            <div className="w-full h-full flex flex-col flex-1 overflow-x-hidden">
              {children}
            </div>
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
