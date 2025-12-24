"use client";

import {
  Briefcase,
  ChevronDownIcon,
  CircleArrowDownIcon,
  Code,
  FileText,
  Images,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ChevronDownIcon /> Categories
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/writing-content">
              <Button variant="ghost">
                <FileText />
                Writing & Content
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/marketing-sales">
              <Button variant="ghost">
                <TrendingUp />
                Marketing & Sales
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/coding-development">
              <Button variant="ghost">
                <Code />
                Coding & Development
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/design-image">
              <Button variant="ghost">
                <Images />
                Design & Image
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/business-productivity">
              <Button variant="ghost">
                <Briefcase />
                Business & Productivity
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
