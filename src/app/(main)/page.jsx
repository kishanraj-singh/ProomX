import BundleBox from "@/components/main/bundle-box";
import CTAButton from "@/components/main/cta-button";
import ShareBar from "@/components/main/share-section";
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
import { ChevronRightIcon, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const snapshot = await getDocs(
    query(
      collection(firestore, "bundles/"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(12)
    )
  );

  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex flex-col justify-center items-center p-[8%] md:py-[4%] gap-5">
        <Badge
          variant="secondary"
          className="mb-1 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <HeartHandshake className="text-blue-500" /> Loved by Thousands of
          User
        </Badge>
        <h1 className="text-primary text-4xl xl:text-5xl font-semibold text-center tracking-tight text-balance">
          The Ultimate AI Prompt Library
        </h1>
        <h2 className="max-w-2xl text-[16px] md:text-[18px] text-muted-foreground text-center">
          Discover curated, reusable AI prompt collections for writing, coding,
          design, marketing, and productivity. 100% Free to use.{" "}
          <span className="underline">No login required.</span>
        </h2>
        <CTAButton />
      </section>

      <section
        id="explore"
        className="w-full flex flex-col justify-center items-center px-[3%] pt-[6%] md:pt-[1%]"
      >
        <div className="w-full grid gap-5">
          <div className="flex justify-between items-center px-[4%]">
            <h2 className="text-lg font-bold">Latest Bundles</h2>
            <Link href="/explore">
              <Button variant="ghost">
                Explore All <ChevronRightIcon />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-6 px-[3%] justify-center">
            {snapshot.docs.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))}
          </div>
        </div>

        <Link href="/explore">
          <Button variant="outline" className="w-50 h-10 my-12">
            Explore All
          </Button>
        </Link>
      </section>

      <ShareBar />
    </main>
  );
}

export const revalidate = 86400;
