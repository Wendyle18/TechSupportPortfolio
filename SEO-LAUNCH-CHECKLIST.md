# SEO, Analytics, and Discovery Launch Checklist

Owner-action checklist for [wendylechristianseno.com](https://www.wendylechristianseno.com/). Repository changes are complete locally; none of the external actions below has been performed.

## 1. Content and privacy approval

- [ ] Confirm or revise the existing `3,000+ tickets` claim using records you can defend.
- [ ] Confirm that `test` is an intentionally public password for a non-sensitive demo store.
- [ ] Approve the résumé, public email, availability wording, dates, case-study details, and social images.
- [ ] Review the GA4 privacy explanation and determine any consent or notice obligations that apply to the site's audiences.
- [ ] Choose whether training crawlers should be explicitly allowed or disallowed. Keep this separate from Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot search access.
- [ ] Confirm the canonical host remains `https://www.wendylechristianseno.com/`.

## 2. Preview and deployment verification

- [ ] Push the approved branch and create a Vercel preview; do not merge first.
- [ ] Re-crawl the preview and check the browser console/network panel for errors, missing files, blocked assets, mixed content, and analytics duplication.
- [ ] Confirm all six indexable URLs return 200 and the custom 404 returns the host's intended 404 status.
- [ ] Confirm `robots.txt` and `sitemap.xml` return 200 with suitable content types.
- [ ] Confirm HTTP and apex-domain requests resolve to the HTTPS `www` host without a loop.
- [ ] Confirm each alias permanently redirects to its canonical URL: root `/index.html`, directory paths without a trailing slash, and directory `/index.html` paths.
- [ ] Confirm every canonical, Open Graph, image, JSON-LD, and sitemap URL uses the production `www` host.
- [ ] Run production mobile/desktop Lighthouse and compare with the local baseline in `SEO-IMPLEMENTATION-REPORT.md`.
- [ ] Test share previews and run Google's Rich Results Test or Schema Markup Validator on each structured page.
- [ ] Record the final deployment date as the measurement baseline.

## 3. GA4 verification and key events

Before changing GA4 settings, use a preview or production browser with Analytics Debugger/debug mode enabled:

- [ ] Open GA4 **Admin → Data display → DebugView** and confirm the page view appears once.
- [ ] Click one instrumented action at a time and confirm each event appears once: email, hire/work-with-me, LinkedIn, GitHub, résumé, and public demo.
- [ ] Confirm no email address, full outbound URL, query parameter, or other PII appears in event parameters.
- [ ] Check **Reports → Realtime** after deployment and confirm the events arrive under the correct web stream.
- [ ] Mark `portfolio_email_click` as the primary key event.
- [ ] Consider `portfolio_hire_click` and `portfolio_resume_download` as secondary key events only after verifying they are meaningful and not noisy.
- [ ] Keep `portfolio_demo_click`, `portfolio_linkedin_click`, and `portfolio_github_click` as engagement events.
- [ ] Annotate or separately record the deployment date so pre/post comparisons use the correct baseline.

## 4. Google Search Console

Search Console is already configured. After the approved production deployment:

- [ ] Submit or re-submit `https://www.wendylechristianseno.com/sitemap.xml`.
- [ ] Inspect each canonical URL below, choose **Test Live URL**, and request indexing for the new or materially updated version:
  - [ ] `https://www.wendylechristianseno.com/`
  - [ ] `https://www.wendylechristianseno.com/case-studies/`
  - [ ] `https://www.wendylechristianseno.com/case-studies/preorder-campaign-widgets/`
  - [ ] `https://www.wendylechristianseno.com/case-studies/essential-apps-support-guide/`
  - [ ] `https://www.wendylechristianseno.com/work-with-me/`
  - [ ] `https://www.wendylechristianseno.com/privacy/`
- [ ] When processing completes, verify **Google-selected canonical** matches the declared canonical for each page.
- [ ] Review Page Indexing, Crawl Stats, HTTPS, Manual Actions, and Security Issues.
- [ ] Do not repeatedly request indexing for unchanged URLs; request again only after another material update or a resolved indexing problem.

## 5. Bing Webmaster Tools and optional IndexNow

Bing Webmaster Tools is already configured. After deployment:

- [ ] Submit or refresh `https://www.wendylechristianseno.com/sitemap.xml`.
- [ ] Use **URL Submission** for the new and materially updated canonical URLs above.
- [ ] Verify the submitted URLs are crawlable and their declared canonicals match the production destination.
- [ ] Do not submit the 404 page or redirect aliases.

IndexNow is optional and was not implemented. If you choose it:

- [ ] Generate and retain an owner-controlled IndexNow key of 8–128 supported characters.
- [ ] Host the key file at the documented root or provide its valid `keyLocation`.
- [ ] Submit only canonical URLs that are new, updated, or deleted.
- [ ] Never commit a fabricated key, reuse a secret credential, or treat submission as a guarantee of indexing.

## 6. LinkedIn actions

- [ ] Add the homepage to the Contact info/website field.
- [ ] Add the case-study hub and both individual case studies to Featured with descriptive titles.
- [ ] Align the headline and About section with the verified SaaS Technical Support Engineer positioning and reproduce → investigate → communicate/escalate → verify → document workflow.
- [ ] Ensure employer names, dates, job titles, location, availability, and contact details match the approved portfolio.
- [ ] Use natural descriptions; do not manufacture endorsements, metrics, or keyword-heavy posts solely for links.

## 7. GitHub profile and repository actions

- [ ] Profile bio: use a concise verified position such as `SaaS Technical Support Engineer | Shopify and e-commerce troubleshooting | HTML, CSS and JavaScript | Philippines`.
- [ ] Profile website: `https://www.wendylechristianseno.com/`.
- [ ] Profile README: link the portfolio, case-study hub, and both individual case studies.
- [ ] Repository description: `Technical support portfolio for SaaS, Shopify and e-commerce troubleshooting, front-end customization, and support documentation.`
- [ ] Repository homepage: `https://www.wendylechristianseno.com/`.
- [ ] Suggested topics: `technical-support`, `support-engineering`, `saas`, `shopify`, `ecommerce`, `api-troubleshooting`, `html-css-javascript`, `portfolio`.
- [ ] Pin the portfolio and the strongest public evidence repositories; remove or de-emphasize outdated projects and dead links.

## 8. 30-, 60-, and 90-day operating checklist

### 30 days

- [ ] Verify sitemap processing, indexing status, selected canonicals, GA4 event integrity, crawl errors, and available production Core Web Vitals.
- [ ] Record early branded/non-branded query and landing-page baselines without treating small samples as a trend.

### 60 days

- [ ] Compare case-hub and work-with-me discovery, query/device patterns, and contact/résumé actions.
- [ ] Review legitimate assistant referrers only where a referrer is actually supplied.
- [ ] Select an authority brief only if the required first-hand evidence can be provided and anonymized.

### 90 days

- [ ] Compare qualified impressions, clicks, CTR, landing pages, and key events with the recorded deployment baseline.
- [ ] Improve pages with meaningful impressions but weak CTR or mismatched intent.
- [ ] Publish an insight only after its evidence gate is complete; then add `/insights/` to navigation and the sitemap.

## Official references

- [Google URL Inspection and recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [GA4 event collection](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 key events](https://support.google.com/analytics/answer/13128484)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
- [Bing sitemap submission](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Bing URL Submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b)
- [IndexNow documentation](https://www.indexnow.org/documentation)
