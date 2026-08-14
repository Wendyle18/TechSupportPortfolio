# SEO and AI Visibility Implementation Report

Date: August 14, 2026  
Working branch: `seo/organic-ai-visibility`  
Baseline commit: `c257b0a`  
Remote status: unchanged; no commit, push, pull request, deployment, or repository-setting change has been made.

## Executive summary

This branch turns the portfolio from a JavaScript-dependent single page into a crawlable, entity-focused technical support portfolio with two first-party case studies. It adds complete metadata, verified structured data, search and answer-engine crawler controls, a sitemap, accessible static content, optimized responsive media, and post-launch operating documentation.

The work does not promise rankings or AI citations. It improves the technical and content foundations that search engines and answer engines can evaluate.

## Prioritized baseline findings

| Priority | Finding | Resolution |
| --- | --- | --- |
| P0 | A forced three-second loading overlay delayed meaningful content and produced a 7.1 s mobile LCP. | Removed the overlay and made primary content immediately visible. |
| P0 | Important role and statistic content depended on JavaScript animation. | Added complete static HTML; JavaScript now progressively enhances it. |
| P0 | Invalid ARIA, inaccessible hidden overlays, low contrast, and a keyboard lightbox bug affected assistive technology and navigation. | Corrected semantics, contrast, focus flow, reduced-motion behavior, and keyboard interactions. |
| P1 | The homepage lacked a complete canonical/social/entity metadata system. | Added canonical, robots, Open Graph, Twitter card, favicons, and WebSite/ProfilePage/Person JSON-LD. |
| P1 | Projects were summaries on the homepage instead of indexable evidence pages. | Added two unique, internally linked case studies with Article JSON-LD. |
| P1 | Production returned 404 for `/robots.txt` and `/sitemap.xml`. | Added both files with canonical URLs and only indexable pages. |
| P1 | Multi-megabyte images were used where small display sizes were sufficient. | Added responsive AVIF sources and correctly sized PNG/JPEG fallbacks. |
| P2 | Filenames contained spaces and inconsistent casing; the favicon was an unrelated legacy image. | Renamed assets to descriptive kebab-case names and added a WCS favicon set. |
| P2 | The repository README did not present the portfolio as a professional technical project. | Replaced it with a concise project overview, case studies, stack, local setup, and deployment notes. |

### Production URL baseline

The existing canonical host behavior was already healthy and was not changed in this branch:

| Requested URL | Baseline result |
| --- | --- |
| `http://wendylechristianseno.com/` | Canonical HTTPS `www` page after 2 redirects |
| `https://wendylechristianseno.com/` | Canonical HTTPS `www` page after 1 redirect |
| `http://www.wendylechristianseno.com/` | Canonical HTTPS `www` page after 1 redirect |
| `https://www.wendylechristianseno.com/` | HTTP 200 with no redirect |

Before deployment, production returned HTTP 404 for `/robots.txt`, `/sitemap.xml`, and `/llms.txt`. This branch adds the first two and intentionally leaves the third absent.

## Lighthouse before and after

The baseline and after measurements were run locally against the same static-site environment with Lighthouse 13.0.3 and Google Chrome. Scores can vary slightly between runs.

| Profile | Perf. | A11y | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage mobile — before | 75 | 93 | 96 | 100 | 1.8 s | 7.1 s | 0 ms | 0 |
| Homepage mobile — after | 99 | 100 | 100 | 100 | 1.5 s | 1.8 s | 10 ms | 0 |
| Homepage desktop — before | 94 | 93 | 96 | 100 | 0.6 s | 1.6 s | 0 ms | 0 |
| Homepage desktop — after | 100 | 100 | 100 | 100 | 0.4 s | 0.4 s | 0 ms | 0 |

The Google PageSpeed Insights API returned HTTP 429 during the audit, so no PageSpeed field-data claim is included. Production data should be checked after deployment.

### Case-study Lighthouse results

| Page | Profile | Perf. | A11y | Best practices | SEO | LCP |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Preorder Campaign Widgets | Mobile | 100 | 100 | 100 | 100 | 1.1 s |
| Preorder Campaign Widgets | Desktop | 100 | 100 | 100 | 100 | 0.3 s |
| Essential Apps Support Guide | Mobile | 100 | 100 | 100 | 100 | 1.2 s |
| Essential Apps Support Guide | Desktop | 100 | 100 | 100 | 100 | 0.3 s |

## Implemented changes

### Search foundations

- Added a unique homepage title and description aligned with SaaS technical support, Shopify, API investigation, browser debugging, front-end customization, and support documentation.
- Added self-referencing canonical URLs to all three indexable pages.
- Added Open Graph and Twitter card metadata with a 1200 × 630 social preview.
- Added a stable `@id` graph for WebSite, ProfilePage, and Person on the homepage.
- Added Article structured data to each case study with real author and page dates.
- Omitted unsupported Review, FAQ, rating, award, employer, and outcome claims.
- Added a three-URL XML sitemap and an absolute sitemap reference in `robots.txt`.
- Intentionally omitted `llms.txt`: it is not required by the search or answer-engine documentation used for this implementation, while Google explicitly says no special AI text files or schema are needed beyond normal search fundamentals.

### Search and answer-engine crawling

`robots.txt` explicitly permits:

- `Googlebot`
- `Bingbot`
- `OAI-SearchBot`
- `PerplexityBot`
- `Claude-SearchBot`

No explicit named rule was added for training-oriented agents such as `GPTBot`, `ClaudeBot`, or `Google-Extended`. The general `User-agent: *` rule currently allows crawling, so they are not blocked by this file. The owner should choose an explicit training policy before publication; options and implications are in `SEO-LAUNCH-CHECKLIST.md`.

The crawler names and separation of search/user/training purposes were checked against [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots), [Perplexity's crawler documentation](https://docs.perplexity.ai/guides/bots), and [Anthropic's crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

### Content and entity clarity

- Made the visible primary identity “Wendyle Seno — SaaS Technical Support Engineer.”
- Rewrote the introduction around founder-relevant support problems and concrete technical capabilities.
- Added a six-step “How I Work” section covering reproduction, investigation, communication, escalation, verification, and documentation.
- Added persistent email, LinkedIn, and GitHub links in crawlable HTML.
- Converted both featured projects into substantive case studies with scenario, role, constraints, approach, technology, evidence, and practical value.
- Kept claims qualitative where no verified before/after measurement exists.
- Verified the Essential Apps Support Guide implementation against its public GitHub repository and live page.

### Performance, resilience, and accessibility

- Removed externally hosted fonts and favicon requests.
- Removed the forced loader and scroll-reveal dependency.
- Added AVIF image sources with correctly sized fallbacks and dimensions.
- Added a skip link, valid landmarks, one H1 per page, descriptive link names, visible focus, keyboard controls, focus restoration, and reduced-motion behavior.
- Ensured all primary content, case-study links, and contact links remain visible with JavaScript disabled.
- Added conservative asset, CSS, and JavaScript cache headers in `vercel.json`; HTML is not given a long immutable cache.

### Asset improvements

| Asset | Original | Optimized delivery |
| --- | ---: | ---: |
| Profile image | 710,094 B PNG | 4,230 B at 128 px AVIF / 10,210 B at 256 px AVIF |
| Preorder project image | 1,656,708 B PNG | 9,424 B at 640 px AVIF / 22,360 B at 1200 px AVIF |
| Support guide image | 1,775,990 B PNG | 12,453 B at 640 px AVIF / 35,580 B at 1200 px AVIF |
| Social preview | Not present | 144,323 B, 1200 × 630 JPEG |

The original project images remain linked from the case studies so a reviewer can inspect full-resolution evidence.

## Validation evidence

| Check | Result |
| --- | --- |
| W3C Nu HTML validation | 0 errors on all 3 pages |
| Responsive rendering | Passed at 375 × 812, 768 × 1024, and 1440 × 900 for all 3 pages |
| Horizontal overflow | None at all 9 page/viewport combinations |
| Browser console, page, and request errors | None at all 9 combinations |
| Internal crawl | 50 discovered pages/assets returned no 4xx responses |
| JavaScript disabled | H1, role, case-study links, main content, and contact links remain available |
| Keyboard navigation | Skip link, mobile menu, carousel lightbox, Escape, and focus restoration passed |
| Reduced motion | Carousel starts paused and decorative animations are reduced |
| JSON-LD syntax | Valid; WebSite, ProfilePage, Person, and Article nodes parsed successfully |
| Sitemap XML | Valid XML |
| `robots.txt` and `sitemap.xml` local responses | HTTP 200 with appropriate MIME types |
| Git whitespace check | Passed |
| Credential-pattern scan | Clear |
| Placeholder/TODO scan | Clear |
| Social image dimensions | 1200 × 630 |

## Manual decisions and post-deployment work

These actions require owner approval, access, or a production deployment and were not performed:

1. Decide whether training crawlers should be explicitly allowed or disallowed.
2. Confirm that exposing the existing demo-store password `test` is intentional. It is presented as a public demo credential, not a private account secret.
3. Review and approve the wording, case-study evidence, public contact email, and social image.
4. Set the GitHub repository description, homepage URL, topics, and pinned-repository state using the suggestions in `SEO-LAUNCH-CHECKLIST.md`.
5. Update LinkedIn headline/about/featured links for consistent entity signals.
6. Deploy a preview, verify `robots.txt`, `sitemap.xml`, canonical URLs, JSON-LD, cache headers, and redirects on the actual host.
7. After production deployment, verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap, request indexing for all three URLs, and optionally submit updated URLs through IndexNow.
8. Add privacy-conscious measurement only after choosing a provider and documenting any consent or privacy requirements.

Google's current guidance says AI search features use the same foundational technical requirements as normal Search and do not require extra machine-readable AI files. See [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), [robots.txt guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [ProfilePage structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page), and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Bing discovery options are documented by [IndexNow](https://www.indexnow.org/documentation).

## Proposed publication sequence

Nothing below has been executed.

1. Review the local diff and resolve the two owner decisions above.
2. Commit with: `feat: improve portfolio SEO and AI discoverability`
3. Push `seo/organic-ai-visibility`.
4. Open a draft pull request titled: `Improve portfolio SEO, case studies, and AI visibility`.
5. Use the validation table in this report as the pull-request test plan.
6. Review the hosting preview, then merge and complete the launch checklist.

## Remaining limitations

- Search rankings, rich-result display, answer-engine citations, and crawler timing cannot be guaranteed.
- Lighthouse lab results are not a substitute for real-user Core Web Vitals after deployment.
- Search Console, Bing Webmaster Tools, production header checks, IndexNow submission, and repository/profile metadata require external account actions.
- The public review screenshots were retained as source evidence and remain the largest group of image assets; they are lazy-loaded and do not affect the initial critical path.
