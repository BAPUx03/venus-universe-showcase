import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_project_overview",
  title: "Get project overview",
  description:
    "Return a brochure-aligned overview of The Universe by Venus: location, developer, verified residence type, blocks, area range, and enquiry channel.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "The Universe by Venus",
            developer: "Venus",
            location: "Nehrunagar, Ahmedabad, Gujarat, India",
            residence_types: ["Premium 4 BHK"],
            residential_blocks: "A–J (10 blocks)",
            rera_carpet_area: "Approximately 1,546–2,459 sq ft, depending on block and plan",
            larger_format_note: "Jodi, duplex or penthouse configurations are subject to current official availability and approved plans.",
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
