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
import { Footer } from "@/components/sections/Footer";
import { AchievementPopup } from "@/components/AchievementPopup";
import { AnalyticsDashboard } from "@/components/sections/AnalyticsDashboard";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { SectionTracker } from "@/components/SectionTracker";
import { serverClient } from "@/sanity/lib/serverClient";

async function PortfolioContent() {
  const achievements = await serverClient.fetch(
    `*[_type == "achievement"] | order(date desc) [0]`
  );

  return (
    <AnalyticsProvider>
      <SectionTracker sectionId="hero">
        <HeroSection />
      </SectionTracker>
      <SectionTracker sectionId="about">
        <AboutSection />
      </SectionTracker>
      <SectionTracker sectionId="skills">
        <SkillsSection />
      </SectionTracker>
      <SectionTracker sectionId="experience">
        <ExperienceSection />
      </SectionTracker>
      <SectionTracker sectionId="education">
        <EducationSection />
      </SectionTracker>
      <SectionTracker sectionId="projects">
        <ProjectsSection />
      </SectionTracker>
      <SectionTracker sectionId="certifications">
        <CertificationsSection />
      </SectionTracker>
      <SectionTracker sectionId="achievements">
        <AchievementsSection />
      </SectionTracker>
      <AnalyticsDashboard />
      <SectionTracker sectionId="contact">
        <ContactSection />
      </SectionTracker>
      <Footer />
      {achievements && <AchievementPopup achievement={achievements} />}
    </AnalyticsProvider>
  );
}

export default PortfolioContent;