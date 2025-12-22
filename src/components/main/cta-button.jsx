"use client";

import { ChevronDownIcon, CircleArrowDownIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function CTA() {
  const handleExplore = () => {
    const section = document.getElementById("explore");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-center gap-5 [&_button]:w-full sm:[&_button]:w-40 [&_button]:h-10">
      <Button onClick={handleExplore}>
        <CircleArrowDownIcon /> Start Now
      </Button>
      <Button variant="outline">
        <ChevronDownIcon /> Categories
      </Button>
    </div>
  );
}
