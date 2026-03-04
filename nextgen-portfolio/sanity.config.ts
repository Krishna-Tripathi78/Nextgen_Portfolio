"use client";
import { RocketIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "nextgen-portfolio",
  subtitle: "Content Management System",
  icon: RocketIcon,
  schema,
  plugins: [
    deskTool({ structure, title: "Content" }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion, title: "GROQ" }),
  ],
});
