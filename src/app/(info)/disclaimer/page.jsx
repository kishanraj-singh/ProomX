//imports
import { Mail } from "lucide-react";

export const metadata = {
  title: "Disclaimer",
};

export default function Disclaimer() {
  return (
    <div className="w-full h-full p-[10%] py-8">
      <div className="w-full sm:w-4xl flex flex-col gap-2.5 [&_p]:text-[18px] [&_li]:text-[17px]">
        <h1 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-semibold">
          Disclaimer
        </h1>

        <br />

        <h2 className="text-muted-foreground">
          Last Updated:
          <span className="text-primary"> 25 December, 2025</span>
        </h2>

        <p className="text-muted-foreground mt-2">
          The information, prompts, and content provided on ProomX are made
          available for general informational and educational purposes only. All
          content is provided on an “as is” and “as available” basis, without
          any representations or warranties of any kind, whether express or
          implied. ProomX makes no guarantees regarding the accuracy,
          completeness, reliability, or suitability of any content or prompts
          available on the platform.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX offers curated AI prompts intended for use with third-party
          artificial intelligence tools. AI-generated outputs may be inaccurate,
          incomplete, outdated, or misleading and should not be relied upon
          without independent verification. Users are solely responsible for
          reviewing, validating, and applying any AI-generated content before
          using it for personal, professional, or commercial purposes.
        </p>

        <p className="text-muted-foreground mt-2">
          The content available on ProomX does not constitute legal, medical,
          financial, business, or other professional advice. ProomX is not a
          substitute for consultation with qualified professionals, and users
          should seek appropriate expert guidance before making decisions based
          on AI-generated outputs or prompt-based results.
        </p>

        <p className="text-muted-foreground mt-2">
          Use of ProomX and its content is entirely at the user’s own risk.
          ProomX shall not be liable for any losses, damages, or consequences
          arising from the use of, or reliance on, any content, prompts, or
          AI-generated outputs obtained through the platform. This includes,
          without limitation, direct, indirect, incidental, consequential, or
          special damages, including loss of data, revenue, profits, or
          reputation.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX is an independent platform and is not affiliated with, endorsed
          by, or officially associated with any third-party AI service
          providers. Any use of third-party tools is subject to their respective
          terms, policies, and limitations, over which ProomX has no control.
        </p>

        <p className="text-muted-foreground mt-2">
          By using ProomX, you agree to use the platform responsibly and in
          compliance with all applicable laws and regulations. ProomX shall not
          be held responsible for any misuse of the platform or its content.
        </p>

        <br />

        <h2 className="text-xl text-primary font-semibold">Contact us</h2>
        <p className="text-muted-foreground mt-2">
          If you have any questions regarding this Disclaimer, please contact us
          at:
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
  );
}
