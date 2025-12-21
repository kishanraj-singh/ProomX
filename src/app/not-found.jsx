"use client";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full min-h-[50dvh] flex flex-col justify-center items-center gap-1">
      <h1 className="text-3xl font-semibold"> 404</h1>
      <h2 className="text-muted-foreground font-[400]">Page not Found</h2>
      <a href="/">
        <Button className="my-4">Home page</Button>
      </a>
    </div>
  );
}
