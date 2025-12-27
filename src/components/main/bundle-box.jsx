import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  ArrowRight,
  BriefcaseIcon,
  CodeIcon,
  EyeIcon,
  FileTextIcon,
  ImagesIcon,
  TrendingUpIcon,
} from "lucide-react";
import SavedToggleButton from "./saved-toggle-button";
import { Button } from "../ui/button";
import formatNumber from "@/helper/formatNumber";

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
    <Card
      draggable={true}
      className="w-full sm:w-[46%] lg:w-[30.5%] bg-transparent overflow-hidden transition-transform duration-500 hover:scale-[102%] relative rounded-sm"
    >
      <CardContent className="flex flex-col flex-1 gap-4">
        <h2 className="text-xl line-clamp-2">{bundleData.title} </h2>
        <div className="flex gap-2.5">
          <Link href={`/${bundleData.category}`}>
            <Badge variant="secondary" className="font-normal">
              {categoryIcon[bundleData.category]} {bundleData.category}
            </Badge>
          </Link>
          <Badge variant="secondary" className="font-normal">
            <EyeIcon /> {formatNumber(bundleData.views)}
          </Badge>
        </div>
        <p className="text-muted-foreground line-clamp-3">
          {bundleData.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/${bundleData.category}/${bundleData.slug}`}>
          <Button
            variant="outline"
            className="text-sm font-normal hover:[&_svg]:-rotate-45 [&_svg]:transition-all [&_svg]:duration-200"
          >
            View bundle <ArrowRight />
          </Button>
        </Link>

        <SavedToggleButton bundleId={bundle.id} />
      </CardFooter>
    </Card>
  );
}
