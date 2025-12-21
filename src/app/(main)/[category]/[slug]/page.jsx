//imports
import BreadCrumb from "@/components/main-ui/BreadCrumb";
import ShareBar from "@/components/main-ui/ShareBar";
import TextView from "@/components/main-ui/TextView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { firestore } from "@/config/firebase";
import formatNumber from "@/helper/formatNumber";
import generateSlug from "@/helper/generateSlug";
import generateTimeAgo from "@/helper/generateTimeAgo";
import {
  collection,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { BadgeCheck, BadgeCheckIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const bundlesSnapshot = await getDocs(
    query(collection(firestore, "bundles/"), where("slug", "==", slug))
  );
  const bundlesData = bundlesSnapshot.docs[0].data();

  if (bundlesData.empty)
    return {
      title: "Bundle not found",
      description: "This bundle slug may be wrong or deleted by admin.",
    };

  return {
    title: bundlesData.title,
    description: `Bundle description: ${bundlesData.description}`,
    openGraph: {
      title: bundlesData.title,
      description: `Bundle description: ${bundlesData.description}`,
      url: `https://www.resneed.online/${bundlesData.category}/${bundlesData.slug}`,
      images: bundlesData.photoURL
        ? [{ url: bundlesData.photoURL }]
        : [{ url: "/logomain.jpg" }],
    },
  };
}

export default async function slug({ params }) {
  //variables
  const { slug } = await params;
  const bundlesSnapshot = await getDocs(
    query(collection(firestore, "bundles/"), where("slug", "==", slug))
  );
  if (bundlesSnapshot.empty) {
    notFound();
  }
  const bundle = bundlesSnapshot.docs[0];
  const bundleData = bundlesSnapshot.docs[0].data();
  const bundleItemsnapshot = await getDocs(
    query(
      collection(firestore, "bundleItems/"),
      orderBy("createdAt", "desc"),
      where("bundleSlug", "==", slug)
    )
  );
  const bundleItems = bundleItemsnapshot.docs;
  //
  await updateDoc(bundle.ref, {
    views: increment(1),
  });

  //
  //return
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-[3%]">
        <BreadCrumb />
      </div>
      <div className="flex flex-col md:flex-row py-[3%] px-[3%]">
        {/*bundle items nav*/}
        <div className="w-full md:w-[28%] h-full p-4">
          <h2 className="text-2xl text-primary">Bundle Items</h2>
          <div className="px-2 py-5 flex flex-col [&_a]:text-[15px] [&_a]:text-gray-400 [&_a]:border-l [&_a]:px-5 [&_a]:py-2">
            {bundleItems.map((bundleItem, index) => (
              <Link
                key={index}
                href={`#${generateSlug(bundleItem.data().title)}`}
              >
                {bundleItem.data().title}
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-[13px]">
            &bull; Created {generateTimeAgo(bundleData.createdAt.toDate())}
          </p>
          <p className="text-gray-500 text-[13px]">
            &bull; Last Update {generateTimeAgo(bundleData.lastUpdate.toDate())}
          </p>
          <p className="text-gray-500 text-[13px]">
            &bull; {formatNumber(bundleData.views)} views
          </p>
        </div>
        {/*bundle items nav*/}

        {/*bundle items content*/}
        <div className="flex flex-col flex-1 gap-4 px-[3%] md:px-[6%] py-4">
          {/*bundle items content header}*/}
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-[26px] md:text-[30px] lg:text-[34px] font-semibold leading-tight">
              {bundleData.title}
            </h1>
            <h2 className="text-[16px] md:text-[18px] text-gray-400">
              {bundleData.description}
            </h2>
          </div>
          {/*bundle items content header}*/}
          {/*bundle items */}
          {bundleItems.map((bundleItem, index) => {
            const bundleItemData = bundleItem.data();
            return (
              <div
                id={generateSlug(bundleItem.data().title)}
                key={index}
                className="w-full flex flex-col gap-5 mt-8"
              >
                <h2 className="text-[26px] md:text-[30px] lg:text-[34px] font-semibold leading-tight">
                  {index + 1} &bull; {bundleItemData.title}
                </h2>

                {bundleItemData.photoURL && (
                  <Image
                    src={bundleItemData.photoURL}
                    alt="bundleItem-image"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                )}

                {bundleItemData.copyText && (
                  <TextView copyText={bundleItemData.copyText} />
                )}

                {bundleItemData.buttonClickURL && (
                  <div className="w-full flex justify-center">
                    <Link href={bundleItemData.buttonClickURL} target="_blank">
                      <Button className="min-w-40 md:w-[200px] md:h-[50px] bg-green-500 hover:bg-green-400 text-primary rounded-sm">
                        Visit <ExternalLink />
                      </Button>
                    </Link>
                  </div>
                )}

                <h2 className="text-[16px] md:text-[18px] text-gray-400 whitespace-pre-wrap">
                  {bundleItemData.description}
                </h2>

                <Link
                  href={`https://${bundleItemData.resourcesFrom}`}
                  target="_blank"
                  className="w-fit"
                >
                  <Badge
                    variant="secondary"
                    className="text-green-500 transition-all duration-200 hover:bg-transparent"
                  >
                    {bundleItemData.resourcesFrom === "resneed.online" ? (
                      <>
                        <BadgeCheckIcon />
                        ResNeed
                      </>
                    ) : (
                      bundleItemData.resourcesFrom
                    )}
                  </Badge>
                </Link>
              </div>
            );
          })}
          {/*bundle items */}
        </div>
        {/*bundle items content*/}
      </div>
      {/*share bar*/}
      <ShareBar />
      {/*share bar*/}
    </div>
  );
}
