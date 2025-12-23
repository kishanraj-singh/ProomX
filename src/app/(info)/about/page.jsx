import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <div
      className="w-full h-full
    
    
    p-[10%] py-8"
    >
      <div className="w-full sm:w-4xl flex flex-col gap-2.5 [&_p]:text-[18px] [&_li]:text-[17px]">
        <h1 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-semibold">
          About ProomX
        </h1>

        <br />

        <h2 className="flex items-center gap-2.5 text-muted-foreground">
          ❤️ Created with love
        </h2>

        <p className="text-muted-foreground mt-2">
          ProomX is a curated AI prompt library designed to help individuals and
          professionals use AI tools more effectively. The platform offers
          structured prompt collections across writing, coding, design, image
          generation, marketing, and productivity — all organized for clarity,
          reuse, and practical application.
        </p>

        <p className="text-muted-foreground mt-2">
          The idea behind ProomX is simple: well-crafted prompts lead to better
          outcomes. Instead of spending time experimenting or searching across
          scattered sources, users can explore ready-to-use prompt bundles
          created for real-world scenarios. Each prompt is written to be clear,
          actionable, and easy to adapt.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX is built as an open and accessible resource. There is no
          sign-up or login system, and no personal data is collected from users.
          All content on the platform is freely available, and ProomX does not
          use analytics, tracking technologies, or advertising tools.
        </p>

        <p className="text-muted-foreground mt-2">
          The platform prioritizes simplicity and focus. Rather than adding
          unnecessary features, ProomX emphasizes clean organization,
          straightforward navigation, and a distraction-free experience. Prompt
          bundles are grouped into clear categories to help users quickly find
          and reuse prompts that fit their needs.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX continues to evolve as AI tools and use cases grow. New prompt
          bundles are added over time, reflecting practical workflows and
          emerging trends in AI usage.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX is an independent project by{" "}
          <Link
            href="https://www.resneed.online"
            target="_blank"
            className="underline"
          >
            Kishan Raj Singh
          </Link>
          .
        </p>

        <br />
      </div>
    </div>
  );
}
