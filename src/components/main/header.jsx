"use client";

import { useState } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  BookmarkIcon,
  Briefcase,
  CircleAlert,
  Code,
  Compass,
  FileText,
  GlobeLock,
  Images,
  Mail,
  MenuIcon,
  ReceiptText,
  Search,
  TrendingUp,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import ThemeToggleButton from "./theme-toggle-button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Header() {
  const router = useRouter();
  const { query } = useParams();
  const [searchq, setSearchq] = useState(decodeURIComponent(query || ""));
  const [searchSheetOpen, setSearchSheetOpen] = useState(false);
  const [menuSheetOpen, setMenuSheetOpen] = useState(false);

  const searchHandle = (e) => {
    if (e.key === "Enter") {
      setSearchSheetOpen(false);
      router.push(`/search/${searchq}`);
    }
  };

  return (
    <>
      <div className="w-full h-[80px] flex px-[3%] py-2 px-[3%] items-center justify-between fixed top-0 left-0 right-0 backdrop-blur-xl z-10 border-b border-muted-foreground/15">
        <div className="flex items-center gap-2">
          <div className="flex items-center [@media(min-width:820px)]:hidden">
            <Sheet open={menuSheetOpen} onOpenChange={setMenuSheetOpen}>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[90%] [&>button]:hidden bg-card"
              >
                <SheetHeader>
                  <div className="!flex justify-between">
                    <SheetTitle>
                      <Link href="/">
                        <Image
                          draggable={false}
                          src="/logo-full.png"
                          alt="ProomX"
                          width={384}
                          height={128}
                          className="w-[120px] invert dark:invert-0"
                        />
                      </Link>
                    </SheetTitle>
                    <SheetClose>
                      <X size={18} />
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div
                  className="w-full flex flex-col gap-2.5 px-2.5"
                  onClick={() => setMenuSheetOpen(false)}
                >
                  <label className="text-muted-foreground text-sm px-3+">
                    Categories
                  </label>
                  <Link href="/writing-content">
                    <Button variant="ghost">
                      <FileText />
                      Writing & Content
                    </Button>
                  </Link>
                  <Link href="/marketing-sales">
                    <Button variant="ghost">
                      <TrendingUp />
                      Marketing & Sales
                    </Button>
                  </Link>
                  <Link href="/coding-development">
                    <Button variant="ghost">
                      <Code />
                      Coding & Development
                    </Button>
                  </Link>
                  <Link href="/design-image">
                    <Button variant="ghost">
                      <Images />
                      Design & Image
                    </Button>
                  </Link>
                  <Link href="/business-productivity">
                    <Button variant="ghost">
                      <Briefcase />
                      Business & Productivity
                    </Button>
                  </Link>

                  <Separator />

                  <Link href="/about">
                    <Button variant="ghost">
                      <Compass /> Explore
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="ghost">
                      <CircleAlert /> About
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost">
                      <Mail /> Contact
                    </Button>
                  </Link>
                  <div className="w-full flex justify-between items-center bg-secondary rounded-md py-2.5 px-4">
                    <p className="text-muted-foreground">Appearance</p>
                    <ThemeToggleButton />
                  </div>
                </div>
                <SheetFooter>
                  <p className="text-sm text-muted-foreground">
                    &copy; 2025 ProomX, All rights reserved.
                  </p>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex gap-2">
            <Image
              draggable={false}
              src="/logo-main.png"
              alt="ProomX"
              width={512}
              height={512}
              className="w-13 h-13 rounded-full invert dark:invert-0"
            />
          </Link>

          <div className="hidden [@media(min-width:820px)]:block ml-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium cursor-pointer bg-transparent">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="grid [&_button]:justify-start">
                    <NavigationMenuLink asChild>
                      <Link href="/writing-content">
                        <Button variant="ghost">
                          <FileText />
                          Writing & Content
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/marketing-sales">
                        <Button variant="ghost">
                          <TrendingUp />
                          Marketing & Sales
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/coding-development">
                        <Button variant="ghost">
                          <Code />
                          Coding & Development
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/design-image">
                        <Button variant="ghost">
                          <Images />
                          Design & Image
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/business-productivity">
                        <Button variant="ghost">
                          <Briefcase />
                          Business & Productivity
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/explore"
                      className="font-medium cursor-pointer px-4"
                    >
                      Explore
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="font-medium cursor-pointer px-4"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="font-medium cursor-pointer px-4"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center">
          <div className="block xl:hidden">
            <Sheet open={searchSheetOpen} onOpenChange={setSearchSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary" className="cursor-pointer mr-2">
                  <Search size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="[&>button.absolute]:top-[50%] [&>button.absolute]:translate-y-[-50%]"
              >
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex w-full h-10 items-center px-[2px] [&_svg]:text-primary/50">
                      <Search size={18} />
                      <input
                        type="text"
                        placeholder="Search for Bundles..."
                        onKeyPress={searchHandle}
                        value={searchq}
                        onChange={(e) => setSearchq(e.target.value)}
                        className="bg-transparent border-0 outline-0 flex-1 px-[15px] font-normal"
                      />
                    </div>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden xl:flex w-[400px] h-10 rounded-3xl bg-secondary items-center [&_svg]:text-primary/50 px-[20px] mx-5">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search for Bundles..."
              onKeyPress={searchHandle}
              value={searchq}
              onChange={(e) => setSearchq(e.target.value)}
              className="bg-transparent border-0 outline-0 flex-1 px-[15px]"
            />
            {searchq !== "" && (
              <X
                size={18}
                className="cursor-pointer"
                onClick={() => setSearchq("")}
              />
            )}
          </div>

          <Link href="/saved">
            <Button variant="secondary">
              <BookmarkIcon />
            </Button>
          </Link>

          <Link
            href="https://github.com/kishanraj-singh/ProomX"
            target="_blank"
          >
            <Button className="ml-2">
              <GitHubLogoIcon /> GitHub
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
