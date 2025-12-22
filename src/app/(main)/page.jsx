import BundleBox from "@/components/main/bundle-box";
import CTAButton from "@/components/main/cta-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { firestore } from "@/config/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ArrowRight, ChevronRightIcon, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const snapshot = await getDocs(
    query(
      collection(firestore, "bundles/"),
      where("category", "==", "coding-development"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(3)
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center p-[8%] md:py-[4%] gap-5">
        <Badge
          variant="secondary"
          className="mb-1 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <HeartHandshake color="#3b82f6" /> Loved by Heros <ArrowRight />
        </Badge>
        <h1 className="text-primary text-4xl xl:text-5xl font-semibold font-sans text-center tracking-tight text-balance">
          The Ultimate AI Prompt Library
        </h1>
        <h2 className="max-w-2xl text-[16px] md:text-[18px] text-muted-foreground text-center">
          Discover curated, reusable AI prompt collections for writing, coding,
          design, marketing, and productivity. Free to use.{" "}
          <span className="underline">No login required.</span>
        </h2>
        <CTAButton />
      </div>

      <div
        id="explore"
        className="w-full flex flex-col justify-center items-center px-[3%] py-[6%] md:py-[3%]"
      >
        <div className="w-full grid gap-5" id="explore">
          <div className="flex justify-between items-center px-[4%]">
            <h2 className="text-lg font-bold">Latest Bundles</h2>
            <Link href="/explore">
              <Button variant="ghost">
                Explore All <ChevronRightIcon />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-10 px-[3%] justify-center">
            {snapshot.docs.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))}
          </div>
          <div className="flex flex-wrap gap-8 px-[3%] justify-center mt-5">
            {snapshot.docs.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))}
          </div>
          <div className="flex flex-wrap gap-8 px-[3%] justify-center mt-5">
            {snapshot.docs.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))}
          </div>
          <div className="flex flex-wrap gap-8 px-[3%] justify-center mt-5">
            {snapshot.docs.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))}
          </div>
        </div>

        <Link href="/explore">
          <Button variant="outline" className="w-50 my-8">
            Explore All
          </Button>
        </Link>
      </div>
    </div>
  );
}
