import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="px-[8%] py-8 bg-secondary/80 border-t [&_a]:w-fit">
      <div className="w-full flex flex-col sm:flex-row justify-between [&_div]:w-full [&_div]:sm:w-[25%] [&_div]:flex [&_div]:flex-col [&_div]:gap-2.5 [&_a]:text-muted-foreground">
        <div>
          <Link href="/">
            <Image
              draggable={false}
              src="/logo-full.png"
              alt="ProomX"
              width={384}
              height={128}
              className="w-[120px] sm:w-[140px] invert dark:invert-0"
            />
          </Link>
          <p className="text-muted-foreground">
            ProomX is an AI prompt library offering curated prompts for chat,
            image generation, coding, and productivity.
          </p>
          <Separator className="my-4" />
          <p className="text-muted-foreground">Made with ❤️ by ResNeed</p>
        </div>
        <br />
        <div>
          <h2 className="text-md font-semibold">Top Categories</h2>
          <Link href="/writing-content">Writing & Content</Link>
          <Link href="/marketing-sales">Marketing & Sales</Link>
          <Link href="/coding-development">Coding & Development</Link>
          <Link href="/design-image">Design & Image</Link>
          <Link href="/business-productivity">Business & Productivity</Link>
        </div>
        <br />
        <div>
          <h2 className="text-md font-semibold">Info & Legal</h2>
          <Link href="/disclaimer ">Disclaimer</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/about">About ProomX</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="w-full flex justify-center">
        <p className="text-muted-foreground">
          &copy; 2025 ProomX, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
