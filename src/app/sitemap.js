import { firestore } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 86400;

export default async function sitemap() {
  const baseURL = "https://www.proomx.online";
  const staticRoutes = [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/writing-content`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/marketing-sales`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/coding-development`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/design-image`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/business-productivity`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/saved`,
      lastModified: new Date(),
    },
  ];

  const bundlesSnapshot = await getDocs(collection(firestore, "bundles"));
  const bundles = bundlesSnapshot.docs;
  const bundleRoutes = bundles.map((bundle) => {
    const bundleData = bundle.data();
    return {
      url: `${baseURL}/${bundleData.category}/${bundleData.slug}`,
      lastModified: bundleData.createdAt.toDate(),
    };
  });

  return [...staticRoutes, ...bundleRoutes];
}
