"use client";

import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function PromptView({ copyText }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Copied!");
    } catch (error) {
      toast.error(`Failed to copy: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Card className="w-full p-0 overflow-hidden rounded-md border-0 shadow-none mt-2.5 bg-secondary">
        <div className="flex items-center justify-between border-b border-primary/15 px-4 py-2 text-primary">
          <Image
            src="/logo-full.png"
            width={70}
            height={28}
            className="invert dark:invert-0 opacity-60 grayscale"
            alt="logo"
            unoptimized
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={copyToClipboard}>
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="w-full px-4 pb-4 text-primary/80">
          <code className="text-[14px] md:text-[16px] whitespace-pre-wrap">
            {copyText}
          </code>
        </div>
      </Card>
    </div>
  );
}
