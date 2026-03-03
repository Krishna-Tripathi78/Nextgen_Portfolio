import { RatingWrapper } from "@/components/RatingWrapper";
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
import { ScrollReveal } from "@/components/ui/scroll-reveal";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <ScrollReveal variant="fade-up">
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal variant="zoom" delay={100}>
        <SkillsSection />
      </ScrollReveal>
      <ScrollReveal variant="fade-left" delay={150}>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal variant="fade-right" delay={100}>
        <EducationSection />
      </ScrollReveal>
      <ScrollReveal variant="blur" delay={200}>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal variant="zoom" delay={150}>
        <CertificationsSection />
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={100}>
        <AchievementsSection />
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={200}>
        <ContactSection />
      </ScrollReveal>
      <RatingWrapper />
    </>
  );
}

export default PortfolioContent;
