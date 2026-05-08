import { pageMetadata } from "@/lib/constants";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionLine from "@/components/sections/about/MissionLine";
import ValuesAccordion from "@/components/sections/about/ValuesAccordion";
import CustomerCarousel from "@/components/sections/about/CustomerCarousel";
import OfficesLine from "@/components/sections/about/OfficesLine";
import ImageMosaic from "@/components/sections/about/ImageMosaic";
import PageCTA from "@/components/ui/PageCTA";

export const metadata = pageMetadata(
  "About",
  "Pair builds AI agents that deliver personalized, empathetic customer experiences across every channel. Meet the team and the mission."
);

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionLine />
      <ValuesAccordion />
      <CustomerCarousel />
      <OfficesLine />
      <ImageMosaic />
      <PageCTA />
    </>
  );
}
