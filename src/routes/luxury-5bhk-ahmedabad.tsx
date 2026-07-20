import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/luxury-5bhk-ahmedabad")({
  beforeLoad: () => {
    throw redirect({ to: "/luxury-4bhk-ahmedabad", statusCode: 301 });
  },
});
