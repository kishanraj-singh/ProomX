import BreadCrumb from "@/components/main/breed-crumb";
import ShareBar from "@/components/main/share-section";
import PromptView from "@/components/main/prompt-view";
import { firestore } from "@/config/firebase";
import formatNumber from "@/helper/formatNumber";
import generateSlug from "@/helper/generateSlug";
import generateTimeAgo from "@/helper/generateTimeAgo";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

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
      url: `https://www.proomx.online/${bundlesData.category}/${bundlesData.slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "ProomX AI Prompt Library",
        },
      ],
    },
  };
}

export default async function slug({ params }) {
  const { slug } = await params;
  const bundlesSnapshot = await getDocs(
    query(collection(firestore, "bundles/"), where("slug", "==", slug))
  );
  if (bundlesSnapshot.empty) {
    notFound();
  }
  const bundleData = bundlesSnapshot.docs[0].data();
  await updateDoc(bundlesSnapshot.docs[0].ref, {
    views: increment(1),
  });

  const bundleItemsnapshot = await getDocs(
    query(
      collection(firestore, "bundleItems/"),
      orderBy("createdAt"),
      where("bundleSlug", "==", slug)
    )
  );

  const bundleItems = bundleItemsnapshot.docs;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-[3%]">
        <BreadCrumb />
      </div>

      <div className="flex flex-col md:flex-row py-[3%] px-[3%]">
        <div className="w-full md:w-[28%] h-full p-4">
          <h2 className="text-2xl text-muted-foreground font-semibold">
            Prompts
          </h2>
          <div className="px-2 py-5 flex flex-col [&_a]:text-[15px] [&_a]:text-muted-foreground [&_a]:border-l [&_a]:px-5 [&_a]:py-2">
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
            &bull; {bundleItems.length} Prompts
          </p>
          <p className="text-gray-500 text-[13px]">
            &bull; {formatNumber(bundleData.views)} Views
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-4 px-[3%] md:px-[6%] py-4">
          <div className="w-full flex flex-col gap-6">
            <h1 className="text-[26px] md:text-[30px] lg:text-[34px] text-primary font-semibold leading-tight">
              {bundleData.title}
            </h1>
            <h2 className="text-[16px] md:text-[18px] text-muted-foreground">
              {bundleData.description}
            </h2>
            <p className="text-[16px] md:text-[18px] text-muted-foreground italic">
              Note: The prompt "Example Preview" sytem will be introduced after
              3.0 upcoming update.
            </p>
          </div>
          {bundleItems.map((bundleItem, index) => {
            const bundleItemData = bundleItem.data();
            return (
              <div
                id={generateSlug(bundleItem.data().title)}
                key={index}
                className="w-full flex flex-col gap-5 mt-8"
              >
                <h2 className="text-[24px] md:text-[28px] lg:text-[32px] text-primary font-semibold leading-tight">
                  {index + 1} &bull; {bundleItemData.title}
                </h2>

                {bundleItemData.photoURL && (
                  <div className="w-fit relative">
                    <Image
                      src={bundleItemData.photoURL}
                      width={100}
                      height={100}
                      alt="Bundle Item Image"
                      className="w-100 rounded-sm"
                      unoptimized
                    />
                    <Badge
                      variant="secondary"
                      className="absolute bottom-5 right-5"
                    >
                      Example Output
                    </Badge>
                  </div>
                )}

                {bundleItemData.prompt && (
                  <PromptView copyText={bundleItemData.prompt} />
                )}

                <h2 className="text-[16px] md:text-[18px] text-muted-foreground whitespace-pre-wrap">
                  {bundleItemData.description}
                </h2>
              </div>
            );
          })}
        </div>
      </div>

      <ShareBar />
    </div>
  );
}
