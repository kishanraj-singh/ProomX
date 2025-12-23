import BreadCrumb from "@/components/main/breed-crumb";
import BundleBox from "@/components/main/bundle-box";
import SearchBox from "@/components/main/search-box";
import ShareBar from "@/components/main/share-section";
import { firestore } from "@/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import MiniSearch from "minisearch";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { query } = await params;
  const searchq = decodeURIComponent(query);

  return {
    title: `Search - ${searchq}`,
    openGraph: {
      title: `Search - ${searchq}`,
      url: `https://www.proomx.online/search/${searchq}`,
      siteName: "ProomX",
      images: "/images/og.png",
      type: "website",
    },
  };
}

export default async function Query({ params }) {
  const { query: rowQuery } = await params;
  const searchq = decodeURIComponent(rowQuery);
  const miniSearch = new MiniSearch({
    fields: ["title"],
    storeFields: ["title"],
  });
  let bundles;

  if (searchq !== "") {
    const searchListSnapshot = await getDoc(
      doc(firestore, "appData/searchList")
    );
    const search = searchListSnapshot.data();
    miniSearch.addAll(
      search.titles.map((title, index) => ({
        id: index,
        title: title,
      }))
    );
    const searchResult = miniSearch
      .search(searchq, {
        prefix: true,
        fuzzy: 0.2,
      })
      .map((q) => q.title);
    console.log(searchResult);
    const bundlesSnapshot = await getDocs(
      query(
        collection(firestore, "bundles/"),
        where(
          "title",
          "in",
          searchResult.length !== 0 ? searchResult : ["notFound"]
        ),
        where("status", "==", "published"),
        limit(12)
      )
    );
    bundles = bundlesSnapshot.docs;
  }

  //return
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-[3%]">
        <BreadCrumb />
      </div>
      <div className="flex flex-col px-[3%] py-[8%] sm:py-[3%] gap-[10vw] sm:gap-[3vw]">
        {/*search result header}*/}
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[50px] font-semibold text-center leading-tight">
            Search: {searchq}
          </h1>
          <h2 className="md:text-lg text-gray-400 text-center">
            {bundles.length !== 0
              ? `Here are ${bundles.length} search results for ${searchq}`
              : " No Result match with your Search"}
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
        <div className="flex flex-wrap gap-8 px-[3%] justify-center">
          {bundles.length !== 0 ? (
            bundles.map((bundle, index) => (
              <BundleBox key={index} bundle={bundle} />
            ))
          ) : (
            <SearchBox />
          )}
        </div>
        {/*main content*/}
        {/*share bar*/}
        <ShareBar />
        {/*share bar*/}
      </div>
    </div>
  );
}
