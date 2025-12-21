"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

export default function NProgressProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      nProgress.start();
      const timer = setTimeout(() => {
        nProgress.done();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
