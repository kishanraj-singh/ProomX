"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MostlovedSection() {
  const pathname = usePathname();
  const category = [
    "Wallpapers",
    "prompts",
    "Profile Pictures",
    "Instagram Bio",
    "Qutes",
    "Designs",
    "Mod APK's",
    "Ai",
    "Free Editor",
  ];

  return (
    <div className="w-full flex justify-center items-center gap-4 px-[3%]">
      <div
        className="w-full
      h-[60px] overflow-hidden relative
      before:content-[''] before:h-full before:absolute before:top-0 before:left-0 before:w-[5%] before:bg-gradient-to-r before:from-background before:to-[#00000000]
      after:content-[''] after:h-full after:absolute after:top-0 after:right-0 after:w-[5%] after:bg-gradient-to-l after:from-background after:to-[#00000000]"
      >
        <div className="flex lg:justify-center items-center gap-[10px] overflow-x-auto whitespace-nowrap scroll-smooth py-[10px] px-[5%] hide-scrollbar">
          <p className="text-sm text-muted-foreground tilt">Most loved:</p>
          {category.map((fOption, index) => (
            <Link key={index} href={`/search/${fOption.toLowerCase()}`}>
              <Button
                variant="ghost"
                className="h-[35px] flex justify-center items-center grow-0 shrink-0 basis-auto"
              >
                {fOption}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
