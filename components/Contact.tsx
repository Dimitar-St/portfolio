import { portfolio } from "@/app/data/portfolio";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/Services";

const { contact, socialLinks } = portfolio;

export function Contact() {
  return (
    <Reveal>
      <section
        id="contact"
        className="scroll-mt-20 bg-[#0F4C45] text-white"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-teal-200">
              Contact
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {contact.heading}
            </h2>

            <div className="mt-6 space-y-4 text-[1rem] leading-7 text-teal-50/90">
              {contact.copy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex h-12 w-48 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#0F4C45] transition hover:bg-teal-50"
              >
                <EmailIcon />
                {contact.ctaLabel}
              </a>

              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-12 w-48 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
                >
                  {link.label === "GitHub" ? <GitHubIcon /> : <LinkedInIcon />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
