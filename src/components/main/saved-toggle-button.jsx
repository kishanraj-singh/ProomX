"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SavedToggleButton({ bundleId }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("saved")) || [];
    setSaved(savedItems.includes(bundleId));
  }, [bundleId]);

  const toggleSaved = () => {
    let savedItems = JSON.parse(localStorage.getItem("saved")) || [];
    if (saved) {
      savedItems = savedItems.filter((item) => item != bundleId);
    } else {
      savedItems.push(bundleId);
      toast.success("Bundle Added to Saved");
    }
    localStorage.setItem("saved", JSON.stringify(savedItems));
    setSaved(!saved);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-2.5 right-2.5 bg-white/20 hover:bg-white/15 z-1"
          onClick={toggleSaved}
        >
          <BookmarkIcon
            className={`${
              saved ? "text-blue-500 fill-blue-500" : "text-white"
            }`}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{saved ? "Remove to Saved" : "Add to Saved"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
