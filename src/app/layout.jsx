import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/theme-provider";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import ScrollTopButton from "@/components/main/scroll-top-button";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  applicationName: "ProomX",
  title: "ProomX - The Ultimate AI Prompt Library",

  description:
    "ProomX is a curated AI prompt library for ChatGPT, image generation, coding, marketing, and productivity. Discover high-quality prompts, save time, and unlock better AI outputs with ProomX.",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",

  keywords: [
    "AI prompts",
    "free AI prompts",
    "ChatGPT prompts",
    "Gemini prompts",
    "AI prompt library",
    "AI tools prompts",
    "text AI prompts",
    "image AI prompts",
    "code AI prompts",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    title: "ProomX - The Ultimate AI Prompt Library",
    description:
      "ProomX is a curated AI prompt library for ChatGPT, image generation, coding, marketing, and productivity. Discover high-quality prompts, save time, and unlock better AI outputs with ProomX.",
    url: "https://proomx.online",
    siteName: "ProomX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProomX AI Prompt Library",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={interFont.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="w-full min-h-[100dvh] flex flex-col overflow-x-hidden pt-[100px]">
            <Header />
            <div className="w-full h-full flex flex-col flex-1 overflow-x-hidden">
              {children}
            </div>
            <Footer />
            <ScrollTopButton />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
