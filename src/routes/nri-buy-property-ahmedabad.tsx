import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";
import { LANDING_PAGES, buildLandingHead } from "@/lib/seo/landingPages";

const SLUG = "nri-buy-property-ahmedabad";

export const Route = createFileRoute("/nri-buy-property-ahmedabad")({
  head: () => buildLandingHead(SLUG),
  component: () => <LandingPage config={LANDING_PAGES[SLUG]} />,
});
