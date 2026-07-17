import { defineMcp } from "@lovable.dev/mcp-js";
import getProjectOverview from "./tools/get-project-overview";
import getSiteContent from "./tools/get-site-content";

export default defineMcp({
  name: "venus-universe-mcp",
  title: "Venus Universe MCP",
  version: "0.1.0",
  instructions:
    "Read-only tools for the Venus Universe Nehrunagar project by Venus Universe. Use `get_project_overview` for high-level project details and `get_site_content` to fetch a specific piece of published website content by key.",
  tools: [getProjectOverview, getSiteContent],
});
