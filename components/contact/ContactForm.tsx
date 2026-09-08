"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { portfolio } from "@/app/data/portfolio";
import { SelectableOption } from "./SelectableOption";

export type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
  intention: string;
  context: string;
};

const { contact, socialLinks } = portfolio;
const inputClass = "mt-2 block min-h-12 w-full rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-base text-white placeholder:text-teal-50/60 transition-colors duration-300 hover:border-white/50 focus:border-teal-200 focus:outline-2 focus:outline-offset-2 focus:outline-teal-200 motion-reduce:transition-none";

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({ name: "", email: "", company: "", message: "", website: "", intention: "", context: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const intention = contact.intentions.find((option) => option.id === form.intention);
  const pending = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update(field: "name" | "email" | "company" | "message" | "website", value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("sending");
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok || (await response.json()).ok !== true) throw new Error("Delivery failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  const messageField = (
    <label htmlFor="contact-message" className="block text-base font-semibold">Tell me a little about what you&apos;re working on
          <textarea id="contact-message" name="message" required rows={4} maxLength={5000} value={form.message} onChange={(event) => { update("message", event.target.value); event.target.setCustomValidity(event.target.value.trim() ? "" : "Please tell me a little about what you’re working on."); }} placeholder="You don't need to know the technical details. Just tell me about the idea, problem, role, or project and I'll take it from there." className={`${inputClass} resize-y font-normal`} />
        </label>
  );

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="mt-10 rounded-2xl border border-white/25 p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200 sm:p-8">
        <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-200 text-[#0F4C45]">✓</span>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">Thanks — I&apos;ll get back to you soon.</h3>
        <div className="mt-4 flex items-center gap-3 text-sm">
          {socialLinks.map((link, index) => (
            <span key={link.label} className="inline-flex items-center gap-3">
              {index > 0 && <span aria-hidden="true" className="text-teal-200">·</span>}
              <a href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-white/40 underline-offset-4 transition hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200">{link.label}</a>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="mt-10" aria-label="Tell me what you’re working on" aria-busy={status === "sending"}>
      <fieldset disabled={status === "sending"} className="min-w-0 space-y-7 disabled:opacity-70">
        <fieldset className="min-w-0">
          <legend className="text-base font-semibold">What can I help you with?</legend>
          <p className="mt-1 text-sm text-teal-50/75">Pick what fits, or skip ahead to your message.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {contact.intentions.map((option) => (
              <SelectableOption
                key={option.id}
                name="intention"
                label={option.label}
                description={option.description}
                checked={form.intention === option.id}
                onChange={() => setForm((previous) => ({ ...previous, intention: option.id, context: "" }))}
              />
            ))}
          </div>
        </fieldset>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {intention?.followUp ? `Optional question: ${intention.followUp.heading}` : intention ? "You can go straight to your message." : ""}
        </div>
        {intention?.followUp && (
          <fieldset className="min-w-0">
            <legend className="text-base font-semibold">{intention.followUp.heading} <span className="text-sm font-normal text-teal-50/75">(optional)</span></legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {intention.followUp.options.map((label) => (
                <SelectableOption key={label} name="context" label={label} checked={form.context === label} onChange={() => setForm((previous) => ({ ...previous, context: label }))} />
              ))}
            </div>
          </fieldset>
        )}
        {form.intention === "other" && messageField}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium" htmlFor="contact-name">Name
            <input id="contact-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" title="Please enter your name." value={form.name} onChange={(event) => update("name", event.target.value)} className={inputClass} />
          </label>
          <label className="text-sm font-medium" htmlFor="contact-email">Email
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={(event) => update("email", event.target.value)} className={inputClass} />
          </label>
          <label className="text-sm font-medium sm:col-span-2" htmlFor="contact-company">Company / Team <span className="font-normal text-teal-50/75">(optional)</span>
            <input id="contact-company" name="company" autoComplete="organization" maxLength={150} value={form.company} onChange={(event) => update("company", event.target.value)} className={inputClass} />
          </label>
        </div>
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-website">Leave this empty</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} />
        </div>
        {form.intention !== "other" && messageField}
        <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0F4C45] transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200 disabled:cursor-wait motion-reduce:transition-none sm:w-auto">
          {status === "sending" ? "Starting the conversation…" : <>{contact.ctaLabel} <span aria-hidden="true">→</span></>}
        </button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {status === "sending" && <p className="sr-only">Sending your message.</p>}
        {status === "error" && <p className="mt-4 text-sm leading-6 text-teal-50">Something went wrong. You can also reach me directly at <a href={`mailto:${contact.email}`} className="break-all underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200">{contact.email}</a>. Your details are still here — please try again.</p>}
      </div>
    </form>
  );
}
