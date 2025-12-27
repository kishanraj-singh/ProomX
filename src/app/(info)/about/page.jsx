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
          Made with ❤️ for you
        </h2>

        <p className="text-muted-foreground mt-2">
          ProomX is a free AI prompt library built to help users interact more
          effectively with modern AI tools. The platform offers carefully
          written prompts that can be used with ChatGPT, Gemini, and other
          cloud-based AI systems to generate better and more relevant results.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX itself does not create or process AI-generated content.
          Instead, it focuses on providing structured prompts that guide
          third-party AI platforms to produce outputs such as text, images,
          code, or other responses based on user needs. The quality and nature
          of the output depend entirely on the AI tool being used and how the
          prompt is applied.
        </p>

        <p className="text-muted-foreground mt-2">
          The goal of ProomX is to make AI usage simpler, faster, and more
          accessible for students, creators, developers, and general users
          around the world. The platform is fully free to use and does not
          require users to create accounts or log in. ProomX is intended as a
          helpful resource for learning, experimentation, and productivity.
        </p>

        <p className="text-muted-foreground mt-2">
          This project is fully free and intended for students, creators,
          developers, and anyone interested in using AI more effectively. ProomX
          is designed as a practical utility rather than a complex product, with
          a focus on clarity, usefulness, and ease of use.
        </p>

        <p className="text-muted-foreground mt-2">
          ProomX is Developed by{" "}
          <Link
            href="https://about.me/kishanrajsingh"
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
