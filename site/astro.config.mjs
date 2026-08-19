import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";

export default defineConfig({
  site: "https://suchitg.xyz",
  output: "static",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkCallouts],
    }),
  },
});
