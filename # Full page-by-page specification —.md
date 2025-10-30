# Full page-by-page specification — **every** public page on the EncryptArx website (EXHAUSTIVE, actionable)

Below is a complete, page-level breakdown of **every public page** that will exist on the EncryptArx (ECX) website.
For each page I list:

* Exact sections (in order) and component names
* Required content / microcopy examples you can use immediately
* Data & APIs the page will call (what to fetch and how)
* Forms and CTAs on that page (and gating rules)
* SEO / metadata to include (title, description, structured data)
* Accessibility & performance notes
* Mobile considerations & interactions

> This is intended to be a canonical specification you can hand directly to designers and engineers. Nothing is left out — if you want a wireframe or code for any specific page next, tell me which page and I’ll produce it immediately.

---

# 1. Homepage (`/`)

**Purpose:** immediate trust & clarity; two primary user funnels (Clients → Services, and Products → Products Hub). No product details on homepage.

**Sections (top → bottom):**

1. **Top navigation (persistent)**

   * Components: `TopNav` (logo, links: Services, Products, Library, Clients, Blog, Careers, Contact), search icon, primary CTA button `Request Assessment`.
   * Accessibility: `role="navigation"`, skip link.

2. **Hero (full width)**

   * `Hero` component: H1 = `Your Data’s Impregnable Citadel.`
   * Subhead: `Security-first engineering, AI-driven insights, and Web3 innovation — tailored solutions for enterprises and everyday users.`
   * Primary CTA: `Request Assessment` (open booking form modal or `/contact#booking`).
   * Secondary CTA: `Explore Research` → `/library`.
   * Right visual: animated orb / isometric node graph (accent gradient `#2b8dbe → #4896bd`).
   * Tracking: event `homepage_hero_click`.

3. **Client vs Product Quick Paths**

   * Two large cards (visuals + short paragraph): `For Clients — Services & Engagements` (link `/services`), `Products Hub — Catalog & Trials` (link `/products`).
   * Behavior: hover animation, keyboard focus.

4. **Core Capabilities**

   * Chips / small cards: Cybersecurity, AI/ML, Web3, Cloud Security, Product Engineering, Threat Intelligence. Each chip links to the related services page.
   * Data: static content.

5. **Featured Research** (carousel)

   * 3 Library tiles pulled from `/api/library?featured=true`. Each tile: title, author, year, short snippet. CTA → `/library/{slug}`.

6. **Selected Case Studies**

   * 3 case-study cards (Problem → Approach → Result KPI). CTA → `/clients/{case-slug}`.
   * Data: fetch from `/api/cases?featured=true`.

7. **Trusted-by / Partners Strip**

   * Client logos, optional small LinkedIn post feed (last 3 posts) — fetch from LinkedIn feed API or static images.

8. **Testimonials**

   * 2–3 quotes with client name and logo, star ratings optional.

9. **Security Snapshot / Quick Stats**

   * Tiny KPI cards: `Audits completed`, `Threats mitigated`, `Years research`, `Active installs` (numbers pulled from internal analytics).

10. **Footer**

* Multi-column: Quick Links, Products, Library, Legal, Contacts, Socials, Newsletter sign-up.

**SEO / meta**

* Title: `EncryptArx — Cybersecurity, AI/ML & Web3 Solutions`
* Description: short summary from PDFs. Include `Organization` JSON-LD.

**Accessibility & performance**

* All interactive elements keyboard accessible.
* Lazy-load hero visual.
* Provide `alt` text for images.
* Respect `prefers-reduced-motion`.

---

# 2. About (`/about`)

**Purpose:** company identity, mission, leadership, timeline, trust signals.

**Sections:**

1. **Hero** — short tagline + one-line mission.

   * Microcopy: “Empowering businesses with secure, scalable, future-ready digital solutions.” (from PDFs)

2. **Mission & Vision**

   * Use verbatim from Corporate Profile PDF.

3. **What We Do (One-liners)**

   * Blocks: Cybersecurity, AI/ML, Web3, Product Engineering — 1–2 sentences each.

4. **Leadership & Team**

   * Profiles: photo, name, title, short bio, LinkedIn link (CEO, CTO, Director R&D etc).
   * Data: static (from PDFs).

5. **Timeline / Milestones**

   * Visual timeline: founding, product launches, partnerships.

6. **Certifications & Standards**

   * ISO-27001 (language must reflect verified status — `ISO-27001 aligned` if not certified), GDPR mention, frameworks used (NIST, MITRE).
   * Show badges (images) only if you can substantiate.

7. **Careers CTA** — link to `/careers`.

8. **Contact / Locations** — office address (from PDF), map embed optional.

**SEO**

* Title: `About EncryptArx — Mission, Team & Values`
* Structured data: `Organization` + `Person` for leadership.

---

# 3. Services Overview (`/services`)

**Purpose:** entry for client-facing offerings.

**Sections:**

1. **Hero** — "Our Services" one-liner, CTA `Request Assessment`.
2. **Service Category Cards** — Cybersecurity, AI/ML, Blockchain/Web3, Product Engineering, Cloud Security, Threat Intelligence, Research Partnerships. Each card links to service detail `/services/{slug}`.
3. **How We Engage** — engagement model visual (PoC → Pilot → Deploy → Operate).
4. **Client Industries** — industries: Finance, Logistics, Healthcare, eCommerce.
5. **Featured Case Studies** — relevant cases.
6. **Contact / Book Consultation** — form CTA.

**APIs**

* Static content + `/api/services` for lists.

---

# 4. Service Detail (`/services/{service-slug}`) — for each major service

**Examples:** Cybersecurity, AI/ML, Blockchain Audits, Incident Response, Threat Intelligence, Cloud Security, Mobile App Security.

**Order of sections (must be exact):**

1. **Hero** — Service name, 1-line problem statement + CTA `Request Proposal`.
2. **Problem (Who it's for)** — 3 bullets.
3. **Our Approach** — diagram (Assess → Harden → Monitor → Respond).
4. **Capabilities & Deliverables** — detailed bulleted list (VAPT, Mobile App Pentest, SOC integration, EDR deployment, model auditing, smart contract audits, etc). Use phrasing verbatim from PDFs.
5. **Tools & Frameworks** — icon grid (OWASP, MITRE, Nessus, Burp, MobSF, Wazuh, TensorFlow).
6. **Process / Timeline** — typical timeline, milestones.
7. **Case Studies** — linked.
8. **Pricing models** — engagement types (fixed-scope, retainer, outcomes). If pricing is sensitive, show `Contact Sales`.
9. **FAQ** — typical customer questions.
10. **CTA / Contact Form** — `Request Proposal` (opens RFP form prefilled with this service).

**Data & endpoints**

* `GET /api/services/{slug}` returns capability list, tools, case-study IDs.

---

# 5. Products Hub (`/products`)

**Purpose:** dedicated product catalog & discovery (no product detail on homepage).

**Sections:**

1. **Hero** — `Products Hub` with explanation of taxonomy and `Search products` bar (semantic).
2. **Category Tiles** — Consumer Security, Enterprise Security, Detection Engines, APIs & SDKs, Developer Tools, Compliance Tools, R&D Prototypes.
3. **Search & Filters Panel**

   * Filters: status (prototype/alpha/beta/GA), platform, access level, tags, industry.
   * Sort: relevance, latest, downloads.
4. **Product Grid** — `ProductCard` (image, name, status badge, short tagline, tags, CTA `View details`).
5. **Compare Widget** — checkbox select up to 3; compare features grid.
6. **Callouts** — `Request Trial` and `Contact Sales` CTAs.

**APIs**

* `GET /api/products?q=&category=&status=&tags=&page=`
* `GET /api/products/categories`

**Gating**

* If `product.access_level === gated`, `ProductCard` CTA goes to `Request Trial` form.

---

# 6. Product Category (`/products/category/{category-slug}`)

**Purpose:** subset of hub: list products in category.

**Sections**

1. **Hero** — category name & description.
2. **Filters & Search** (persisted from hub).
3. **Product list** with short descriptions.
4. **CTA** — `Request Trial` / `Compare`.

---

# 7. Product Detail (`/products/{product-slug}`)

**Purpose:** full product page. This page is long and must follow this exact order.

**Sections (strict order):**

1. **Hero**

   * Product name, status badge (prototype|alpha|beta|GA), 1-line tagline, primary CTA: `Request Trial` or `Get Demo`.
   * Small secondary CTA: `View Docs`.
   * Trust microcopy: `Used by [client logos]` if applicable.

2. **Top ribbon (stats)**

   * Platform icons, latest version, SLA / supported regions, license (freemium/enterprise).

3. **Elevator summary** (2–3 sentences)

   * Quick problem → solution.

4. **Value & KPIs** (numbers)

   * e.g., `Reduces false positives by X%`, `Process 1000 events / sec`.

5. **Top features (3–6)**

   * Each feature: icon, title, one-line description, optional `Read more` anchored to technical section.

6. **Technical Architecture**

   * Interactive diagram (zoom + hover nodes with detail).
   * Include data flow: where data is stored, how it travels, retention. Must be factual.

7. **Quickstart & SDKs**

   * Copyable code snippet (Node/Python) + `Copy` button + `Open docs`.
   * Link to `/products/{product-slug}/docs` for full API reference.

8. **Live Demo / Sandbox**

   * If available: iframe or gated sandbox login → `Open Sandbox` CTA.
   * Else: `Request Demo` CTA.

9. **Integrations & Partners**

   * Logos + short notes; links to integration docs.

10. **Security & Compliance**

    * Data classification, encryption in transit & rest, where logs are stored, retention policy, compliance status. *Avoid claiming certifications not verified.*

11. **Pricing & Licensing**

    * If public: tier table. If enterprise-only or custom: `Contact Sales` form.

12. **Case Studies & Testimonials**

    * Cards highlighting outcome when product used.

13. **Related Research (Library)**

    * Embed top 3 relevant Library items with snippets & links.

14. **Changelog & Roadmap**

    * Link to `/products/{slug}/changelog` or embed latest changelog.

15. **Footer CTAs**

    * `Request Trial`, `Contact Sales`, `Download datasheet`.

**APIs**

* `GET /api/products/{slug}`
* `GET /api/library?product={product-slug}&limit=3`

**Gating**

* Downloads / demos may be gated.

---

# 8. Product Docs Hub (`/products/{product-slug}/docs`) & API Reference

**Purpose:** developer docs, API references, SDKs, examples.

**Sections:**

1. **Docs hero** — quick links: `Overview`, `Quickstart`, `API Reference`, `SDKs`, `Examples`, `Support`.
2. **Table of contents** (left nav).
3. **Overview** (what product does).
4. **Quickstart Guide** (step-by-step).
5. **API Reference** — interactive endpoints, `Try It` with API key simulation (gated).
6. **SDK Downloads** — links to NPM/PyPI packages, installation instructions, examples.
7. **Examples & Tutorials** — sample integrations (webhook, SIEM).
8. **Support & SLA** — how to contact support for enterprise.

**APIs**

* Docs stored in static site or in docs repo (Docusaurus/Swagger).

---

# 9. Product Demo / Sandbox (`/products/{slug}/demo` or embedded iframe)

**Purpose:** interactive trial or demo landing page.

**Sections**

1. **Hero** — `Try product sandbox` CTA.
2. **Sandbox Access / Onboarding**

   * If public sandbox: register ephemeral account → throttled resources.
   * If gated: `Request Trial` form (collect company, email, use-case).
3. **Sample Data** & Guided walkthrough.
4. **Support** — link to docs, contact.

**Security**

* Sandbox must run in isolated container with quotas.

---

# 10. Product Compare (`/products/compare`)

**Purpose:** let visitors compare multiple products.

**Sections**

1. **Selection toolbar** (select up to 3 products).
2. **Comparison table** (features rows vs products columns).
3. **Result explanation & recommended product** (based on tags/industry).
4. **CTA** — `Request Demo` for selected product(s).

---

# 11. Library Main (`/library`)

**Purpose:** search & browse research assets.

**Sections:**

1. **Hero & Search** — wide semantic search bar with suggestions (e.g., `deepfake detection 2024`).
2. **Filters sidepanel** — type, year, author, tags, product link, access level.
3. **Results grid** — `LibraryTile` (type badge, title, authors, snippet, tags, `Open`/`Download`).
4. **Active filters** chips & clear all.
5. **Item preview panel** (on click, slide-in with abstract & `Open`/`Download`).
6. **Pagination / Infinite loading**.
7. **Gated asset CTA** — if access required, show form (gated download).

**APIs**

* `GET /api/library?q=&filters=&page=`, hybrid search (semantic + BM25).

**Accessibility**

* keyboard focus for search suggestions, skip link to results.

---

# 12. Library Item (`/library/{item-slug}`)

**Purpose:** show a research item with full metadata and viewer.

**Sections (order):**

1. **Title & Primary Metadata** — title, authors, published date, DOI, tags, product associations.
2. **Action Buttons** — `Open in viewer`, `Download` (gated if necessary), `Export citation (BibTeX/EndNote)`.
3. **Abstract** — 200–400 words.
4. **In-browser Viewer** — PDF viewer (page navigation, highlight search, copy snippet). Accessibility: keyboard controls.
5. **Related items** — top 5 by embedding similarity.
6. **Citations & DOI** — display, `Copy citation`.
7. **Share** — OG meta tags, social share.

**APIs**

* `GET /api/library/{slug}` returns metadata + viewer URL.

---

# 13. Clients & Case Studies (`/clients` & `/clients/{case-slug}`)

**Clients Index (`/clients`):**

* Trust bar with client logos, industries served, featured case studies.

**Case Study Detail (required order):**

1. **Hero** — client name, industry, problem statement.
2. **Challenge** — detailed description of the problem.
3. **Approach** — steps taken; technical architecture used.
4. **Implementation** — timeline & tools.
5. **Outcome / Measurable Results** — KPIs and numbers (before/after).
6. **Testimonial** — client quote & logo.
7. **Tech Stack** — list of tools & frameworks used.
8. **CTA** — `See similar projects` / `Request Assessment`.

**Data**

* `GET /api/cases/{case-slug}`

---

# 14. Blog / Insights (`/blog` & `/blog/{post-slug}`)

**Blog index**

* Featured post, list with filters (category, author, date), search, subscribe CTA.

**Blog post page:**

1. **Hero** — title, author, date, reading time, tags.
2. **Share bar** — social buttons, print.
3. **Content** — rich HTML/Markdown, code snippets, images (optimized).
4. **Related research** — inline links to Library.
5. **Author bio** & social links.
6. **Comments / Reactions** — optional (moderated).
7. **CTA** — `Subscribe`, `Contact Sales` for enterprise posts.

**SEO**

* Use `Article` or `NewsArticle` schema.

---

# 15. Security Advisories (`/security/advisories` or `/blog/security-advisory`)

**Purpose:** publish incident advisories, CVE-like disclosure posts.

**Sections**

1. **Advisory list** — severity filters.
2. **Advisory page**: title, CVE id (if any), affected products/versions, technical details, mitigation steps, timeline of disclosure, contact for reporters.
3. **Actionable guidance** — commands, configuration samples.
4. **Status** — `Under investigation` / `Mitigated`.

**Process**

* Publish with redaction policy for sensitive details; link to Vulnerability Disclosure form.

---

# 16. Careers (`/careers` & `/careers/{job-slug}`)

**Careers listing**

* Current openings with filters (team, location, remote). `Apply` CTA leads to application form.

**Job detail page**

1. **Hero** — job title, location, remote status.
2. **Responsibilities** — bullet list.
3. **Qualifications** — required & preferred.
4. **Benefits & culture** — perks, values.
5. **Apply form** — name, email, resume upload, cover letter. Use `POST /api/forms/careers-apply`.
6. **Equal opportunity statement**.

**Data**

* `GET /api/jobs`, `POST /api/forms/careers-apply`.

---

# 17. Contact / Forms Hub (`/contact`)

**Purpose:** central hub for all forms.

**Sections**

1. **Hero** — quick contact options (Sales, Support, Research).
2. **Forms list** — `Contact Us`, `Booking / Consultancy`, `RFP`, `Partner`, `Contributor`, `Vulnerability Disclosure`, `Product Trial`. Each with CTA opening modal or redirect to a dedicated form page.
3. **Direct contact** — emails (sales@, security@), phone numbers, office address & map.
4. **Newsletter** — small sign-up form.

**Forms**

* Each form validated server-side. Vulnerability Disclosure requires PGP or encrypted upload option.

---

# 18. Vulnerability Disclosure (`/security/vulnerability-disclosure`)

**Purpose:** secure channel for security researchers.

**Sections**

1. **Hero & Policy** — PGP public key, expected SLA (acknowledgement within 72 hours), triage process (high-level), legal safe harbor.
2. **Form** — `VulnerabilityDisclosure` JSON Schema (fields: reporter_contact, pgp_public_key, vulnerability summary, affected product, versions, POC, attachments).
3. **Upload instructions** — encrypt large files, do not include exploits in public.
4. **Response / tracking** — show submission id and expected steps.

**Security**

* Store attachments encrypted; do not display content publicly. Automatic virus scan, immediate triage alert to security team.

---

# 19. Press & Media (`/press`)

**Sections**

* Press releases list, media kit download (logo, brand guidelines — gated or require request), press contact.

---

# 20. Events & Workshops (`/events` & `/events/{event-slug}`)

**Events index**

* Upcoming workshops, webinars, conferences. Each event: date, format (online/in-person), speakers.

**Event detail**

* Agenda, registration form, materials download post-event.

---

# 21. Resources & Downloads (`/resources`)

**Purpose:** central catalog for datasheets, whitepapers (can redirect to Library filtered by `type=whitepaper`).

**Sections**

* Featured whitepapers, datasheets per product, sign-up gating for premium assets.

---

# 22. Testimonials / Social Proof (`/testimonials`) — optional page

**Sections**

* Video testimonials, quote library, filtered by industry.

---

# 23. Partners & Integrations (`/partners`)

**Sections**

* Strategic partners, technology partners, integration guides, partner program CTA.

---

# 24. Legal — Privacy (`/privacy`) & Terms (`/terms`)

**Privacy**

* Data collection, processing, retention, cookie policy, contact for data deletion. Show consent text for forms.

**Terms**

* Service terms, acceptable use, liability limitations.

**Accessibility**

* Accessibility statement & contact for accessibility issues.

---

# 25. Security Posture (`/security`)

**Purpose:** public security posture and practices page.

**Sections**

* Overview of security program, frameworks used (NIST, MITRE), brief on pen testing, incident response plan (high-level), bug bounty/disclosure details, contact & PGP key.

**Caveat:** do not publish sensitive internal details. Use language like `ISO-27001 aligned` unless certified.

---

# 26. Chatbot Full Page (`/chat`) — optional dedicated page

**Purpose:** full chat experience (long form) and transcript export.

**Sections**

* Chat widget large UI with file upload, persona switcher, conversation history, `Export transcript`, `Save to email` options.

**APIs**

* `POST /api/chat` + `POST /api/chat/upload`.

---

# 27. Authentication Pages (public)

**Paths & pages**

* `/auth/login` — login form + Google & GitHub buttons + magic-link.
* `/auth/register` — name, email, password, consent checkbox.
* `/auth/verify` — verification landing page.
* `/auth/forgot-password` & `/auth/reset-password`
* `/auth/account` — user account settings (change password, manage linked providers, MFA setup) — accessible only to logged-in users.

**Notes**

* Social sign-in integration (Google/GitHub), account linking flow implemented.

---

# 28. Sitemap & Robots (`/sitemap.xml`, `robots.txt`)

**Sitemap**

* Dynamic sitemap generated for SEO; include canonical URLs, lastmod.

**robots**

* Allow all except admin/restricted endpoints.

---

# 29. Search Results (`/search?q=`)

**Purpose:** site-wide results, combining products, services, library, blog.

**Sections**

* Search bar, tabs: All / Products / Library / Blog / Services, results grouped by type, filters.

**APIs**

* Hybrid search endpoint `/api/search?q=` combining vector results for Library and classic index for pages.

---

# 30. 404 & Maintenance Pages

**404**

* Friendly message, site search input, popular links.

**Maintenance**

* Scheduled maintenance page with minimal contact info.

---

# 31. Utility pages & endpoints (public)

* `/rss.xml` for blog feed
* `/terms`, `/privacy` (already covered)
* `/healthz` (public health check minimal info, prefer restricted but may exist)
* `/legal/contact` (DMCA / law enforcement contact)

---

# Global behaviors & cross-page features

**Navigation**

* Sticky header on scroll, mobile hamburger, breadcrumb on inner pages.

**Chatbot**

* Persistent floating widget on all pages except legal sensitive flows (or optionally disabled on `/security/vulnerability-disclosure` pages where a secure path is preferred).

**Search**

* Top-level search (header) persists; library search specialized.

**Forms**

* All forms follow JSON Schema; server validates; attachments scanned.

**Analytics / Events**

* All CTAs tracked (GA4 + server events): `cta_click`, `form_start`, `form_submit`, `product_demo_request`, `library_download`, `chat_interaction`.

**Internationalization**

* Prepare i18n keys; English primary. Consider locale detection for future.

**Accessibility**

* All pages should include `skip to content`, landmark roles, semantic headings, alt text, keyboard navigation, and visible focus states.

**Performance**

* Use SSR/SSG for marketing and product pages. Cache library search results where possible. Lazy load heavy assets like PDF viewer and hero animation.

---

# Implementation / API mapping cheat-sheet (per page)

* **Homepage**: static + fetch `/api/library?featured=true` + `/api/cases?featured=true`.
* **Services page**: static + `/api/services`.
* **Service detail**: `/api/services/{slug}`.
* **Products hub**: `/api/products` + `/api/products/categories`.
* **Product detail**: `/api/products/{slug}`, `/api/library?product={slug}&limit=3`.
* **Library**: `/api/library?q=&filters=`.
* **Library item**: `/api/library/{slug}` (return viewer URL and metadata).
* **Case study**: `/api/cases/{slug}`.
* **Blog**: `/api/posts` + `/api/posts/{slug}`.
* **Forms**: `POST /api/forms/{slug}`.
* **Auth**: NextAuth or custom `/api/auth/*` endpoints.
* **Chat**: `POST /api/chat` and `POST /api/chat/upload`.

---

# Mobile considerations (global)

* Single-column layout for content pages.
* Collapsible filter panels on Products & Library.
* Large tappable CTAs using primary color `#2b8dbe`.
* Sticky bottom bar on small screens with `Request Assessment` CTA.

---

# Copy & microcopy guidelines (global)

* Keep CTAs short: `Request Assessment`, `Request Trial`, `Get Demo`, `Download`, `Book Consultation`.
* Use plain language and avoid unverifiable claims. Use `aligned with ISO-27001` vs `ISO-27001 certified` unless certified.
* All paged content should include at least 1 H1 and H2s for sections. Use short paragraphs and bullet lists for clarity.

---

# Final verification checklist (public pages)

* [ ] Homepage — hero, two path cards, featured research, case studies, trust strip.
* [ ] About — mission + leadership + compliance notes.
* [ ] Services + service details (all listed).
* [ ] Products hub + category + product detail + docs + demo + compare.
* [ ] Library list + item viewer + search + embeddings.
* [ ] Clients & case studies (index + detail).
* [ ] Blog + posts + security advisories.
* [ ] Careers + job apply form.
* [ ] Contact & forms hub (all required forms).
* [ ] Vulnerability disclosure page (PGP + secure form).
* [ ] Auth pages (login/register/verify/reset/account).
* [ ] Partners & integrations, Press, Events, Resources.
* [ ] Legal: Privacy, Terms, Security posture.
* [ ] Search results, 404, sitemap, robots.