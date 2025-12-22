"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <Button
      variant="default"
      className="size-10 rounded-full fixed bottom-10 right-8"
      onClick={scrollTop}
    >
      <ArrowUp />
    </Button>
  );
}
