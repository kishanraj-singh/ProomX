import BreadCrumb from "@/components/main/breed-crumb";
import BundlesArea from "@/components/main/bundles-area";
import ShareBar from "@/components/main/share-section";
import Link from "next/link";

export default async function Category({ params }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-[3%]">
        <BreadCrumb />
      </div>
      <div className="flex flex-col px-[3%] py-[8%] sm:py-[3%] gap-[10vw] sm:gap-[3vw]">
        {/*search result header}*/}
        <div className="w-full flex flex-col items-center gap-2 px-[4%]">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold lg:font-bold text-center leading-tight">
            Explore 500+
          </h1>
          <h2 className="w-full md:text-lg text-gray-400 text-center">
            Top new Prompt Bundles
          </h2>
          <Link
            href="mailto:support@resneed.online"
            className="text-[15px] md:text-md text-gray-400 text-center"
          >
            Need Help? <span className="underline">Contact</span>
          </Link>
        </div>
        {/*search result header}*/}
        {/*main content*/}
        <BundlesArea category={null} />
        {/*main content*/}
      </div>
      <ShareBar />
    </div>
  );
}
