"use client";

import { CircleArrowDownIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ExploreButton() {
  const handleExplore = () => {
    const section = document.getElementById("explore");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button className="min-w-30" onClick={handleExplore}>
      <CircleArrowDownIcon /> Explore
    </Button>
  );
}
