import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";
import { LANDING_PAGES, buildLandingHead } from "@/lib/seo/landingPages";

const SLUG = "large-carpet-area-flats-ahmedabad";

export const Route = createFileRoute("/large-carpet-area-flats-ahmedabad")({
  head: () => buildLandingHead(SLUG),
  component: () => <LandingPage config={LANDING_PAGES[SLUG]} />,
});
