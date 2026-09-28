import { landingFontVariables } from "./fonts";
import { AnnouncementBar } from "./sections/AnnouncementBar";
import { AppBuildersSkip } from "./sections/AppBuildersSkip";
import { Engine } from "./sections/Engine";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";
import { FounderProblem } from "./sections/FounderProblem";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { InControl } from "./sections/InControl";
import { LiveExecution } from "./sections/LiveExecution";
import { Navbar } from "./sections/Navbar";
import { Pricing } from "./sections/Pricing";
import { Stack } from "./sections/Stack";
import { Stages } from "./sections/Stages";
import { Team } from "./sections/Team";
import { Workspace } from "./sections/Workspace";

/**
 * Marketing homepage for SaaS Launch (see documentation/POSITIONING.md §7).
 * The root layout locks <body> scrolling for the app shell, so this page owns
 * its own scroll container.
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
        <FounderProblem />
        <HowItWorks />
        <LiveExecution />
        <Stages />
        <Team />
        <AppBuildersSkip />
        <Workspace />
        <Stack />
        <Engine />
        <InControl />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
