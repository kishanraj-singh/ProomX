"use client";

import { firestore } from "@/config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import BundleBox from "./bundle-box";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

export default function bundleItemsArea({ category }) {
  const pageSize = 12;
  const [cursor, setCursor] = useState(null);
  const [bundles, setbundles] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const bundlesSnashot = await getDocs(
        query(
          collection(firestore, "bundles/"),
          where("status", "==", "published"),
          where("category", "==", category),
          orderBy("createdAt", "desc"),
          limit(pageSize)
        )
      );
      setbundles(bundlesSnashot.docs);
      const lastDoc = bundlesSnashot.docs[bundlesSnashot.docs.length - 1];
      setCursor(lastDoc ? lastDoc : null);
    })();
  }, []);

  const loadMore = async () => {
    if (cursor) {
      setProcessing(true);
      const bundlesSnashot = await getDocs(
        query(
          collection(firestore, "bundles/"),
          where("status", "==", "published"),
          where("category", "==", category),
          orderBy("createdAt", "desc"),
          startAfter(cursor),
          limit(pageSize)
        )
      );
      setbundles([...bundles, ...bundlesSnashot.docs]);
      const lastDoc = bundlesSnashot.docs[bundlesSnashot.docs.length - 1];
      setCursor(lastDoc ? lastDoc : null);
      setProcessing(false);
    }
  };

  useEffect(() => {
    console.log(bundles);
  }, [bundles]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-8 px-[3%] justify-center">
        {bundles
          ? bundles.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))
          : Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="w-full sm:w-[46%] lg:w-[31%] flex flex-col gap-3 p-0 overflow-hidden pb-4 transition-transform duration-500 hover:scale-[102%]"
              >
                <Skeleton className="w-full aspect-[3/2] rounded-sm" />
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-[70%] h-4 rounded-full" />
                <Skeleton className="w-[80%] h-4 rounded-full" />
              </div>
            ))}
      </div>
      <div className="w-full flex justify-center">
        <Button
          disabled={!cursor}
          onClick={loadMore}
          className="w-40"
          variant="outline"
        >
          {processing ? <Spinner /> : "Load More"}
        </Button>
      </div>
    </div>
  );
}
