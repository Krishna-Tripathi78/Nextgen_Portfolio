import {
  AboutSection,
  AchievementsSection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/sections";
import { RatingWrapper } from "@/components/RatingWrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal>
        <SkillsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal>
        <EducationSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal>
        <CertificationsSection />
      </ScrollReveal>
      <ScrollReveal>
        <AchievementsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
      <RatingWrapper />
    </>
  );
}

export default PortfolioContent;