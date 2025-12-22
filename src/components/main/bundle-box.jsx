import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ArrowRight, ChevronRight, Tag } from "lucide-react";
import SavedToggleButton from "./saved-toggle-button";

export default function BundleBox({ bundle }) {
  const bundleData = bundle.data();
  return (
    <Card className="w-full sm:w-[46%] lg:w-[31%] bg-transparent p-0 overflow-hidden pb-4 border-0 shadow-none transition-transform duration-500 hover:scale-[102%] hover:[&_span]:[&_svg]:-rotate-45 relative rounded-none">
      <SavedToggleButton bundleId={bundle.id} />
      <Link href={`/${bundleData.category}/${bundleData.slug}` || "#"}>
        <Image
          src={bundleData.photoURL}
          alt="bundle-image"
          width={300}
          height={200}
          className="w-full aspect-video object-cover rounded-sm bg-secondary"
          unoptimized
          draggable={false}
        />
        <div className="px-2 flex flex-col gap-1 mt-4">
          <h2 className="text-xl line-clamp-2">{bundleData.title}</h2>
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
