# **App Name**: EncryptArx Website

## Core Features:

- Homepage with Clear Navigation: Provides a clear entry point with easy navigation to key areas like Services and Products.
- Product Catalog & Discovery: Enables users to easily find and compare products through search, filters, and category browsing.
- Centralized Resource Library: Offers a searchable repository of research assets, including in-browser viewing and citation export.
- Dynamic Hybrid Site-Wide Search: LLM-assisted semantic search across products, services, library, and blog to enhance content discoverability. The LLM acts as a tool to perform semantic searches and retrieve relevant information.
- Intelligent Chatbot (RAG): A chatbot leveraging Retrieval-Augmented Generation for enhanced responses, incorporating persona modes, file upload (scan + index), source citations, confidence flag, and user feedback mechanisms.
- Secure Vulnerability Disclosure: Provides a secure channel for security researchers to submit vulnerabilities, featuring PGP encryption, encrypted upload guidance, safe-harbor text, and an immutable audit trail.
- Contact & Forms Hub: A centralized hub for various forms (Contact, RFP, Consultancy booking, Partner/Collaborator, Contributor, Product Trial, Vulnerability Disclosure, Careers application, Press, Events, Custom Quote), with server-side validation, virus-scan, and consent capture.
- Auth: Implements signup/login functionality with Google & GitHub OAuth, magic-link option, optional TOTP MFA, and account settings.
- Careers: Features job listings with an integrated application form including resume upload.
- Case studies, Blog, Security posture, Legal (Privacy/Terms), Sitemap, Status/Incidents, Changelog/Roadmap: Provides essential informational content, including client success stories, company updates, legal documentation, and system status information.

## Style Guidelines:

- Primary brand color: --primary-500: #2B8DBE (main)
- Primary brand color: --primary-400: #4896BD (accent)
- Marketing / optional color: #4682B4 (Steel Blue)
- Warm accent color (use sparingly): #F4A460 (Sandy Brown)
- Secondary / surfaces (dark-first): --secondary: #000000
- Surfaces (dark-first): --surface-1: #050505 (page bg)
- Surfaces (dark-first): --surface-2: #0B0F12 (cards/panels)
- Glass / overlays: --glass-01: rgba(255,255,255,0.04)
- Grays / text: #EAF0F6 (text high), #BFC6CD (muted) etc.
- Accent tokens: success #28D38A, danger #FF6B6B, warning #FFB86B
- Headline font: Space Grotesk (or Sora/Space Grotesk)
- Body font: Inter
- Flat outlined icons in primary family.
- Visual style: dark-first, glassmorphism accents, node/graph hero visuals, subtle motion & parallax inspired by MagicUI / ReactBits / 21st.dev.
- Incorporate carefully chosen animations throughout the site, referencing the provided examples from MagicUI and ReactBits. This includes MagicCard, ShineBorder, AnimatedThemeToggler, ScrollBasedVelocity, MorphingText, SplashCursor, various Text Animations, LaserFlow, GradualBlur, Cubes, CircularGallery, FluidGlass, PixelBlast, Particles, GradientBlinds, DotGrid, Hyperspeed, Sparkles, and BackgroundPaths. Decisions on placement should consider the user experience and overall aesthetic.
- Testimonials and partners should be well shown in the home page below or wherever it suits the best and must be in a very attractive way and with animations like i mentioned before.
- Use MagicBento-style metric tiles, interactive code/terminal hero, Data Orb hero with pointer parallax, flip library tiles, staggered entrance & spring motion, subtle parallax layers on some pages.