"use client";

import { CopyIcon, FacebookIcon, LinkedinIcon, Twitter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ShareBar() {
  const pathname = usePathname();
  const url = `https://www.proomx.online${pathname}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied!");
    } catch (error) {
      toast.error(`Failed to copy: ${error}`);
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-2.5 mb-8">
      <p className="text-sm text-muted-foreground">Share:</p>
      <div className="flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
            >
              <Button
                variant="ghost"
                className="[&_button]:text-muted-foreground"
              >
                <FacebookIcon />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share to Facebook</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://twitter.com/intent/tweet?url=${url}`}
              target="_blank"
            >
              <Button variant="ghost">
                <Twitter />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share to Twitter</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
              target="_blank"
            >
              <Button variant="ghost">
                <LinkedinIcon size={18} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share to LinkedIn</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={copyToClipboard}>
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to Clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
