# Philippines Positioning Launch Checklist

Owner-only actions for the approved production release of [wendylechristianseno.com](https://www.wendylechristianseno.com/). None of these external actions was performed during implementation.

## 1. Content, evidence, and privacy approval

- [ ] Approve the primary positioning: `Wendyle Seno — SaaS Technical Support Engineer in the Philippines`.
- [ ] Confirm the Philippines location and remote-availability wording.
- [ ] Confirm or revise the existing `3,000+ tickets` statement using defensible records.
- [ ] Confirm that `test` remains an intentionally public password for a non-sensitive demo store.
- [ ] Approve the résumé, public email, employment details, case-study facts, and share image.
- [ ] Review GA4 privacy/consent obligations for the site's actual audiences.
- [ ] Keep search-crawler access and any future training-crawler policy as separate decisions.

## 2. Vercel preview before merge

- [ ] Push only the approved files to a feature branch and create a Vercel preview; do not merge first.
- [ ] Confirm all seven indexable URLs return HTTP 200 and the custom unavailable-page path returns HTTP 404.
- [ ] Confirm `robots.txt` and `sitemap.xml` return 200 with suitable content types.
- [ ] Confirm the new aliases return permanent redirects without loops:
  - [ ] `/saas-technical-support-philippines`
  - [ ] `/saas-technical-support-philippines/index.html`
  - [ ] Destination: `/saas-technical-support-philippines/`
- [ ] Recheck the existing HTTP/apex, `/index.html`, no-slash, and directory `/index.html` redirects.
- [ ] Confirm every canonical, Open Graph, image, JSON-LD, and sitemap URL uses `https://www.wendylechristianseno.com/`.
- [ ] Crawl the preview for missing assets, broken links, mixed content, and console/network errors.
- [ ] Manually test Tab, Shift+Tab, Enter, Escape, visible focus, mobile navigation, review lightbox, dark/light switching, and theme inheritance across pages.
- [ ] Run production mobile/desktop Lighthouse after deployment and compare it with the local report.
- [ ] Record the deployment date as the measurement baseline.

## 3. Google Search Console after deployment

- [ ] Submit or refresh `https://www.wendylechristianseno.com/sitemap.xml`.
- [ ] Inspect the new canonical URL, select **Test Live URL**, then **Request Indexing**:
  - [ ] `https://www.wendylechristianseno.com/saas-technical-support-philippines/`
- [ ] Inspect the two materially updated pages, test live, and request indexing:
  - [ ] `https://www.wendylechristianseno.com/`
  - [ ] `https://www.wendylechristianseno.com/work-with-me/`
- [ ] Inspect `/case-studies/` if you want Google to see the new cluster link promptly; the individual case bodies were not materially rewritten.
- [ ] After processing, verify **Google-selected canonical** matches each declared canonical.
- [ ] Review Page Indexing, Crawl Stats, HTTPS, Manual Actions, and Security Issues.
- [ ] Do not repeatedly request indexing for unchanged URLs.
- [ ] Treat the strategy's target queries as themes. Record actual impressions/clicks only from Search Console; do not infer rankings from private/incognito spot searches.

## 4. Bing Webmaster Tools

- [ ] Submit or refresh `https://www.wendylechristianseno.com/sitemap.xml`.
- [ ] Use URL Submission for the new Philippines page, homepage, and work page after deployment.
- [ ] Verify crawlability and canonical selection for the submitted URLs.
- [ ] Do not submit the 404 page or redirect aliases.
- [ ] If choosing IndexNow later, create an owner-controlled key, host its verification file at the documented location, and submit only new, changed, or deleted canonical URLs. No key was created or committed.

## 5. GA4 verification

Use Tag Assistant/debug mode and the site's existing GA4 stream:

- [ ] Open **Admin → Data display → DebugView** and verify one page view for the new Philippines page.
- [ ] From the new page, test one action at a time and confirm exactly one event: email, work/hire, LinkedIn, GitHub, and résumé.
- [ ] Confirm no full outbound URL, email address, query parameter, or other PII appears in event parameters.
- [ ] Check **Reports → Realtime** after deployment.
- [ ] Keep `portfolio_email_click` as the primary key-event recommendation.
- [ ] Treat `portfolio_hire_click` and `portfolio_resume_download` as possible secondary key events after reviewing noise and meaning.
- [ ] Keep demo, LinkedIn, and GitHub clicks as engagement events.

## 6. LinkedIn owner actions

Do not add the LinkedIn public-profile badge script.

- [ ] Add `https://www.wendylechristianseno.com/` to LinkedIn Contact Info.
- [ ] Add `https://www.wendylechristianseno.com/saas-technical-support-philippines/` to Featured.
- [ ] Add the case-study collection and strongest individual cases to Featured.
- [ ] Keep the name, role, Philippines location, availability, and employment history consistent with the approved website and résumé.
- [ ] Share substantive case studies with natural first-person descriptions rather than keyword lists.

LinkedIn supports website links in Contact Info and professional work in Featured; those owner-controlled links are more useful than adding a third-party badge script to the portfolio.

## 7. GitHub owner actions

- [ ] Profile bio suggestion: `SaaS Technical Support Engineer | Shopify, APIs and front-end troubleshooting | Philippines`.
- [ ] Profile website: `https://www.wendylechristianseno.com/`.
- [ ] Profile README: link the homepage, Philippines support page, case-study collection, and strongest cases.
- [ ] Repository description: `Portfolio of a Philippines-based SaaS Technical Support Engineer focused on Shopify, APIs, browser debugging, escalation, and front-end systems.`
- [ ] Repository homepage: `https://www.wendylechristianseno.com/`.
- [ ] Suggested topics: `technical-support`, `support-engineering`, `saas`, `shopify`, `ecommerce`, `api-troubleshooting`, `philippines`, `portfolio`.
- [ ] Pin the portfolio and strongest public evidence repositories; remove dead links and de-emphasize outdated work.

## 8. 30-, 60-, and 90-day measurement plan

### First 30 days

- [ ] Verify sitemap processing, indexing state, selected canonicals, crawl errors, GA4 event integrity, and available production Core Web Vitals.
- [ ] Record a baseline for actual queries containing combinations of SaaS, support, technical support, engineer, Shopify, remote, and Philippines.
- [ ] Treat low-volume query samples as exploratory, not as proof of impact.

### By 60 days

- [ ] Compare impressions, clicks, CTR, landing pages, devices, countries, and email/résumé/hire actions with the deployment baseline.
- [ ] Review whether the Philippines page attracts qualified discovery or whether copy/search intent needs refinement.
- [ ] Select an authority brief only if Wendyle can supply the required first-hand evidence and anonymization.

### By 90 days

- [ ] Compare directional changes in qualified non-branded impressions, case-study entrances, and contact actions.
- [ ] Improve pages with meaningful impressions but weak CTR or mismatched intent.
- [ ] Publish the first insight only after its evidence gate passes; create `/insights/` only then.
- [ ] Review legitimate professional mentions and assistant referrers only where the underlying source/referrer is actually available.

## Official references

- [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [Google internal structure and crawlable-page guidance](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
- [Bing URL Submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b)
- [Bing sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Vercel redirects and trailing-slash configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [LinkedIn website links](https://www.linkedin.com/help/linkedin/answer/a548010/add-a-website-to-your-profile)
- [LinkedIn Featured section](https://www.linkedin.com/help/linkedin/answer/a552452/featured-section-on-your-profile-faqs)
