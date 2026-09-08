import { portfolio } from "@/app/data/portfolio";
import { ContactForm } from "@/components/contact/ContactForm";

const { contact, profile } = portfolio;

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 bg-[#0F4C45] text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-teal-200">Contact</p>
          <h2 id="contact-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{contact.heading}</h2>
          <p className="mt-5 flex items-start gap-2 text-sm text-teal-200">
            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-200" />
            {profile.availability}
          </p>
          <div className="mt-4 space-y-4 text-base leading-7 text-teal-50/90">
            {contact.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <ContactForm />
        <p className="mt-8 border-t border-white/25 pt-6 text-sm leading-6 text-teal-50/90">
          Prefer email?{" "}
          <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center break-all font-medium text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200">{contact.email}</a>
        </p>
      </div>
    </section>
  );
}
