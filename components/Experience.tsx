import { portfolio } from "@/app/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const { experience } = portfolio;

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="A track record of production engineering"
          description="Recent roles focused on building and operating backend and full-stack systems."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
          {experience.map((entry) => (
            <div key={entry.company} className="border-t border-zinc-200 pt-5">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {entry.company}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900">
                {entry.role}
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-6 text-zinc-600">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
