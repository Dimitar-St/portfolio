import { portfolio } from "@/app/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const { projects } = portfolio;

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 border-y border-zinc-200 bg-[#F7F7F5]">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Engineering case studies"
          description="A few examples of the kind of backend, platform, and full-stack work I take on. Some client work is under NDA, so a project may link out when it can."
        />

        <div className="mt-10 space-y-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                  {project.title}
                </h3>

                {project.links && project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-teal-700 hover:text-teal-700"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-teal-700">
                    Problem
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-6.5 text-zinc-600">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-teal-700">
                    What I Built
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-6.5 text-zinc-600">
                    {project.whatIBuilt}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-100 pt-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[0.8rem] font-medium text-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
