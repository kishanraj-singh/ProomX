"use client";
//imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  //variables
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);

  //functions
  //handle signin
  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      setProcessing(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified) {
        toast.success("LogIn Successfully!");
        router.replace("/admin");
      } else {
        sendEmailVerification(auth.currentUser);
        toast.error("Please verify your email before continuing.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessing(false);
    }
  };
  //
  return (
    <div className="min-h-[100dvh] flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
      <Card className="w-[300px] md:w-[350px]">
        <CardHeader>
          <CardTitle>Hello ProomX's Admin</CardTitle>
          <CardDescription>Login to access admin Dashboard </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <p className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </p>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" onClick={handleLogIn}>
                  {processing ? <Spinner /> : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  <Link
                    href="/"
                    className="flex items-center justify-center pr-1"
                  >
                    <ChevronLeft size={13} />
                    Back
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
