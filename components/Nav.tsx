"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { portfolio } from "@/app/data/portfolio";
import { CloseIcon, MenuIcon } from "@/components/icons";

const { profile, navItems } = portfolio;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      const marker = window.scrollY + 120;
      let current = "";
      for (const el of sections) {
        if (marker >= el.offsetTop) {
          current = el.id;
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 32
      ) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full bg-[#0A3A35] px-5 py-2.5 shadow-[0_12px_32px_rgba(10,58,53,0.28)]">
        <a
          href="#home"
          onClick={close}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt={profile.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition ${
                active === item.href.slice(1)
                  ? "bg-white/15 text-white"
                  : "text-teal-50/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="mx-auto mt-2 w-full max-w-5xl rounded-3xl border border-white/10 bg-[#0A3A35] shadow-[0_16px_32px_rgba(10,58,53,0.28)] md:hidden"
        >
          <ul className="flex flex-col gap-1 px-3 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className={`block rounded-full px-4 py-2.5 text-[0.95rem] font-medium ${
                    active === item.href.slice(1)
                      ? "bg-white/15 text-white"
                      : "text-teal-50/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
