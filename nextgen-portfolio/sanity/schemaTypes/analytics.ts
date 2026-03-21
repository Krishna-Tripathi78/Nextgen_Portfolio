import { defineField, defineType } from "sanity";

export default defineType({
  name: "analytics",
  title: "Analytics",
  type: "document",
  fields: [
    defineField({
      name: "totalVisits",
      title: "Total Visits",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "uniqueVisitors",
      title: "Unique Visitors",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "sectionViews",
      title: "Section Views",
      type: "object",
      fields: [
        { name: "hero", type: "number", title: "Hero Section", initialValue: 0 },
        { name: "about", type: "number", title: "About Section", initialValue: 0 },
        { name: "skills", type: "number", title: "Skills Section", initialValue: 0 },
        { name: "experience", type: "number", title: "Experience Section", initialValue: 0 },
        { name: "education", type: "number", title: "Education Section", initialValue: 0 },
        { name: "projects", type: "number", title: "Projects Section", initialValue: 0 },
        { name: "certifications", type: "number", title: "Certifications Section", initialValue: 0 },
        { name: "achievements", type: "number", title: "Achievements Section", initialValue: 0 },
        { name: "contact", type: "number", title: "Contact Section", initialValue: 0 },
      ],
    }),
    defineField({
      name: "visitorLocations",
      title: "Visitor Locations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "country", type: "string", title: "Country" },
            { name: "city", type: "string", title: "City" },
            { name: "count", type: "number", title: "Visit Count" },
            { name: "lat", type: "number", title: "Latitude" },
            { name: "lng", type: "number", title: "Longitude" },
          ],
        },
      ],
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      readOnly: true,
    }),
  ],
});
