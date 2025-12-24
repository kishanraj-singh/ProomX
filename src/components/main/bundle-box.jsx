import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  ArrowRight,
  BriefcaseIcon,
  CodeIcon,
  FileTextIcon,
  ImagesIcon,
  TrendingUpIcon,
} from "lucide-react";
import SavedToggleButton from "./saved-toggle-button";

const categoryIcon = {
  "writing-content": <FileTextIcon />,
  "marketing-sales": <TrendingUpIcon />,
  "coding-development": <CodeIcon />,
  "design-image": <ImagesIcon />,
  "business-productivity": <BriefcaseIcon />,
};

export default function BundleBox({ bundle }) {
  const bundleData = bundle.data();
  return (
    <Card className="w-full sm:w-[46%] lg:w-[31%] bg-transparent p-0 overflow-hidden pb-4 border-0 shadow-none transition-transform duration-500 hover:scale-[102%] relative rounded-none">
      <SavedToggleButton bundleId={bundle.id} />
      <Image
        src="/logo-main.png"
        width={28}
        height={28}
        className="opacity-60 grayscale absolute top-2.5 left-2.5"
        alt="logo"
        unoptimized
      />
      <Link href={`/${bundleData.category}/${bundleData.slug}` || "#"}>
        <Image
          src={bundleData.photoURL}
          alt="bundle-image"
          width={300}
          height={200}
          className="w-full aspect-video object-cover rounded-sm bg-secondary"
          unoptimized
          loading="lazy"
          draggable={false}
        />
        <div className="px-2 flex flex-col gap-1 mt-4">
          <h2 className="text-xl line-clamp-2">
            {bundleData.title}{" "}
            <Badge variant="secondary">
              {categoryIcon[bundleData.category]}
            </Badge>
          </h2>
          <div className="grid gap-1">
            <p className="text-muted-foreground line-clamp-2">
              {bundleData.description}
            </p>
          </div>

          <Badge
            variant="secondary"
            className="font-normal my-2 rounded-sm transition-all duration-200 [&_svg]:transition-all [&_svg]:duration-200"
          >
            View bundle <ArrowRight />
          </Badge>
        </div>
      </Link>
    </Card>
  );
}
