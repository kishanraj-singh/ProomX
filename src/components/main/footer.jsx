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
            ProomX provides curated Library of premium-quality Free prompts,
            designed to support creativity and productivity.
          </p>
          <Separator className="my-4" />
          <p className="text-muted-foreground">Made with ❤️ by ResNeed</p>
        </div>
        <br />
        <div>
          <h2 className="text-md font-semibold">Top Categories</h2>
          <Link href="#">category one</Link>
          <Link href="#">category two</Link>
          <Link href="#">category three</Link>
          <Link href="#">category four</Link>
        </div>
        <br />
        <div>
          <h2 className="text-md font-semibold">Info & Legal</h2>
          <Link href="/disclaimer ">Disclaimer</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/about">About</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
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
