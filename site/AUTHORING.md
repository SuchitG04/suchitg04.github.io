# Blog authoring runbook

This is the practical guide to writing, previewing, and publishing content on `suchitg.xyz`.

## Mental model

- The active website is the Astro project inside `site/`.
- Long-form posts are Markdown files in `site/src/content/writing/`.
- Short notes are Markdown files in `site/src/content/bits/`.
- Astro turns those files into static HTML pages.
- A push to `main` runs the GitHub Pages workflow and publishes the result.
- DNS and the custom domain are already configured. Normal publishing never requires touching them again.

The older Quarto files at the repository root are retained as history. They are not the source of the current site.

## Where things live

| Purpose | Location |
| --- | --- |
| Blog posts | `site/src/content/writing/<slug>/index.md` |
| Bits | `site/src/content/bits/<slug>/index.md` |
| Images used by a post | Beside its `index.md`, or in a local `assets/` folder |
| Content-field rules | `site/src/content.config.ts` |
| Blog archive | `site/src/pages/blog/index.astro` |
| Blog article layout | `site/src/pages/blog/[...slug].astro` |
| Markdown callouts | `site/src/plugins/remark-callouts.mjs` |
| Article styling | `site/src/styles/global.css` |
| Deployment workflow | `.github/workflows/deploy.yml` |

## Start the site locally

From the repository root:

```sh
cd site
npm install
npm run dev
```

`npm install` is normally needed only on the first run or after dependencies change. Open the local URL Astro prints. Changes to Markdown and site code should reload automatically.

Stop the server with `Ctrl+C`.

If a change is not appearing:

1. Confirm you edited a file under `site/`, not the old Quarto source.
2. Confirm you are viewing the URL printed by the currently running server.
3. Stop and restart `npm run dev`.
4. Hard-refresh the browser if only an image, stylesheet, or favicon looks stale.

## Create a blog post

### 1. Choose the slug carefully

Create a lowercase, hyphen-separated directory:

```text
site/src/content/writing/how-transformers-cache-context/
```

The directory name becomes the public URL:

```text
https://suchitg.xyz/blog/how-transformers-cache-context/
```

Treat the slug as permanent. Renaming it later changes the URL and breaks existing links unless a redirect is added.

### 2. Create `index.md`

Use this template:

```md
---
title: "How transformers cache context"
date: "2026-08-20"
description: "A one- or two-sentence summary used on the blog archive and in search previews."
categories:
  - Language models
  - Systems
format: "Essay"
draft: false
image: "./thumbnail.jpg"
---

Opening paragraph. Start with the substance; the page title and description are already rendered above the article.

## First main section

Body text.

### A subsection

More detail.
```

Remove `image` when the post has no archive thumbnail.

### Frontmatter reference

Frontmatter is the YAML block between the two `---` lines.

| Field | Required? | Meaning |
| --- | --- | --- |
| `title` | Yes | Page title and blog-card title |
| `date` | Yes | Publication date; use quoted `YYYY-MM-DD` |
| `description` | Yes | Blog-card summary and page metadata |
| `categories` | No | Tags used for filtering; defaults to none |
| `format` | No | Archive label such as `Essay`, `Notebook`, or `Worklog`; defaults to `Essay` |
| `draft` | No | `true` removes the post from production lists and routes; defaults to `false` |
| `image` | No | Local archive thumbnail, relative to `index.md` |
| `author` | No | Defaults to `Suchit G`; the current article byline is fixed to that name |
| `toc` | No | Retained for migrated content, but currently has no effect |

Quote titles and descriptions. Colons and other YAML punctuation are less likely to cause parsing errors inside quotes.

### Draft behavior

Draft posts are excluded even during the current local build. The least surprising workflow is:

1. Keep the new post uncommitted while writing.
2. Use `draft: false` so its local URL exists.
3. Commit and push only when it is ready.

If unfinished work must be pushed to `main`, set `draft: true` first. Temporarily switch it back to `false` whenever you need to preview it locally.

## Headings and the left-hand index

Do not add a Markdown `#` heading. The `title` field already creates the page’s only level-one heading.

Use:

```md
## Main section

### Subsection
```

The left-hand “On this page” index is generated automatically from `##` and `###` headings:

- `##` creates a main index item.
- `###` creates an indented index item.
- `####` and deeper headings do not appear in the index.
- The heading text becomes the anchor, so changing a heading can break links to that section.

Keep headings short enough to scan in the narrow index. Prefer descriptive headings over `Part 1`, `More`, or `Miscellaneous`.

## Everyday Markdown formatting

```md
**bold text**

*italic text*

`inline_code`

[descriptive link text](https://example.com)

- Unordered item
- Another item

1. Ordered item
2. Another item

> An ordinary quotation.
```

Leave a blank line between paragraphs, lists, headings, images, and code blocks. It prevents ambiguous Markdown rendering.

### Code

Use fenced code blocks and include the language when known:

````md
```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```
````

Long code blocks scroll horizontally. Prefer focused excerpts over pasting an entire program.

### Images

Keep post-specific images with the post:

```text
site/src/content/writing/my-post/
├── index.md
├── thumbnail.jpg
└── architecture.png
```

Embed an image with meaningful alternative text:

```md
![Request flow from the client through the retrieval pipeline](./architecture.png)
```

Add a caption as an italic paragraph immediately after the image:

```md
![Validation loss across training runs](./validation-loss.png)

*Validation loss after each evaluation interval.*
```

The archive thumbnail is set separately in frontmatter:

```yaml
image: "./thumbnail.jpg"
```

Archive thumbnails are cropped to a 3:2 frame. Use an image whose important subject remains visible when cropped, ideally at least 900×600 pixels. Compress large screenshots before committing them.

File names and letter casing must match exactly. GitHub’s Linux build treats `Chart.png` and `chart.png` as different files even when macOS appears forgiving.

### Callouts

Supported callout types are `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`, and `RESOURCES`.

```md
> [!NOTE]
>
> This is supporting context that should not interrupt the main explanation.
```

Add a custom title after the type:

```md
> [!CAUTION] Easy mistake
>
> Normalizing the full dataset before splitting leaks validation information.
```

The marker must be the first line of the blockquote. Keep the `>` prefix on blank lines and every callout paragraph or list item.

### Video embeds

Use a privacy-enhanced YouTube embed and the existing responsive wrapper:

```html
<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
    title="Descriptive video title"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>
```

Raw HTML works in Markdown, but use it only when regular Markdown cannot express the content.

### Tables

Standard Markdown tables work:

```md
| Model | Parameters | Validation loss |
| --- | ---: | ---: |
| Baseline | 35.6M | 3.7822 |
```

Keep tables reasonably narrow; wide tables are difficult to read on phones.

### Mathematical notation

LaTeX math rendering is not configured yet. `$x^2$`, `$$...$$`, and equation environments should not be assumed to render. For a post that needs equations, add Math/KaTeX support to the site first rather than publishing raw LaTeX.

## Categories and filtering

Categories become filter buttons on `/blog/`. Their spelling and capitalization are currently case-sensitive when buttons are generated. Reuse an existing spelling instead of inventing a near-duplicate.

Preferred existing spellings include:

- `Beginner`
- `Computer vision`
- `Data Processing`
- `Experiments`
- `fast.ai`
- `Neural networks`
- `NLP`
- `Paper implementation`
- `Research`
- `Stable Diffusion`
- `Tabular`

Add a genuinely new category when it represents a topic you expect to use again. Two or three categories per post are usually enough; only the first two appear on the archive row.

## Create a Bit

Bits use the same Markdown system but live under `src/content/bits/`.

```text
site/src/content/bits/why-caches-need-boundaries/index.md
```

```md
---
title: "Why caches need boundaries"
date: "2026-08-20"
description: "The short sentence shown on the Bits page."
draft: false
---

The note begins here.
```

The directory becomes `/bits/why-caches-need-boundaries/`. Bits do not get the blog article’s heading index, so keep them short and structurally simple.

## Notebook-derived posts

The site publishes Markdown and MDX, not `.ipynb` files directly. There is no automatic notebook conversion pipeline.

For a notebook post:

1. Execute and save the notebook deliberately.
2. Export it to Markdown as a starting point, for example with `jupyter nbconvert --to markdown notebook.ipynb`.
3. Move the Markdown into `<slug>/index.md` and keep exported images beside it.
4. Add the normal frontmatter manually.
5. Remove widget state, progress bars, empty outputs, base64 blobs, and irrelevant execution noise.
6. Check every image and code block in the local site.
7. Run the full production build before publishing.

Notebook conversion is rarely one-click. Ask for help when porting one; the existing converted posts are useful references, but some preserve more notebook output than a new post should.

## Pre-publish checklist

From `site/`:

```sh
npm run build
```

Do not publish until it finishes with zero errors.

Then check:

- The post appears at `/blog/<slug>/`.
- The title, description, date, and archive format are correct.
- The archive thumbnail is framed well, if present.
- Every body image loads and has useful alt text.
- `##` and `###` headings appear correctly in the left index.
- Code blocks scroll rather than breaking the layout.
- Callouts render as callouts rather than literal `[!NOTE]` text.
- External links point to the intended destination.
- The page works in light and dark themes.
- The layout remains readable on a narrow window or phone.
- `draft` is absent or `false`.

## Publish

Run Git commands from the repository root, not from some unrelated directory:

```sh
git status
git add site/src/content/writing/<slug>
git commit -m "feat: publish <short post title>"
git push origin main
```

For a Bit, add its directory under `site/src/content/bits/` instead.

The push triggers GitHub Pages automatically. The deployment usually completes within a few minutes. After it succeeds, verify the public URL rather than assuming that a successful local build was published.

If the GitHub commit shows a red check, open the Actions details. A build failure and a cancelled run are different conditions; read the actual conclusion before changing content or DNS.

## Update, rename, or remove content

### Update

Edit the existing `index.md`, run `npm run build`, commit, and push. Keeping the same folder preserves the URL.

### Rename

Avoid renaming a published slug. It creates a new URL and removes the old one. Plan a redirect first if outside links may exist.

### Remove

Deleting a published post removes its route on the next deployment. Links to it will return 404 unless a redirect or replacement page is created.

## Common failures

### The build reports a content-schema error

Check the frontmatter. The most common causes are a missing `title`, `date`, or `description`; malformed YAML indentation; an invalid date; or `categories` written as a string instead of a list.

### The post is missing

- Confirm it is under `site/src/content/writing/`.
- Confirm the file is named `index.md` or has a valid `.md`/`.mdx` extension.
- Confirm `draft` is not `true`.
- Confirm the local URL uses `/blog/`, not the old `/writing/` path.

### The image works locally but fails after deployment

Check exact capitalization, the relative path, and whether the image was included in the Git commit.

### Two nearly identical tag filters appear

Their capitalization differs. Standardize the category spelling across the affected posts.

### A heading is missing from the index

Only `##` and `###` headings are included. Confirm the heading is valid Markdown and not inside a code block or raw HTML fragment.

### Raw LaTeX appears on the page

Math rendering has not been configured. Do not try to repair it with arbitrary HTML; add a proper Markdown math integration.

### The public site still shows an old version

Check the latest GitHub Actions run, then wait briefly for the Pages cache. Do not change DNS for an ordinary content update.

## Sensible authoring defaults

- One clear idea per post.
- A concrete description rather than “Some notes about X.”
- Short sections with descriptive `##` headings.
- `###` only when a section genuinely needs subdivision.
- Alt text that describes the information in an image, not merely “screenshot.”
- Links with descriptive text instead of “click here.”
- Code excerpts that support the explanation.
- Consistent category spellings.
- Permanent, boring slugs.
- A successful production build before every push.
