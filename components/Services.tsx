"use client";
import { portfolio } from "@/app/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/Animation";
import { motion } from "motion/react";

const { services } = portfolio;

export function Reveal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}


export function Services() {
  return (
    <Reveal>
      <section id="services" className="scroll-mt-20 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="How I can help"
            description="Areas where I can plug into your team and take engineering work from design through delivery."
          />

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <AnimatedSection key={service.title} className="p-6">
                <div key={service.title} className="group">
                  <h3 className="text-[1.05rem] font-semibold tracking-tight text-zinc-900
                   transition-colors duration-300
                   group-hover:text-[#0a3a35]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[0.93rem] leading-6 text-zinc-600">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
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
    </Reveal>
  );
}
