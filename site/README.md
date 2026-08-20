# suchitg.xyz

Suchit G's personal site and technical blog, built with [Astro](https://astro.build/).

See [AUTHORING.md](./AUTHORING.md) for the complete blog and Bits authoring runbook.

## Run locally

```sh
npm install
npm run dev
```

Then open the local URL printed by Astro. Posts live in `src/content/writing/` and short notes live in `src/content/bits/`.

## Build

```sh
npm run build
```

The static output is written to `dist/`. Pushes to `main` deploy the site to GitHub Pages.

## Publishing

Each post is a folder containing an `index.md` file and any local images it needs. The frontmatter schema is defined in `src/content.config.ts`. Reusable Markdown callouts are handled by `src/plugins/remark-callouts.mjs` and styled globally.
