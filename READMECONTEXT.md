Context for Cursor (Merkarto Landing)

Goal
Build a bilingual (EN/FR) YC‑style landing page for Merkarto to capture emails for a waiting list. Structure and “feel” inspired by Cosine and BlindPay—clean sections, product vertical cards, small tasteful animations, clear CTAs.

Reference sites to study

https://cosine.sh/
 (hero clair, verticales nettes, micro-animations, preuves)

https://blindpay.com/
 (sections “use‑cases/verticals”, API trust, CTA répétés)

Emulate structure and UX patterns, do not copy text or assets. Keep Merkarto’s branding and copy.

Target users

Diaspora & investisseurs en/vers l’Afrique. Débutants à intermédiaires. Mobile‑first.

Brand & Tone

Moderne, crédible, fintech. Sobre, accessible. Accent sur clarté & confiance.

Tech stack

Next.js (App Router), TypeScript

Tailwind CSS

Framer Motion (animations discrètes)

i18n: next-intl (ou next-i18next)

Email capture: Mailchimp (API) placeholder env vars

Core sections (EN/FR)

Hero: headline + subhead + primary CTA (“Join the waiting list / Rejoindre la liste d’attente”), language toggle.

Verticals mini‑cards (3 cartes):

Public Market Access / Accès marchés publics

Private Tokenized Market / Marché privé tokenisé

AI‑Powered Portfolio / Portefeuille piloté par IA

How it works (3 étapes + petites illus)

Preview mini‑cards / carousel (mockups UI placeholders + captions EN/FR)

Trust (phrase “Built for African diaspora and local investors” + logos placeholders)

Waitlist block (email + consent)

Footer (Privacy/Terms/Contact + socials)

Copy starter (short)

EN Headline: “Merkarto — Invest in African equities seamlessly”

FR Headline: “Merkarto — Investissez facilement dans les actions africaines”

EN Subhead: “Access African public markets and private tokenized opportunities with ease.”

FR Subhead: “Accédez aux marchés publics africains et aux opportunités privées tokenisées en toute simplicité.”

Animations (Framer Motion)

Fade‑in on scroll (sections/cards), gentle hover elevate on cards, horizontal slide for preview carousel.

Accessibility & Perf

Semantic HTML, focus states, alt text, prefers‑reduced‑motion fallback, Lighthouse ≥ 90.

Email capture

Form posts to a /api/waitlist route that calls Mailchimp (key via env). Show success/error toasts.

i18n

Language toggle (EN/FR) in navbar; content from JSON messages; remember user language (cookie).

Deliverables

Deployed preview (Vercel), responsive desktop/tablet/mobile, EN/FR complete.

Repo with clean structure, CI passing, env placeholders documented.