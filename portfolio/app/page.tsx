export const revalidate = 60; // re-fetch Sanity data at most every 60 seconds

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects, getSettings } from "@/lib/queries";

export default async function Page() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);

  return (
    <>
      <Navbar />
      <main>
        <Hero settings={settings} />
        <Work projects={projects} />
        <About settings={settings} />
        <Contact settings={settings} />
      </main>
      <Footer />
    </>
  );
}
