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

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}

export default PortfolioContent;