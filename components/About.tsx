import { portfolio } from "@/app/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const { aboutParagraphs } = portfolio;

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <SectionHeading eyebrow="About" title="Engineer, not just a stack" />

        <div className="mt-8 max-w-3xl space-y-5 text-[1rem] leading-7.5 text-zinc-600 sm:text-[1.05rem] sm:leading-8">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
