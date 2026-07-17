import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_project_overview",
  title: "Get project overview",
  description:
    "Return an overview of the Venus Universe Nehrunagar luxury residential project: location, developer, residence types, and enquiry channel.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "Venus Universe Nehrunagar",
            developer: "Venus Group",
            location: "Nehrunagar, Ahmedabad, Gujarat, India",
            residence_types: [
              "4 BHK",
              "5 BHK",
              "Penthouse",
              "Duplex",
              "Jodi Apartments",
            ],
            website: "https://venusuniverse.in",
            enquiry: {
              form: "https://venusuniverse.in",
              note: "Site visits by appointment only. Use the lead form on the website to request a call back.",
            },
          },
          null,
          2,
        ),
      },
    ],
  }),
});
