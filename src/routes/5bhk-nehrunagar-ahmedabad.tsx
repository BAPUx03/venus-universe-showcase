import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/5bhk-nehrunagar-ahmedabad")({
  beforeLoad: () => {
    throw redirect({ to: "/4bhk-nehrunagar-ahmedabad", statusCode: 301 });
  },
});
