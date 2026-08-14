# SEO, AI Visibility, and Measurement Implementation Report

Date: August 14, 2026

Working branch: `seo/site-architecture-and-measurement`

Baseline commit: `60ff595`

Publication status: local implementation only; no push, merge, deployment, or external-account change was made.

## Executive summary

This branch expands the portfolio from three indexable pages to six, plus a useful non-indexable 404 page. It adds a case-study hub, a focused work-with-me page, a GA4 privacy page, visible and machine-readable breadcrumbs, stronger internal linking, explicit duplicate-URL redirects, page-specific case-study social images, and lightweight GA4 conversion-event tracking.

The implementation preserves the existing static architecture, visual language, GA4 measurement ID, canonical host, accessibility behavior, and performance profile. It does not promise rankings, indexing, AI citations, traffic, or employment outcomes.

## Verified baseline and prioritized findings

The local starting files at `60ff595` matched the corresponding production HTML for the homepage and both case studies. Production already redirected HTTP and apex-domain requests to the HTTPS `www` canonical host. The following gaps remained:

| Priority | Verified finding | Completed resolution |
| --- | --- | --- |
| P1 | The two case studies had no indexable parent hub and limited cross-linking. | Added `/case-studies/`, connected every case page, and added related-evidence links. |
| P1 | There was no dedicated founder/recruiter conversion page. | Added `/work-with-me/` with verified capabilities, workflow, evidence, availability, and contact actions. |
| P1 | GA4 was present, but portfolio conversion actions were not measured. | Added one delegated event listener and six allowlisted events without PII or link interception. |
| P1 | `/index.html`, no-slash directory paths, and directory `/index.html` aliases returned 200 instead of consolidating. | Added explicit permanent redirects in `vercel.json`; these require production verification after deployment. |
| P2 | Case studies lacked visible breadcrumbs and BreadcrumbList data. | Added both, with relationships to the case-study collection and the existing Person entity. |
| P2 | Case studies reused a generic social image. | Assigned each case its own verified project image and accurate image dimensions/alternative text. |
| P2 | There was no analytics privacy explanation or useful 404 page. | Added `/privacy/` and `404.html`; the latter is `noindex,follow`. |
| P2 | The sitemap did not contain the new canonical pages. | Updated it to exactly match the six public indexable canonical URLs. |

The existing visible `3,000+ tickets` statement was not independently verifiable from repository evidence and was not repeated on the new pages. The owner must confirm or revise that existing claim before publication.

## Before and after page inventory

| URL | Before | After | Index directive | Purpose |
| --- | --- | --- | --- | --- |
| `/` | Indexable | Updated | `index,follow` | Professional entity and portfolio overview |
| `/case-studies/` | Missing | Added | `index,follow` | Evidence collection and case-study discovery |
| `/case-studies/preorder-campaign-widgets/` | Indexable | Updated | `index,follow` | Shopify widget implementation evidence |
| `/case-studies/essential-apps-support-guide/` | Indexable | Updated | `index,follow` | Support documentation and escalation evidence |
| `/work-with-me/` | Missing | Added | `index,follow` | Founder/recruiter evaluation and contact intent |
| `/privacy/` | Missing | Added | `index,follow` | Plain-language GA4 and privacy information |
| `/404.html` | Missing | Added | `noindex,follow` | Recovery path for unavailable URLs |

No `/insights/` archive was created because no substantive article has yet passed the evidence gate in `AUTHORITY-CONTENT-ROADMAP.md`.

## Page-to-search-intent map

| Page | Primary audience and intent | Evidence/conversion path |
| --- | --- | --- |
| Homepage | Founders, support leaders, and recruiters evaluating Wendyle's overall SaaS support fit | Capabilities, experience, case studies, résumé, work-with-me page, email |
| Case studies | Evaluators looking for concrete technical support and implementation work | Two descriptive case cards, résumé, work-with-me page, email |
| Preorder Campaign Widgets | People evaluating Shopify storefront troubleshooting and front-end customization evidence | Implementation details, live demo, related support-guide case, work-with-me page |
| Essential Apps Support Guide | People evaluating support operations, reproduction, documentation, and escalation evidence | Workflow details, public repository/demo, related Shopify case, work-with-me page |
| Work with me | Founders and recruiters assessing suitable problems, process, proof, availability, and next steps | Evidence links, résumé, email, LinkedIn |
| Privacy | Visitors seeking an explanation of site measurement | GA4 purpose, event categories, controls, contact |

## Structured-data inventory

| Page | Types | Key relationships |
| --- | --- | --- |
| Homepage | `WebSite`, `ProfilePage`, `Person` | Stable Person ID: `https://www.wendylechristianseno.com/#person` |
| Case-study index | `CollectionPage`, `BreadcrumbList` | Collection identifies the two visible case-study links |
| Each case study | `Article`, `BreadcrumbList` | `author` points to the existing Person ID; breadcrumb parent is `/case-studies/` |
| Work with me | `WebPage`, `BreadcrumbList` | Page is connected to the existing Person entity and visible hierarchy |
| Privacy | `WebPage` | Matches the visible informational page |
| 404 | None | Intentionally excluded from indexable structured-data inventory |

No Review, rating, FAQ, LocalBusiness, Organization, JobPosting, award, or unsupported outcome markup was added. All JSON-LD blocks parsed successfully in local validation.

## GA4 event and key-event plan

The existing `G-58984RH5TE` tag remains once per HTML page. `js/analytics.js` listens for semantic `data-analytics-event` attributes, permits only the six names below, and sends only the event name plus a non-sensitive page-location label. It does not prevent navigation and does nothing when `gtag` is unavailable.

| Event | Trigger | Recommended GA4 treatment |
| --- | --- | --- |
| `portfolio_email_click` | Mail contact link | Primary key event |
| `portfolio_hire_click` | Work-with-me/hiring CTA | Secondary key event after initial data review |
| `portfolio_resume_download` | Approved résumé link | Secondary key event after initial data review |
| `portfolio_demo_click` | Public project demo or evidence | Engagement event |
| `portfolio_linkedin_click` | LinkedIn outbound link | Engagement event |
| `portfolio_github_click` | GitHub outbound link | Engagement event |

Marking every outbound interaction as a key event would dilute the main employment-contact signal. Verify each event in DebugView and Realtime before changing key-event settings.

## Validation results

| Check | Result | Evidence/notes |
| --- | --- | --- |
| HTML validation | PASS | W3C Nu: 0 errors and 0 warnings on all 7 HTML files |
| Internal crawl | PASS | 59 internal pages/assets; no broken internal links or orphaned indexable pages |
| Sitemap XML | PASS | Valid XML; its six URLs exactly match the indexable canonical set |
| Robots directives | PASS | Search crawlers remain allowed; sitemap location is absolute |
| JSON-LD | PASS | Syntax, expected types, breadcrumb chains, and Article author IDs validated |
| Titles/descriptions/canonicals/H1s | PASS | Unique on all six indexable pages; one H1 per page |
| GA4 installation | PASS | One loader/config and one reusable event script per HTML page |
| Custom-event behavior | PASS | Delegated-listener test confirmed one bind, one event, allowlist enforcement, and no `preventDefault` |
| JavaScript resilience | PASS | Primary headings, content, evidence links, and contact paths are present in the original HTML source |
| Browser console/overflow | PASS | No errors or horizontal overflow on tested local templates |
| Lighthouse, new templates | PASS | Desktop and mobile: 100 in Performance, Accessibility, Best Practices, and SEO for case hub, work-with-me, and privacy |
| Lighthouse, homepage | PASS | Desktop: 100/100/100/100; mobile: 99/100/100/100; mobile LCP 2.1 s, TBT 10 ms, CLS 0 |
| Lighthouse, updated case template | PASS | Desktop and mobile: 100/100/100/100; mobile LCP 1.2 s, TBT 10 ms, CLS 0 |
| 404 Lighthouse | PASS with expected exception | 100 Performance/Accessibility/Best Practices; SEO 63 because intentional `noindex` is correctly detected |
| CSS/JavaScript syntax | PASS | Stylesheets parsed in-browser; both JavaScript files passed `node --check` |
| Git whitespace | PASS | `git diff --check` |
| Secrets/placeholders | PASS with owner review | No token/secret pattern found; existing public demo password `test` and the unverified `3,000+ tickets` claim require confirmation |

These are local lab and static-validation results, not production field data. The redirect rules and live GA4 collection must be verified on the Vercel deployment.

## Completed code work versus owner-only actions

Completed locally:

- New architecture, content, links, metadata, schema, analytics hooks, redirects, sitemap entries, privacy page, and 404 page.
- Evidence-first briefs for six future authority topics.
- Local crawl, markup, schema, event, responsive, console, and Lighthouse checks.

Not performed:

- Push, pull request, merge, deployment, DNS, Vercel project settings, GA4 property settings, Search Console, Bing, LinkedIn, or GitHub profile/repository settings.
- IndexNow key creation or URL submission.
- Publication of unsupported authority articles or an empty `/insights/` archive.

## Limitations and owner decisions

1. Confirm the existing `3,000+ tickets` claim or replace it with wording supported by records.
2. Confirm that the demo-store password `test` remains intentionally public and grants access only to non-sensitive demo content.
3. Approve the résumé, contact address, work availability, case-study facts, dates, and page-specific share images.
4. Choose an explicit training-crawler policy separately from search-crawler access.
5. Review applicable analytics/privacy and consent obligations for the audiences being served; this repository does not make a legal-compliance determination.
6. Validate redirects, cache headers, canonical responses, GA4 events, and the custom 404 on the actual Vercel preview before merging.
7. Search engines decide whether and when to crawl, index, select canonicals, display rich results, or cite a page. The implementation cannot guarantee those outcomes.

## 30-, 60-, and 90-day measurement plan

| Window | Actions | Evaluate without overclaiming |
| --- | --- | --- |
| First 30 days | Record deployment date; confirm GSC/Bing discovery, selected canonicals, sitemap processing, GA4 event collection, and production Core Web Vitals availability | Index coverage, crawl errors, event QA, early branded/non-branded impressions; expect small or volatile samples |
| By 60 days | Compare landing-page/query/device data; review case-hub and work-page engagement; inspect legitimate AI-assistant referrers where provided | Whether qualified discovery paths and email/résumé actions are appearing; do not infer causation from tiny samples |
| By 90 days | Compare against the deployment baseline; identify pages with impressions but weak CTR; review content-brief evidence and publish only an approved substantive article | Directional change in qualified impressions, clicks, key events, and referring sources; prioritize improvements supported by actual data |

## Primary technical references

- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: canonical URL consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [GA4: recommended and custom events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4: DebugView](https://support.google.com/analytics/answer/7201382)
- [Bing: sitemap submission](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [IndexNow documentation](https://www.indexnow.org/documentation)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
