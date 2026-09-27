import { landingFontVariables } from "./fonts";
import { AgentLibrary } from "./sections/AgentLibrary";
import { AnnouncementBar } from "./sections/AnnouncementBar";
import { CaseStudies } from "./sections/CaseStudies";
import { ChatbotVsSwarm } from "./sections/ChatbotVsSwarm";
import { Developers } from "./sections/Developers";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { Integrations } from "./sections/Integrations";
import { LiveExecution } from "./sections/LiveExecution";
import { MemoryReview } from "./sections/MemoryReview";
import { Navbar } from "./sections/Navbar";
import { Pricing } from "./sections/Pricing";
import { ReadySwarms } from "./sections/ReadySwarms";
import { Security } from "./sections/Security";
import { SwarmBuilder } from "./sections/SwarmBuilder";
import { UseCases } from "./sections/UseCases";

/**
 * Marketing homepage. The root layout locks <body> scrolling for the app shell,
 * so this page owns its own scroll container.
 */
export function LandingPage() {
  return (
    <div
      className={`landing ${landingFontVariables} h-dvh overflow-x-hidden overflow-y-auto scroll-smooth bg-ink bg-grid font-body text-fg antialiased`}
    >
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <ChatbotVsSwarm />
        <HowItWorks />
        <LiveExecution />
        <AgentLibrary />
        <ReadySwarms />
        <SwarmBuilder />
        <Integrations />
        <MemoryReview />
        <UseCases />
        <Developers />
        <CaseStudies />
        <Pricing />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
