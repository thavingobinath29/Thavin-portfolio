import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Timeline from "@/components/timeline/Timeline";
import Certs from "@/components/certifications/Certs";
import GithubStats from "@/components/github/GithubStats";
import Achievements from "@/components/achievements/Achievements";
import Contact from "@/components/contact/Contact";
import { getGithubStats } from "@/lib/github";

export const revalidate = 3600; // Revalidate page data every hour

export default async function Home() {
  // Server-side fetch of GitHub statistics (1hr reval config)
  const stats = await getGithubStats("thavingobinath29");

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certs />
      <GithubStats stats={stats} />
      <Achievements />
      <Contact />
    </>
  );
}
