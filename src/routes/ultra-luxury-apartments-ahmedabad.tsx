import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";
import { LANDING_PAGES, buildLandingHead } from "@/lib/seo/landingPages";

const SLUG = "ultra-luxury-apartments-ahmedabad";

export const Route = createFileRoute("/ultra-luxury-apartments-ahmedabad")({
  head: () => buildLandingHead(SLUG),
  component: () => <LandingPage config={LANDING_PAGES[SLUG]} />,
});
