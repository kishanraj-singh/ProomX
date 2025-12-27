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
  let bundlesRefQuery = query(
    collection(firestore, "bundles/"),
    where("status", "==", "published"),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (category) {
    bundlesRefQuery = query(bundlesRefQuery, where("category", "==", category));
  }

  useEffect(() => {
    (async () => {
      const bundlesSnashot = await getDocs(bundlesRefQuery);
      setbundles(bundlesSnashot.docs);
      const lastDoc = bundlesSnashot.docs[bundlesSnashot.docs.length - 1];
      setCursor(lastDoc ? lastDoc : null);
    })();
  }, []);

  const loadMore = async () => {
    if (cursor) {
      setProcessing(true);
      const bundlesSnashot = await getDocs(
        query(bundlesRefQuery, startAfter(cursor))
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
      <div className="flex flex-wrap gap-x-10 gap-y-6 px-[3%] justify-center">
        {bundles
          ? bundles.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))
          : Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="w-full sm:w-[46%] lg:w-[30.5%] flex flex-col gap-3 p-0 overflow-hidden pb-4 transition-transform duration-500 hover:scale-[102%]"
              >
                <Skeleton className="w-full aspect-video rounded-sm" />
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
          className="w-50"
          variant="outline"
        >
          {processing ? <Spinner /> : cursor ? "Load More" : "No More Data"}
        </Button>
      </div>
    </div>
  );
}
