"use client";
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="w-full min-h-[50dvh] flex flex-col justify-center items-center gap-1">
      <h1 className="text-xl font-[500]">Somthing went wrong</h1>
      <h2 className="text-muted-foreground font-[400]">Try Again</h2>
      <Button className="my-4-">Try Again</Button>
    </div>
  );
}
