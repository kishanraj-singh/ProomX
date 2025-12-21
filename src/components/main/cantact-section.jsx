import { Mail, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <Link href="mailto:support@resneed.online">
      <div className="w-full flex flex-wrap items-center gap-4 bg-green-200/5 p-4 rounded-md cursor-pointer hover:[&_button]:scale-105 ">
        <Button className="rounded-full transition-all duration-300 relative after:content-['EMAIL'] after:text-[10px] after:text-white after:px-2.5 after:py-0.5 after:absolute after:-top-2 after:-right-2 after:bg-green-500 after:rounded-full">
          <Mail /> Get in Touch
        </Button>
        <p className="text-gray-500 flex items-center ml-1.5">
          For questions, suggestions, or collaboration inquiries, feel free to
          get in touch anytime.
        </p>
        <MoveRight size={15} />
      </div>
    </Link>
  );
}
