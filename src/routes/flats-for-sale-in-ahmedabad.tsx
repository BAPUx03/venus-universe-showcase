import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";
import { LANDING_PAGES, buildLandingHead } from "@/lib/seo/landingPages";

const SLUG = "flats-for-sale-in-ahmedabad";

export const Route = createFileRoute("/flats-for-sale-in-ahmedabad")({
  head: () => buildLandingHead(SLUG),
  component: () => <LandingPage config={LANDING_PAGES[SLUG]} />,
});
