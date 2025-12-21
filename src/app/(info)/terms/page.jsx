//imports
import { Mail } from "lucide-react";

export const metadata = {
  title: "Terms",
};

export default function Terms() {
  return (
    <div className="w-full h-full p-[10%] py-8 flex justify-start">
      <div className="w-full sm:w-4xl flex flex-col gap-12 [&_h2]:text-[18px] [&_li]:text-[17px]">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-semibold">
            Terms of use
          </h1>
        </div>

        <div className="w-full flex flex-col gap-2.5">
          <h2 className="text-muted-foreground">
            Last Updated:
            <span className="text-primary"> 25 December, 2025</span>
          </h2>

          <p className="text-muted-foreground mt-2">
            Welcome to ProomX. By accessing or using this website, you agree to
            be bound by these Terms of Service. If you do not agree with these
            terms, you must not use the website.
          </p>

          <p className="text-muted-foreground mt-2">
            ProomX is a free, publicly accessible platform that provides curated
            AI prompts for informational and educational purposes only. The
            platform does not require user registration, account creation, or
            login, and users are not permitted to submit, upload, or publish
            content on the website.
          </p>

          <p className="text-muted-foreground mt-2">
            All content available on ProomX, including prompts, text, and other
            materials, is owned by or licensed to ProomX unless otherwise
            stated. You may view, copy, and use the content for personal or
            internal use, but you may not redistribute, resell, modify, or
            exploit the content for commercial purposes without prior written
            permission from ProomX.
          </p>

          <p className="text-muted-foreground mt-2">
            ProomX is intended for users who are at least 13 years of age. By
            using this website, you confirm that you meet this age requirement.
            If you are under 13, you must not access or use ProomX.
          </p>

          <p className="text-muted-foreground mt-2">
            The content provided on ProomX is offered “as is” and without
            warranties of any kind. While we strive to provide high-quality
            prompts, we do not guarantee the accuracy, effectiveness, or
            suitability of any content. ProomX shall not be held liable for any
            loss, damage, or consequences resulting from the use of the website
            or its content.
          </p>

          <p className="text-muted-foreground mt-2">
            We reserve the right to modify, suspend, or discontinue any part of
            the website at any time without notice. Continued use of ProomX
            after changes are made constitutes acceptance of the revised Terms
            of Service.
          </p>

          <p className="text-muted-foreground mt-2">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of India. Any disputes arising from the use
            of ProomX shall be subject to the exclusive jurisdiction of the
            courts of India.
          </p>

          <br />

          <h2 className="text-xl text-primary font-semibold">Contact us</h2>
          <p className="text-muted-foreground mt-2">
            If you have any questions regarding these Terms of Service, you may
            contact us at:
          </p>
          <p className="text-muted-foreground mt-2 flex gap-2.5 items-center">
            <Mail size={18} /> Email:
            <span className=" text-primary">support@resneed.online</span>
          </p>
          <p className="text-muted-foreground mt-2">
            We will respond as quickly as possible.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}
