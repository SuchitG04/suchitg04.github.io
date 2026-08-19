import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const shared = z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.string().default("Suchit G"),
  description: z.string(),
  categories: z.array(z.string()).optional().default([]),
  format: z.string().optional().default("Essay"),
  draft: z.boolean().optional().default(false),
  toc: z.boolean().optional(),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: ({ image }) => shared.extend({ image: image().optional() }),
});

const bits = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/bits" }),
  schema: ({ image }) => shared.extend({ image: image().optional() }),
});

export const collections = { writing, bits };
