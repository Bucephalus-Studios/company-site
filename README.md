# Bucephalus Studios website

The source for [bucephalusstudios.com](https://bucephalusstudios.com), the website of Bucephalus Studios LLC, a solo indie game studio from Columbus, Ohio, and home of [CultGame](https://store.steampowered.com/app/2345980/CultGame/).

## How it's hosted

The site is served by **GitHub Pages** from the `main` branch. Every push to `main` triggers GitHub's Jekyll build, and the site updates within a minute or two. The domain is registered with Porkbun and points at GitHub Pages (see `CNAME`).

## How it's put together

Each page is a plain HTML file with a short front matter block at the top. Jekyll wraps it in the shared layout when it builds the site.

```
_layouts/default.html   page skeleton: <head>, header, page content, footer
_includes/head.html     stylesheets, title, description, and link-preview tags
_includes/header.html   logo, nav bar, Ko-fi button, newsletter signup popup
_includes/footer.html   copyright, visitor counter, scripts
_config.yml             site title, default description, and default preview image
```

So a change to the nav bar, footer, or anything in `<head>` is made once in `_includes/` and shows up on every page.

A page's front matter looks like this:

```yaml
---
layout: default
title: "Games"                    # shown as "Bucephalus Studios - Games"
description: "..."                # search results and link previews
image: "/path/to/preview.png"     # optional, link-preview image
scripts:                          # optional, extra scripts for this page only
  - js/github-repos.js
---
```

The copyright year in the footer updates itself whenever the site is rebuilt.

## Previewing locally

Because pages use Jekyll includes, opening an HTML file directly in a browser shows the raw `{% include %}` tags. To preview the real site:

```sh
gem install bundler jekyll
jekyll serve
```

Then open http://localhost:4000. Or push to `main` and check the live site.

## Other pieces

- **Software page:** repo cards are loaded live from the GitHub API by `js/github-repos.js`. Any public repo in the Bucephalus-Studios org tagged `cpp-library` shows up automatically.
- **Library docs:** `softwareDocs/` holds Doxygen output. The stevensStringLib docs are pushed here automatically by a GitHub Action in that library's repo.
- **Press kit:** `cultgame-press-kit.html`, with assets under `downloads/pressKits/`. After changing the assets, rebuild `CultGame-Press-Kit.zip` from the `CultGame-Press-Kit/` folder. GitHub rejects files over 100MB, so keep trailers on YouTube rather than in the zip.
- **Analytics:** Metricool (`js/metricool.js`) and a hits.sh visitor counter in the footer.
- **Newsletter:** the signup popup in the header posts to the "Bucephalus Studios" Mailchimp audience.
