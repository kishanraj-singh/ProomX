"use client";

import BreadCrumb from "@/components/main/breed-crumb";
import BundleBox from "@/components/main/bundle-box";
import ShareBar from "@/components/main/share-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { firestore } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Saved() {
  const [savedBundles, setSavedBundles] = useState(null);

  useEffect(() => {
    fetchSavedBundles();
  }, []);

  const fetchSavedBundles = async () => {
    const savedBundleId = JSON.parse(localStorage.getItem("saved")) || [];
    const results = [];

    for (let bundleId of savedBundleId) {
      const bundleSnapshot = await getDoc(
        doc(firestore, `bundles/${bundleId}`)
      );
      if (bundleSnapshot.exists()) {
        results.push(bundleSnapshot);
      }
    }
    setSavedBundles(results);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-[3%]">
        <BreadCrumb />
      </div>
      <div className="w-full h-full flex flex-col px-[3%] py-[8%] sm:py-[3%] pb-0 gap-[10vw] sm:gap-[3vw]">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[46px] font-semibold text-center leading-tight">
            Saved Bundles
          </h1>
          <h2 className="md:text-lg text-muted-foreground text-center">
            Items you've added to saved will show here.
          </h2>
          <Link
            href="/contact"
            className="text-[15px] md:text-md text-muted-foreground text-center"
          >
            Need Help? <span className="underline">Contact</span>
          </Link>
        </div>

        <div className="flex flex-wrap gap-8 px-[3%] justify-center">
          {savedBundles ? (
            savedBundles.length !== 0 ? (
              savedBundles.map((bundle, index) => (
                <BundleBox key={index} bundle={bundle} />
              ))
            ) : (
              <div className="flex-1 w-full h-full flex flex-col justify-center items-center gap-1">
                <h2 className="text-muted-foreground font-[400]">
                  No bundle in your saved
                </h2>
                <Link href="/#explore">
                  <Button className="my-4">Add your first Bundle</Button>
                </Link>
              </div>
            )
          ) : (
            Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="w-full sm:w-[46%] lg:w-[31%] flex flex-col gap-3 p-0 overflow-hidden pb-4 transition-transform duration-500 hover:scale-[102%]"
              >
                <Skeleton className="w-full aspect-[3/2] rounded-sm" />
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-[70%] h-4 rounded-full" />
                <Skeleton className="w-[80%] h-4 rounded-full" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
