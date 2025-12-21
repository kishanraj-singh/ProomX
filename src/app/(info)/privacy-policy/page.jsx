//imports
import { Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full h-full p-[10%] py-8 flex justify-start">
      <div className="w-full sm:w-4xl flex flex-col gap-12 [&_h2]:text-[18px] [&_li]:text-[17px]">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-semibold">
            Privacy Policy
          </h1>
        </div>

        <div className="w-full flex flex-col gap-2.5">
          <h2 className="text-muted-foreground">
            Last Updated:
            <span className="text-primary"> 25 December, 2025</span>
          </h2>

          <p className="text-muted-foreground mt-2">
            ProomX respects your privacy and is committed to protecting it. This
            Privacy Policy explains how we handle information when you visit our
            website.
          </p>

          <p className="text-muted-foreground mt-2">
            ProomX does not collect, store, or process any personal data from
            users. We do not require account registration, login, or
            authentication, and we do not collect names, email addresses,
            payment information, or any other personally identifiable
            information.
          </p>

          <p className="text-muted-foreground mt-2">
            ProomX does not use cookies, analytics tools, tracking technologies,
            or advertising trackers. We do not monitor user behavior, usage
            patterns, or browsing activity on the website.
          </p>

          <p className="text-muted-foreground mt-2">
            The platform is hosted using third-party infrastructure services,
            including Firebase and Cloudinary. These services may process
            limited technical information such as IP addresses or server logs as
            part of normal website delivery and performance. Such processing is
            governed by the respective privacy policies of those service
            providers, and ProomX does not control or store this information.
          </p>

          <p className="text-muted-foreground mt-2">
            Since ProomX does not collect personal data, users are not required
            to request access, correction, or deletion of data. If this policy
            changes in the future, we will update this page accordingly.
          </p>

          <p className="text-muted-foreground mt-2">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and continued use of the website
            constitutes acceptance of the updated policy.
          </p>

          <br />

          <h2 className="text-xl text-primary font-semibold">Contact us</h2>
          <p className="text-muted-foreground mt-2">
            If you have any questions or concerns about this Privacy Policy, you
            may contact us at:
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
