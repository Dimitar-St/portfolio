import Image from "next/image";
import { portfolio } from "@/app/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/Services";

const { profile, socialLinks } = portfolio;

export function Hero() {
  return (
    <Reveal>
      <section
        id="home"
        className="scroll-mt-20 border-b border-zinc-200 bg-[#FAFAF9]"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-teal-700">
                {profile.tagline}
              </p>

              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                {profile.headline}
              </h1>

              <div className="mt-6 max-w-xl space-y-4 text-[1rem] leading-7 text-zinc-600 sm:text-[1.05rem]">
                {profile.heroParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
                <span className="h-2 w-2 rounded-full bg-teal-600" />
                {profile.availability}
              </div>

              <div className="mt-6 flex max-w-xl flex-wrap gap-2">
                {profile.heroStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[0.8rem] font-medium text-zinc-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex h-12 w-48 items-center justify-center rounded-full bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  Let&apos;s work together
                </a>
              </div>

              <div className="mt-9 flex items-center justify-center gap-3 text-zinc-500">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  Find me on
                </span>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-teal-600 hover:text-teal-700"
                  >
                    {link.label === "GitHub" ? <GitHubIcon /> : <LinkedInIcon />}
                  </a>
                ))}
              </div>
            </div>

            <div className="justify-self-start lg:justify-self-end">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={640}
                priority
                className="h-66 w-66 rounded-full border border-zinc-200 object-cover shadow-sm sm:h-64 sm:w-64"
              />
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
