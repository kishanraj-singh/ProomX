"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHight = window.innerHeight;
      const documentHight = document.documentElement.scrollHeight;
      if (scrollTop > 100 && scrollTop + windowHight <= documentHight - 10) {
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
      className="size-10 rounded-full fixed bottom-10 right-8 z-10"
      onClick={scrollTop}
    >
      <ArrowUp />
    </Button>
  );
}
