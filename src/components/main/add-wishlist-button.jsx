"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddToWishlistButton({ bundleId }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setSaved(savedItems.includes(bundleId));
  }, [bundleId]);

  const toggleWishlist = () => {
    let savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (saved) {
      savedItems = savedItems.filter((item) => item != bundleId);
    } else {
      savedItems.push(bundleId);
      toast.success("collection added to wistlist");
    }
    localStorage.setItem("wishlist", JSON.stringify(savedItems));
    setSaved(!saved);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-2.5 right-2.5 bg-secondary/25 hover:bg-secondary/50 z-1"
          onClick={toggleWishlist}
        >
          <Heart
            fill={saved ? "red" : "transparent"}
            color={saved ? "red" : "#fff"}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{saved ? "Remove to Wishlist" : "Add to Wishlist"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
