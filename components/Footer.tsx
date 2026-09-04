import { portfolio } from "@/app/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const { profile, socialLinks } = portfolio;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A3A35] text-teal-50/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
        <p className="text-sm">
          © {year} {profile.name}
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-teal-50/80 transition hover:border-white/50 hover:text-white"
            >
              {link.label === "GitHub" ? <GitHubIcon /> : <LinkedInIcon />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
