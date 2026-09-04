import { portfolio } from "@/app/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const { services } = portfolio;

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="How I Can Help"
          description="Areas where I can plug into your team and take engineering work from design through delivery."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="border-t border-zinc-200 pt-5">
              <h3 className="text-[1.05rem] font-semibold tracking-tight text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-6 text-zinc-600">
                {service.description}
              </p>
            </div>
          ))}

          <div className="flex items-end border-t border-zinc-200 pt-5">
            <p className="text-[0.93rem] leading-6 text-zinc-500">
              Not sure if your project fits? Reach out — I&apos;ll give you a
              straight answer about scope and fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
