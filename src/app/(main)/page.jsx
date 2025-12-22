import ExploreButton from "@/components/main/explore-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleArrowDownIcon,
  CircleSmallIcon,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center p-[8%] md:py-[4%] gap-5">
        <Badge
          variant="secondary"
          className="mb-1 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <HeartHandshake color="pink" /> Loved by Heros <ArrowRight />
        </Badge>
        <h1 className="text-primary text-4xl xl:text-5xl font-semibold font-sans text-center tracking-tight text-balance">
          The Ultimate AI Prompt Library
        </h1>
        <h2 className="max-w-2xl text-[16px] md:text-[18px] text-muted-foreground text-center">
          Discover curated, reusable AI prompt collections for writing, coding,
          design, marketing, and productivity. Free to use. No login required.
        </h2>
        <div className="w-full flex flex-col sm:flex-row justify-center gap-5 [&_button]:w-full sm:[&_button]:w-auto  [&_button]:h-10">
          <ExploreButton />
          <Button className="min-w-30" variant="outline">
            <ChevronDownIcon /> Categories
          </Button>
        </div>
      </div>

      <div
        id="explore"
        className="w-full flex flex-col justify-center items-center px-[3%] py-[6%] md:py-[3%] md:py-[4%]"
      >
        <div className="w-full grid gap-5" id="explore">
          <div className="flex justify-between items-center px-[4%]">
            <h2 className="text-lg font-bold">Trending Collaction</h2>
            <Link href="/writing-content">
              <Button variant="ghost">
                View more <ChevronRightIcon />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 px-[3%] justify-center">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="w-full sm:w-[46%] lg:w-[31%] flex flex-col gap-3 p-0 overflow-hidden pb-4 transition-transform duration-500 hover:scale-[102%]"
              >
                <Skeleton className="w-full aspect-video rounded-sm" />
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-[70%] h-4 rounded-full" />
                <Skeleton className="w-[80%] h-4 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
