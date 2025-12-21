"use client";

import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

export default function AuthGuard({ children, type }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (detectedUser) => {
      if (detectedUser) {
        setUser(detectedUser);
      } else {
        router.replace("/admin/login");
      }
    });
  }, []);

  if (user) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-[100dvh] flex flex-1 justify-center items-center">
      <Spinner className="size-10" />
    </div>
  );
}
