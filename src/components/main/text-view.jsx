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

export default function TextView({ copyText }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Copied!");
    } catch (error) {
      toast.error(`Failed to copy: ${error}`);
    }
  };

  return (
    <Card className="w-full p-0 overflow-hidden rounded-md border-0  mt-2.5">
      <div className="flex items-center justify-between border-b px-4 py-2 text-gray-300">
        <p>Copy Text</p>
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
      <div className="w-full px-4 pb-4 text-gray-300">
        <code className="text-[15px] whitespace-pre-wrap">{copyText}</code>
      </div>
    </Card>
  );
}
