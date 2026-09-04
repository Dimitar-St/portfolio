import { portfolio } from "@/app/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const { technologies } = portfolio;

export function Technologies() {
  return (
    <section
      id="technologies"
      className="scroll-mt-20 border-y border-zinc-200 bg-[#F7F7F5]"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Technologies"
          title="Tools I work with"
          description="The stack I reach for most. I pick tools for the problem, and I'm comfortable moving between languages and platforms."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((category) => (
            <div key={category.name} className="border-t border-zinc-200 pt-5">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {category.name}
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[0.85rem] font-medium text-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
