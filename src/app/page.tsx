import { ShaderBackground } from "@/components/ShaderBackground";
import { TopNavBar } from "@/components/TopNavBar";
import { SideNavBar } from "@/components/SideNavBar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <TopNavBar />
      <SideNavBar />

      <main className="relative z-10 pt-32 md:ml-20">
        <Hero />
        <About />
        <FeaturedWork />
      </main>

      <Footer />
    </>
  );
}
