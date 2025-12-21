//imports
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <div className="w-full h-full p-[10%] py-8">
      <div className="w-full sm:w-4xl flex flex-col gap-2.5 [&_p]:text-[18px] [&_li]:text-[17px]">
        <h1 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-semibold">
          Contact
        </h1>

        <br />

        <p className="text-muted-foreground">
          Thank you for visiting ProomX. If you have any questions, feedback, or
          suggestions related to the platform, feel free to reach out. We value
          user input and aim to continuously improve the experience.
        </p>

        <p className="text-muted-foreground mt-2">
          You can contact us for general inquiries, feedback, content-related
          questions, technical issues, or legal and policy matters.
        </p>

        <p className="text-muted-foreground mt-2 flex flex-wrap gap-2.5 items-center">
          <Mail size={18} /> Email:
          <span className="text-primary flex items-center gap-1">
            support@resneed.online
          </span>
        </p>

        <p className="text-muted-foreground mt-2">
          We aim to respond to all emails within 24–48 hours.
        </p>

        <p className="text-muted-foreground mt-2">
          Please note that ProomX does not provide personalized AI support,
          prompt customization, or individual consulting services.
        </p>

        <p className="text-muted-foreground mt-2">
          By contacting, you agree to our Terms of Service and Privacy Policy.
        </p>

        <br />

        <Link href="mailto:support@resneed.online">
          <Button className="w-30">
            <Mail />
            Contact
          </Button>
        </Link>

        <br />
      </div>
    </div>
  );
}
