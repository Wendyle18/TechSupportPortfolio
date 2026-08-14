# Evidence-First Authority Content Roadmap

Updated: August 14, 2026

This roadmap is a publishing plan, not a list of completed articles or claims. No `/insights/` archive should be created until Wendyle has approved at least one substantive article backed by first-hand evidence.

## Editorial and confidentiality rules

Every article must:

- Be based on work Wendyle personally performed and can explain in an interview.
- Anonymize merchants, customers, stores, ticket IDs, internal URLs, credentials, tokens, private endpoints, company-only procedures, and confidential product details.
- Separate observed facts, test results, hypotheses, and limitations.
- Include the problem and environment, reproduction steps, investigation and evidence, root cause or best-supported diagnosis, resolution or workaround, limitations, primary-source references, relevant portfolio links, and a founder/recruiter-oriented call to action.
- Use screenshots, logs, or code only when publication is permitted and sensitive values have been removed.
- Avoid invented results, traffic claims, resolution-time metrics, customer quotes, or ranking promises.

If the evidence listed in a brief is unavailable, keep the topic in draft status and collect the missing information before writing.

## Days 1–30: Investigation and escalation credibility

### Brief 1 — How to distinguish a Shopify theme conflict from an app issue

**Audience and purpose:** Shopify founders, support leads, and technical recruiters evaluating systematic storefront troubleshooting.

**Evidence gate:** Use one real anonymized case where Wendyle compared theme and app states. Do not publish if the original symptom, test sequence, and final diagnosis cannot be reconstructed.

**Information Wendyle must provide:**

- The storefront symptom and affected page or component.
- Theme name or safely generalized theme context, app/embed state, browser, device, and relevant configuration.
- Exact reproduction steps and expected versus actual behavior.
- Comparison evidence from another theme, app-disabled state, DOM/CSS/console/network inspection, or a minimal test.
- What was ruled out, the best-supported cause, and why.
- The implemented fix, safe workaround, or escalation outcome.
- Any uncertainty, theme-specific limitation, or test that could not be completed.

**Recommended structure:**

1. Why theme conflicts and app defects can look identical.
2. Anonymized problem and environment.
3. Reproduction and baseline evidence.
4. Controlled comparisons: app state, theme state, DOM, CSS, JavaScript, and network behavior.
5. Root cause or best-supported diagnosis.
6. Resolution or escalation path.
7. Limitations and a reusable decision checklist.

**Primary sources to cite:** Relevant Shopify theme architecture, app embed, theme app extension, and browser DevTools documentation. Use the documentation version that matches the case.

**Internal links and CTA:** Link to the [Preorder Campaign Widgets case study](https://www.wendylechristianseno.com/case-studies/preorder-campaign-widgets/) and the [work-with-me page](https://www.wendylechristianseno.com/work-with-me/). CTA: invite teams to discuss a role that requires Shopify and browser-level troubleshooting.

### Brief 2 — How to prepare an evidence-rich engineering escalation

**Audience and purpose:** SaaS support managers, support engineers, and recruiters evaluating cross-team handoff quality.

**Evidence gate:** Use an anonymized escalation Wendyle prepared or a verified support workflow he built. Do not present a template as proven unless it reflects a real process he used.

**Information Wendyle must provide:**

- Customer impact and issue scope without identifying the customer.
- Expected and actual results, reproduction steps, environment, timestamps, and frequency.
- Screenshots, console/network evidence, request or response details, correlation identifiers, or sanitized logs that were genuinely collected.
- Troubleshooting already completed and what each test ruled in or out.
- Workaround status and remaining customer risk.
- The exact questions engineering needed to answer.
- What information was missing or added after the first handoff.

**Recommended structure:**

1. Why incomplete escalations slow diagnosis.
2. Anonymized issue and environment.
3. Minimum reproducible steps and scope.
4. Evidence package and completed tests.
5. Workaround and customer communication.
6. Engineering questions and final handoff structure.
7. Limitations and a reusable escalation checklist.

**Primary sources to cite:** Official documentation for the relevant platform, API, browser tooling, HTTP behavior, or logging system used in the example.

**Internal links and CTA:** Link to the [Essential Apps Support Guide v2 case study](https://www.wendylechristianseno.com/case-studies/essential-apps-support-guide/) and the [work-with-me page](https://www.wendylechristianseno.com/work-with-me/). CTA: invite support leaders to review Wendyle for roles requiring reproducible engineering handoffs.

## Days 31–60: Commerce and browser diagnostics

### Brief 3 — Diagnosing Shopify price mismatches caused by multiple apps

**Audience and purpose:** Shopify teams and SaaS support leaders investigating storefront prices that differ across product, cart, and checkout surfaces.

**Evidence gate:** Use a first-hand case involving multiple price-affecting components or apps. Do not imply that an app caused the mismatch unless the test evidence supports that conclusion.

**Information Wendyle must provide:**

- The mismatched values and where each appeared.
- Product, variant, market, currency, discount, subscription, bundle, preorder, or other relevant configuration.
- Which apps or theme components could affect price presentation.
- Reproduction steps across product page, cart, checkout, and a controlled comparison state.
- DOM, JavaScript, network, Shopify data, or configuration evidence.
- The order in which possible causes were isolated.
- Root cause or best-supported diagnosis, resolution, and remaining limitations.

**Recommended structure:**

1. Map every surface where price can change.
2. Record the verified environment and pricing rules.
3. Reproduce the mismatch consistently.
4. Isolate one price-affecting layer at a time.
5. Compare displayed values with authoritative platform data.
6. Resolve, work around, or escalate with evidence.
7. Limitations and a reusable price-mismatch checklist.

**Primary sources to cite:** Official Shopify documentation for product variants, discounts, Markets/currency, cart or checkout behavior, and the documented interfaces of any app involved.

**Internal links and CTA:** Link to the [Preorder Campaign Widgets case study](https://www.wendylechristianseno.com/case-studies/preorder-campaign-widgets/) and the [work-with-me page](https://www.wendylechristianseno.com/work-with-me/). CTA: invite teams to discuss support work involving Shopify state and storefront integrations.

### Brief 4 — Using browser DevTools to investigate customer-facing SaaS issues

**Audience and purpose:** Startup founders, support leaders, and recruiters looking for practical browser-level investigation skills.

**Evidence gate:** Use a real anonymized issue where DevTools changed or narrowed the diagnosis. A generic tour of DevTools is insufficient.

**Information Wendyle must provide:**

- The customer-visible symptom and affected workflow.
- Browser, device, environment, account state, and safe reproduction context.
- Which DevTools panels were used and why: Elements, Styles, Console, Network, Application, Performance, or responsive mode.
- Sanitized evidence such as selectors, computed styles, error messages, request status, response shape, storage state, or timing.
- What each observation ruled in or out.
- The fix, workaround, or evidence sent to engineering.
- Any limitation caused by permissions, production-only state, or missing access.

**Recommended structure:**

1. Define the user-facing symptom before opening DevTools.
2. Reproduce and record the environment.
3. Inspect the rendered DOM and computed styles.
4. Check console and network evidence.
5. Review browser storage or state only when relevant and authorized.
6. Form and test a diagnosis.
7. Resolve or escalate, then document limitations.

**Primary sources to cite:** Official Chrome DevTools documentation plus official product or API documentation relevant to the case.

**Internal links and CTA:** Link to both the [case-study collection](https://www.wendylechristianseno.com/case-studies/) and the [work-with-me page](https://www.wendylechristianseno.com/work-with-me/). CTA: invite teams to discuss roles requiring customer-facing browser diagnostics.

## Days 61–90: Documentation and support judgment

### Brief 5 — Creating maintainable technical support documentation

**Audience and purpose:** Support managers and SaaS leaders evaluating knowledge-system design and documentation ownership.

**Evidence gate:** Base the article on the verified Essential Apps Support Guide v2 project or another approved documentation system. Do not claim time savings or adoption without source data.

**Information Wendyle must provide:**

- The original documentation problem and who needed the information.
- Examples of recurring issue types and the evidence agents commonly missed.
- The content model used for apps, issues, checklists, snippets, replies, ticket references, and playbooks.
- How content is added, reviewed, found, and kept separate from confidential data.
- One anonymized example from issue selection to response or escalation output.
- Known limitations: browser-local records, no support-system synchronization, and ownership requirements.
- Any qualitative feedback that can be quoted only with permission.

**Recommended structure:**

1. Define the findability and maintenance problem.
2. Inventory the support tasks the documentation must enable.
3. Separate reusable data from interface presentation.
4. Design for investigation, replies, and escalation evidence.
5. Establish review, ownership, and confidentiality rules.
6. Show an anonymized workflow example.
7. Limitations and a maintenance checklist.

**Primary sources to cite:** Official product documentation for the supported platforms and primary accessibility or web-platform documentation used in the interface.

**Internal links and CTA:** Link to the [Essential Apps Support Guide v2 case study](https://www.wendylechristianseno.com/case-studies/essential-apps-support-guide/) and the [work-with-me page](https://www.wendylechristianseno.com/work-with-me/). CTA: invite support teams to discuss roles involving documentation and escalation workflows.

### Brief 6 — Deciding between a customer workaround and an engineering fix

**Audience and purpose:** SaaS founders, support leaders, and technical recruiters evaluating risk judgment and customer communication.

**Evidence gate:** Use one real anonymized decision where Wendyle evaluated both a workaround and a product or engineering fix. Do not claim a workaround was safe without the constraints and validation evidence.

**Information Wendyle must provide:**

- Customer impact, urgency, affected scope, and verified environment.
- What was known, unknown, and still under investigation.
- Candidate workaround, reversibility, prerequisites, risks, and validation steps.
- Why support could or could not implement it safely.
- Evidence showing whether the underlying defect required engineering.
- Customer communication and monitoring plan.
- Final resolution or, if unresolved, the best-supported next step and limitations.

**Recommended structure:**

1. Separate immediate customer impact from root-cause ownership.
2. Define workaround safety criteria.
3. Evaluate reversibility, data risk, scope, and supportability.
4. Preserve evidence for an engineering fix.
5. Communicate the temporary and durable paths clearly.
6. Validate the workaround and monitor for recurrence.
7. Limitations and a reusable decision matrix.

**Primary sources to cite:** Official product, API, security, browser, or platform documentation that defines the relevant behavior and constraints.

**Internal links and CTA:** Link to the [case-study collection](https://www.wendylechristianseno.com/case-studies/) and the [work-with-me page](https://www.wendylechristianseno.com/work-with-me/). CTA: invite SaaS leaders to discuss roles requiring calm support judgment and engineering coordination.

## Publishing and measurement cadence

- Publish no more than one evidence-backed article every one to two weeks.
- Add `/insights/` only when the first article is approved, complete, and linked from that archive.
- Add each published article’s canonical URL to `sitemap.xml` with its real publication or material-modification date.
- Link each article to the most relevant case study and to `/work-with-me/`.
- Share approved articles from LinkedIn with first-person context; do not copy generic AI summaries.
- At 30, 60, and 90 days, review real Search Console queries, landing pages, links, and GA4 contact actions. Low-volume data may not support firm conclusions.

## Reusable pre-publication evidence checklist

- [ ] First-hand case owner confirmed.
- [ ] Merchant, customer, store, and company details anonymized.
- [ ] Problem and environment documented.
- [ ] Reproduction steps verified.
- [ ] Investigation evidence sanitized and approved.
- [ ] Root cause clearly separated from hypothesis.
- [ ] Resolution, workaround, or escalation described accurately.
- [ ] Limitations included.
- [ ] Primary sources linked.
- [ ] Relevant case study and work-with-me links added.
- [ ] Founder/recruiter-oriented CTA included.
- [ ] No invented metrics, quotes, results, or guarantees.
