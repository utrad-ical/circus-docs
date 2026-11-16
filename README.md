# CIRCUS Docs

The source of <https://circus-project.net/>, the documentation site of [CIRCUS](https://github.com/utrad-ical/circus).

The site is built as a static site with [Waku](https://waku.gg/) (React Server Components) and MDX.

## Requirements

- Node.js 24 or later
- pnpm

## Development

```console
pnpm install
pnpm dev
```

Then open http://localhost:3000/. Use `pnpm dev --port 8000` to change the port.

The search box works only in the production build, because the search index is generated after the build.

## Build

```console
pnpm build
```

This does the following and writes the site to `dist/public`, which can be served by any static hosting service.

1. Fetches the route definitions of CIRCUS API from GitHub (`scripts/make-api-reference.ts`).
2. Builds the pages (`waku build`).
3. Checks the links between the pages, and generates `sitemap.xml` and the search index (`scripts/postbuild.ts`). The build fails if there is a broken link or anchor.

To avoid the rate limit of the GitHub API, you can optionally put a personal access token in `.env`:

```
CIRCUS_DOCS_GH_TOKEN=...
```

Other commands: `pnpm typecheck`, `pnpm lint`, `pnpm format`.

## Writing Docs

Documents are placed under `docs/`. Both `*.md` and `*.mdx` are processed as MDX. `docs/users/login.md` becomes `/docs/users/login`, and `index.md` becomes the page of its directory.

### Front matter

```yaml
---
title: Title of the page
sidebar_label: Shorter label for the sidebar (optional)
---
```

When `title` is omitted, the first `# heading` is used.

### Sidebar

The sidebar reflects the directory structure. Each directory can have a `meta.yml`:

```yaml
title: User Guide # label of this directory
order:
  - login # login.md
  - title: CIRCUS DB # a group that does not correspond to a directory
    items:
      - new-case
      - case-search
  - admin # a subdirectory
hidden: false # true: build the pages but do not show them in the sidebar
```

Entries not listed in `order` come last.

### Syntax

In addition to GitHub Flavored Markdown, the following is available.

- Definition lists (a term followed by lines starting with `: `).
- Titles of code blocks: ` ```js title="index.js" `.
- `#123` becomes a link to the issue of utrad-ical/circus.
- Images are placed next to the documents and referred to by relative paths (`![Home](home.png)`).

Links to other documents are written as the paths of the pages (`[Log in](/docs/users/login)`).

The following components can be used without importing them.

| Component                                                           | Description                                                                                                                       |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `<Note>`, `<Tip>`, `<Info>`, `<Important>`, `<Warning>`, `<Danger>` | Boxes for supplementary information. `title` replaces the label (`<Tip title="Some title">`). Put blank lines around the content. |
| `<Icon icon="rs-icon-brush" />`                                     | An icon of CIRCUS                                                                                                                 |
| `<Tabs>` / `<TabItem>`                                              | Switchable tabs                                                                                                                   |
| `<ParamList>`                                                       | Turns a list of `- 'Name': description` into a definition list                                                                    |
| `<Required />`                                                      | "Required" badge for options                                                                                                      |
| `<ApiPreamble verb="get" path="/cases" />`                          | Heading and description of an API endpoint                                                                                        |
| `<ApiReference />`                                                  | The list of all API endpoints                                                                                                     |
| `<Now />`                                                           | The date of the build                                                                                                             |

## API Reference

The API reference is generated from the route definitions (`packages/circus-api/src/api/**/*.yaml`) of utrad-ical/circus. The tag to read is fixed by `ref` in `scripts/make-api-reference.ts`; update it when the docs move to a newer version of CIRCUS.

## Source Layout

- `docs/`: documents and their images
- `src/pages/`: routes (the top page, `/docs/*` and the 404 page)
- `src/components/`: components of the site, and those used from MDX (`mdx/`)
- `src/mdx/`: remark/rehype plugins that compile the documents
- `src/utils/`: scanning of `docs/` and other utilities
- `scripts/`: scripts that run before and after the build
- `public/`: static files served as they are

## Deployment

The site is deployed to Cloudflare (`wrangler.toml`). The build command is `pnpm build` and the output directory is `dist/public`.
