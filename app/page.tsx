import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Technologies } from "@/components/Technologies";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-zinc-900 antialiased">
      <Nav />
      <Hero />
      <Services />
      <Experience />
      <Technologies />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
