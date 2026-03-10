import {
  AboutSection,
  AchievementsSection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection
} from "@/components/sections";
import { AchievementPopup } from "@/components/AchievementPopup";
import { serverClient } from "@/sanity/lib/serverClient";

async function PortfolioContent() {
  const achievements = await serverClient.fetch(
    `*[_type == "achievement"] | order(date desc) [0]`
  );

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
      {achievements && <AchievementPopup achievement={achievements} />}
    </>
  );
}

export default PortfolioContent;