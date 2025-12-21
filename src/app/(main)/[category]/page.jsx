import BreadCrumb from "@/components/main/breed-crumb";
// import BundlesArea from "@/components/main-ui/BundlesArea";
import ShareBar from "@/components/main/share-section";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [
    { category: "writing-content" },
    { category: "marketing-sales" },
    { category: "coding-development" },
    { category: "design-image" },
    { category: "business-productivity" },
  ];
}

const categories = {
  "writing-content": {
    title: "Writing & Content",
    description:
      "Discover high-quality AI prompts for writing blogs, articles, emails, social posts, and creative content to produce better results faster.",
  },
  "marketing-sales": {
    title: "Marketing & Sales",
    description:
      "Explore AI prompts for marketing, SEO, ads, copywriting, and sales strategies to grow your brand and convert more customers.",
  },
  "coding-development": {
    title: "Coding & Development",
    description:
      "Find powerful AI prompts for coding, debugging, development, and technical problem-solving across modern programming workflows.",
  },
  "design-image": {
    title: "Design & Image",
    description:
      "Access curated AI prompts for image generation, design ideas, branding, and visual creativity to bring concepts to life.",
  },
  "business-productivity": {
    title: "Business & Productivity",
    description:
      "Use AI prompts for business planning, productivity, research, and workflow optimization to work smarter and save time.",
  },
};

export async function generateMetadata({ params }) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  if (!categories[category]) {
    return;
  }
  return {
    title: categories[category].title,
    description: categories[category].description,
    openGraph: {
      title: categories[category].title,
      description: categories[category].description,
      url: `https://www.proomx.online/${category}`,
      siteName: "ProomX",
      images: "/images/og.png",
      type: "website",
    },
  };
}

export default async function Category({ params }) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);

  if (!categories[category]) {
    return notFound();
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-[3%]">
        <BreadCrumb />
      </div>
      <div className="flex flex-col px-[3%] py-[8%] sm:py-[3%] gap-[10vw] sm:gap-[3vw]">
        {/*search result header}*/}
        <div className="w-full flex flex-col items-center gap-2 px-[4%]">
          <h1 className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[50px] font-semibold text-center leading-tight">
            {categories[category].title}
          </h1>
          <h2 className="w-full md:text-lg text-gray-400 text-center">
            Top new {categories[category].title} releted Bundles
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
        {/* <BundlesArea category={category} /> */}
        {/*main content*/}
      </div>
      <ShareBar />
    </div>
  );
}
