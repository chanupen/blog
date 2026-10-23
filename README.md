# blog

Technical blog of Chandan Kumar, Senior DevOps / Site Reliability Engineer.

**Live at https://chanupen.github.io/blog/** · Main site: https://chanupen.github.io

Built with [Hugo](https://gohugo.io) and a small in-repo theme that matches the main site (Palatino headings, Charter body text, teal accent, dark by default with a light switch). Search is [Pagefind](https://pagefind.app), comments are [Giscus](https://giscus.app). Every push to `main` is built and published by GitHub Actions.

---

## One-time setup

1. Create an empty public repo named **`blog`** under `github.com/chanupen` (no README, no licence).
2. Push this folder:
   ```bash
   cd ~/devops/github/blog
   git init -b main
   git add .
   git commit -m "Initial blog scaffold"
   git remote add origin git@github.com:chanupen/blog.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab, wait for *Deploy blog* to go green, then visit https://chanupen.github.io/blog/.

> [!NOTE]
> The repo name decides the URL. A repo called `blog` is served at `chanupen.github.io/blog/` alongside the main site, with no change needed in `chanupen.github.io`.

### Turn on comments (optional, 5 minutes)

1. Repo **Settings → General → Features → Discussions**: tick it.
2. In **Discussions**, create a category called `Comments` (type: Announcement, so only Giscus creates threads).
3. Install the Giscus app on the `blog` repo: https://github.com/apps/giscus
4. Go to https://giscus.app, enter `chanupen/blog`, choose the `Comments` category and mapping *pathname*. Copy `data-repo-id` and `data-category-id`.
5. Paste them into `hugo.toml` under `[params.giscus]` (`repoId`, `categoryId`) and push. Comments appear under every post.

---

## Writing a post

```bash
# install once on the Mac
brew install hugo

# new post (the folder name becomes the URL: /blog/k8s-upgrade-notes/)
hugo new content posts/k8s-upgrade-notes/index.md

# preview with drafts at http://localhost:1313/blog/
hugo server -D
```

- New posts start as `draft: true`. Change it to `false` when ready, commit and push. It goes live in about a minute.
- Keep images next to the post's `index.md` and reference them by file name.
- `content/posts/writing-guide/` is a draft cheat sheet with every formatting feature: code blocks, callouts, tables, Mermaid diagrams, images. It never publishes.

> [!TIP]
> Search is built in CI. To try it locally: `hugo --baseURL http://localhost:1414/ && npx pagefind --site public --serve`, then open http://localhost:1414/search/.

### Front matter

```yaml
title: "Upgrading EKS without dropping traffic"
date: 2026-11-02T10:00:00+05:30
draft: false
description: "One or two sentences. Shown on the list, in search and in LinkedIn previews."
tags: [kubernetes, aws, eks]
images: ["cover.png"]   # optional share image
```

---

## Sharing posts

- **LinkedIn**: share the post URL; the title, description and image come from the front matter.
- **dev.to / Hashnode / Medium**: cross-post the full text and set the *canonical URL* to the post on this blog, so search engines credit the original.
- **RSS**: https://chanupen.github.io/blog/index.xml
- **Sitemap** for Google Search Console: https://chanupen.github.io/blog/sitemap.xml

---

## Layout

| Path | What it is |
|---|---|
| `hugo.toml` | Site settings, menu, Giscus IDs |
| `content/posts/<slug>/index.md` | One folder per post |
| `archetypes/posts.md` | Template used by `hugo new` |
| `layouts/` | Page templates (`baseof`, `home`, `page`, tags, search) |
| `layouts/_markup/` | How headings, code, callouts, tables, images and links render |
| `assets/css/` | Styles (`main.css`) and code colours (`syntax.css`) |
| `assets/js/main.js` | Theme switch, copy buttons |
| `static/fonts/` | Charis SIL fallback font (SIL Open Font License) |
| `.github/workflows/deploy.yml` | Build and publish on every push to `main` |

The theme switch uses the same browser setting as the main site, so a reader's light or dark choice carries across both.
