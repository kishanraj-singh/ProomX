"use client";

import DataTable from "@/components/admin/DataTable";
import SectionCards from "@/components/admin/SectionCards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/components/wrappers/auth-guard";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Page() {
  const [adminProfile, setAdminProfile] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (detectedAdmin) => {
      if (detectedAdmin) {
        setAdminProfile(detectedAdmin);
      }
    });
  }, []);

  return (
    <AuthGuard>
      <div className="w-full flex flex-col">
        <header className="px-[3%]">
          <div className="flex justify-between items-center py-2.5">
            <div className="flex gap-2.5 items-center">
              <Avatar>
                <AvatarFallback>
                  {adminProfile
                    ? adminProfile.email.slice(0, 1).toUpperCase()
                    : "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-base font-medium px-1">
                  {adminProfile ? adminProfile.email : "loading..."}
                </h1>
                <h1 className="text-[13px] text-muted-foreground font-medium px-1">
                  {adminProfile ? adminProfile.uid : "loading..."}
                </h1>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive">
              Sign Out
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 px-[3%]">
              <SectionCards />
              <DataTable />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
