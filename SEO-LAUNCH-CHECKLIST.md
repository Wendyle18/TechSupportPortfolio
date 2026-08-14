# SEO and AI Visibility Launch Checklist

Owner-action checklist for the production launch of [wendylechristianseno.com](https://www.wendylechristianseno.com/). Completing these steps improves eligibility and measurement; it does not guarantee crawling, indexing, rankings, rich results, AI citations, or hiring outcomes.

## Before deployment

- [ ] Review the local diff, case-study facts, employment dates, public contact details, and the `3,000+ tickets` statement.
- [ ] Confirm that `test` is still an intentionally public password for a restricted, non-sensitive demo store. Remove it from the portfolio if that changes.
- [ ] Choose a policy for training crawlers before adding explicit rules for GPTBot, ClaudeBot, or Google-Extended. Search visibility crawlers are handled separately in `robots.txt`.
- [ ] Confirm the canonical production host remains `https://www.wendylechristianseno.com/`.
- [ ] Confirm the three URLs in `sitemap.xml` return HTTP 200 after deployment.
- [ ] Confirm no staging URL, private customer data, secret, token, or real store credential appears in the deployed files.

## Google Search Console

- [ ] Add and verify a Domain property for `wendylechristianseno.com`, preferably with a DNS TXT record.
- [ ] Submit `https://www.wendylechristianseno.com/sitemap.xml`.
- [ ] Inspect and request indexing for:
  - [ ] `https://www.wendylechristianseno.com/`
  - [ ] `https://www.wendylechristianseno.com/case-studies/preorder-campaign-widgets/`
  - [ ] `https://www.wendylechristianseno.com/case-studies/essential-apps-support-guide/`
- [ ] Use URL Inspection to verify Google selected the intended canonical URL for each page.
- [ ] Review Page Indexing, Crawl Stats, HTTPS, Manual Actions, and Security Issues after launch.
- [ ] Record the deployment date so later performance comparisons use the correct baseline.
- [ ] Monitor query, page, device, country, and search-appearance data.
- [ ] Use the Generative AI performance report if it is available in the property.

## Bing and AI discovery

- [ ] Verify the site in Bing Webmaster Tools or import the verified Search Console property.
- [ ] Submit `https://www.wendylechristianseno.com/sitemap.xml` to Bing.
- [ ] Confirm production `robots.txt` allows Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot.
- [ ] Check Vercel or edge-security logs for accidental blocking or repeated 403/429 responses to legitimate crawlers.
- [ ] Consider IndexNow only after deciding where to store its key and how deployment updates will submit changed canonical URLs. IndexNow can notify participating engines of changes; it does not guarantee indexing.
- [ ] Do not add `llms.txt` as a Google ranking or AI-visibility tactic. Google states that it does not use the file for Search or generative Search visibility.

## Training-crawler policy decision

The current `robots.txt` intentionally makes no explicit training-data policy decision. Choose one of these options before adding directives:

1. Allow training crawlers by leaving them governed by the general `User-agent: *` rule.
2. Disallow selected training crawlers explicitly, such as GPTBot and ClaudeBot, while continuing to allow OAI-SearchBot and Claude-SearchBot.
3. Define a broader organization policy after reviewing tradeoffs for all training-related crawlers, including Google-Extended.

Document the choice and review it periodically because crawler names and product behavior can change.

## Professional entity and authority

- [ ] Add the portfolio to the LinkedIn Featured section.
- [ ] Align the LinkedIn headline, About section, job title, location, and project links with the portfolio’s verified Technical Support Engineer positioning.
- [ ] Link the full HTTPS portfolio URL from the GitHub profile.
- [ ] Enable “available for hire” only if desired.
- [ ] Pin this portfolio and the strongest case-study repositories.
- [ ] Seek legitimate links from real profiles, authored technical content, projects, and professional communities.
- [ ] Do not buy backlinks, mass-submit directories, use private blog networks, publish fake reviews, or generate low-value search pages.

## Recommended GitHub repository metadata

These changes require explicit approval and must be applied in GitHub, not in the local source tree.

- Description: `Portfolio of Wendyle Seno, a SaaS Technical Support Engineer focused on Shopify, API troubleshooting, e-commerce support, and front-end customization.`
- Homepage: `https://www.wendylechristianseno.com/`
- Topics:
  - `technical-support`
  - `support-engineering`
  - `saas`
  - `shopify`
  - `ecommerce`
  - `api-troubleshooting`
  - `html-css-javascript`
  - `portfolio`
- Pin recommendation: pin this repository on the GitHub profile.

## Recommended GitHub profile checklist

- [ ] Replace conflicting “aspiring Front-end Developer” positioning, if it is still present.
- [ ] Suggested bio: `Technical Support Engineer | SaaS, Shopify and e-commerce troubleshooting | HTML, CSS and JavaScript | Remote — Philippines`
- [ ] Add `https://www.wendylechristianseno.com/` as the profile website.
- [ ] Pin the portfolio and strongest case-study repositories.
- [ ] Keep the role title consistent across GitHub, LinkedIn, and the portfolio.

## Recommended LinkedIn checklist

- [ ] Headline should lead with `SaaS Technical Support Engineer` and use Shopify, e-commerce, API troubleshooting, and front-end customization only where accurate.
- [ ] About section should explain the reproduce → isolate → resolve/escalate → document workflow in first person.
- [ ] Add both case-study URLs to Featured.
- [ ] Confirm that dates, company names, job titles, location, and availability match the portfolio.
- [ ] Use the same profile name and professional photo across LinkedIn and the portfolio where desired.

## Privacy-conscious measurement plan

Do not install analytics until the owner explicitly approves a provider, consent approach, and retention policy.

- Organic discovery: Search Console impressions, clicks, CTR, average position, branded queries, and non-branded queries.
- Landing pages: homepage and case-study entrances from Search Console and privacy-approved server or analytics data.
- Conversion actions: contact-link clicks and LinkedIn/GitHub outbound clicks only after an approved measurement implementation exists.
- Technical quality: Lighthouse scores, Core Web Vitals field data when available, broken links, and crawl errors.
- AI referrals: review referrer data for ChatGPT, Perplexity, Claude, and other assistants where a referrer is actually provided.
- Reporting cadence: compare at 30, 60, and 90 days, while accounting for deployment dates and low-volume data.

## Post-deployment technical checks

- [ ] Verify HTTP and apex-domain requests resolve to the HTTPS `www` canonical host without loops.
- [ ] Confirm homepage, case studies, `robots.txt`, and `sitemap.xml` return HTTP 200 with appropriate content types.
- [ ] Confirm canonical, Open Graph, Twitter, and JSON-LD URLs use the production `www` host.
- [ ] Run production Lighthouse on mobile and desktop.
- [ ] Test the social image with LinkedIn Post Inspector and other relevant preview debuggers.
- [ ] Run Rich Results Test and Schema Markup Validator on all three pages.
- [ ] Check browser console and network panels for 404s, blocked assets, mixed content, or JavaScript errors.
- [ ] Re-crawl all internal links and image/CSS/JavaScript assets.

## Official guidance checked on August 14, 2026

- [Google: optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [Google ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [IndexNow documentation](https://www.indexnow.org/documentation)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Anthropic crawler guidance](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
