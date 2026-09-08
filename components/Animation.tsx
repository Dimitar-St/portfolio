"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedSection({
  children,
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const isInView = useInView(ref, {
    amount: 0.5,
    margin: "-20% 0px -20% 0px",
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => setIsSmallScreen(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <motion.section
      ref={ref}
      animate={
        isSmallScreen
          ? {
            scale: isInView ? 1 : 0.96,
            opacity: isInView ? 1 : 0.85,
          }
          : {
            scale: 1,
            opacity: 1,
          }
      }
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`
        border-2 border-transparent
        rounded-2xl

        transition-all duration-300 ease-out

        max-md:[&[data-visible='true']]:border-[#0a3a35]

        md:hover:border-[#0a3a35]
        md:hover:bg-[#0a3a35]/5
        md:hover:scale-[1.03]
        md:hover:-translate-y-1
        md:hover:shadow-xl

        ${className}
      `}
      data-visible={isSmallScreen && isInView}
    >
      {children}
    </motion.section>
  );
}
