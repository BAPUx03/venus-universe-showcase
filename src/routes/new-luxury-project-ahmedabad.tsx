import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";
import { LANDING_PAGES, buildLandingHead } from "@/lib/seo/landingPages";

const SLUG = "new-luxury-project-ahmedabad";

export const Route = createFileRoute("/new-luxury-project-ahmedabad")({
  head: () => buildLandingHead(SLUG),
  component: () => <LandingPage config={LANDING_PAGES[SLUG]} />,
});
