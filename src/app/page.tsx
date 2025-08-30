"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LampContainer } from "@/components/ui/lamp";

// Constants
const BRAND_COLORS = {
  primary: '#D0FF6D',
  primaryHover: '#C5F55A',
  dark: '#0B0B0B',
  textSecondary: '#B3B3B2',
  cardFill: '#919E9D',
  iconGray: '#4B5563',
  problemCardBg: '#121017',
  problemCardStroke: '#D1CDE0',
  problemCardText: '#D1CDE0',
} as const;

const SOLUTION_IMAGE_SIZE = { width: 536, height: 546 };
const SOLUTION_TEXT_WIDTH = '559px';

// Types
type Language = "en" | "fr";

type Texts = {
  heroTitle: string;
  heroSubtitle: string;
  problemsTitle: string;
  problemsSubtitle: string;
  solutionsTitle: string;
  solutionsSubtitle: string;
  subscribersText: string;
  verticals: {
    public: { title: string; body: string };
    private: { title: string; body: string };
    secondary: { title: string; body: string };
    ai: { title: string; body: string };
    wallet: { title: string; body: string };
  };
  waitlist: { 
    title: string; 
    placeholder: string; 
    button: string;
    form: {
      email: string;
      country: string;
      ageRange: string;
      investorType: string;
      ticketSize: string;
      investmentInterests: string;
      motivation: string;
      share: string;
      shareMessage: string;
      successTitle: string;
      successMessage: string;
    };
  };
  footer: { privacy: string; terms: string; contact: string };
};

const texts: Record<Language, Texts> = {
  en: {
    heroTitle: "Invest in African equities seamlessly",
    heroSubtitle:
      "Access African public markets and private tokenized opportunities with ease.",
    problemsTitle: "The barriers to African investment are real",
    problemsSubtitle: "From slow onboarding to currency erosion, the status quo creates friction instead of opportunity",
    solutionsTitle: "The new gateway to African capital markets",
    solutionsSubtitle: "Public, private, and tokenized investments—powered by AI and built for global investors",
    subscribersText: "100+ subscribers already",
    verticals: {
      public: {
        title: "Public Market Access",
        body:
          "Invest in listed African equities, stocks, and bonds across major exchanges with a single, seamless account.",
      },
      private: {
        title: "Private Market Access",
        body:
          "Gain exposure to carefully selected private African companies equities, curated in partnership with top private equity funds.",
      },
      secondary: {
        title: "Tokenized Secondary Market",
        body:
          "Buy or sell your holdings in African private companies through a regulated, tokenized secondary marketplace—bringing liquidity where none existed before.",
      },
      ai: {
        title: "AI-Powered Portfolio",
        body:
          "Track valuations, receive smart insights, and get personalized recommendations powered by advanced AI analytics.",
      },
      wallet: {
        title: "Multi-Currency & Stablecoin Protection",
        body:
          "Invest across African and global markets without worrying about currency depreciation or FX volatility. Our stablecoin-backed architecture safeguards your returns, ensuring stability and long-term value preservation.",
      },
    },

    waitlist: {
      title: "Join the Waitlist",
      placeholder: "Enter your email",
      button: "Join the Waitlist",
      form: {
        email: "Email address",
        country: "Country of residence",
        ageRange: "Age range",
        investorType: "Investor type",
        ticketSize: "Preferred monthly investment",
        investmentInterests: "Investment interests",
        motivation: "What motivates you to invest in Africa?",
        share: "Share with a friend",
        shareMessage: "I just joined the Okulus waitlist for African investments! Join me:",
        successTitle: "Welcome to Okulus!",
        successMessage: "Check your email for confirmation details."
      }
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms",
      contact: "Contact",
    },
  },
  fr: {
    heroTitle: "Investissez dans les actions africaines en toute simplicité",
    heroSubtitle:
      "Accédez aux marchés publics africains et aux opportunités privées tokenisées facilement.",
    problemsTitle: "Les obstacles à l'investissement africain sont réels",
    problemsSubtitle: "De l'inscription lente à l'érosion monétaire, le statu quo crée des frictions au lieu d'opportunités",
    solutionsTitle: "La nouvelle passerelle vers les marchés de capitaux africains",
    solutionsSubtitle: "Investissements publics, privés et tokenisés—propulsés par l'IA et conçus pour les investisseurs mondiaux",
    subscribersText: "Déjà 100+ abonnés",
    verticals: {
      public: {
        title: "Accès aux marchés publics",
        body:
          "Investissez dans des actions et obligations africaines cotées sur les principales bourses avec un compte unique et transparent.",
      },
      private: {
        title: "Accès aux marchés privés",
        body:
          "Accédez à des participations soigneusement sélectionnées dans des entreprises africaines privées, en partenariat avec des fonds de capital-investissement de premier plan.",
      },
      secondary: {
        title: "Marché secondaire tokenisé",
        body:
          "Achetez ou vendez vos participations dans des entreprises privées africaines via un marché secondaire réglementé et tokenisé, créant de la liquidité là où elle n'existait pas.",
      },
      ai: {
        title: "Portefeuille alimenté par l'IA",
        body:
          "Suivez les valorisations, recevez des analyses pertinentes et des recommandations personnalisées grâce à une intelligence artificielle avancée.",
      },
      wallet: {
        title: "Protection multi-devises et stablecoin",
        body:
          "Investissez sur les marchés africains et mondiaux sans craindre la dépréciation monétaire ou la volatilité des changes. Notre architecture basée sur les stablecoins protège vos rendements et assure une stabilité à long terme.",
      },
    },

    waitlist: {
      title: "Rejoindre la liste d'attente",
      placeholder: "Entrez votre adresse e-mail",
      button: "Rejoindre la liste d'attente",
      form: {
        email: "Adresse e-mail",
        country: "Pays de résidence",
        ageRange: "Tranche d'âge",
        investorType: "Type d'investisseur",
        ticketSize: "Investissement mensuel préféré",
        investmentInterests: "Intérêts d'investissement",
        motivation: "Qu'est-ce qui vous motive à investir en Afrique ?",
        share: "Partager avec un ami",
        shareMessage: "Je viens de rejoindre la liste d'attente d'Okulus pour les investissements africains ! Rejoignez-moi :",
        successTitle: "Bienvenue chez Okulus !",
        successMessage: "Vérifiez votre e-mail pour les détails de confirmation."
      }
    },
    footer: {
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      contact: "Contact",
    },
  },
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

// Solution configuration
const SOLUTIONS = [
  { key: "public" as const, image: "/Card public market.svg" },
  { key: "private" as const, image: "/Card Private Market.svg" },
  { key: "secondary" as const, image: "/Card Secondary Market.svg" },
  { key: "ai" as const, image: "/AI portfolio.svg" },
  { key: "wallet" as const, image: "/Multi currency stablecoin.svg" },
];

function SolutionsSection({ language, onJoinWaitlist }: { language: Language; onJoinWaitlist: () => void }) {
  const [hoveredSolution, setHoveredSolution] = useState<string | null>("public");
  const t = useMemo(() => texts[language], [language]);

  const renderSolutionImage = (solutionKey: string) => {
    const solution = SOLUTIONS.find(s => s.key === solutionKey);
    if (!solution) return null;

    return (
      <Image
        src={solution.image}
        alt={`${solutionKey} solution`}
        width={SOLUTION_IMAGE_SIZE.width}
        height={SOLUTION_IMAGE_SIZE.height}
        className="transition-opacity duration-300"
        style={{ width: `${SOLUTION_IMAGE_SIZE.width}px`, height: `${SOLUTION_IMAGE_SIZE.height}px` }}
        priority
      />
    );
  };

  return (
    <section id="solutions" className="mt-24">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-semibold">
          {t.solutionsTitle}
        </h2>
        <p className="mt-3 text-base sm:text-xl text-white/70 max-w-2xl mx-auto">
          {t.solutionsSubtitle}
        </p>
        <div className="mt-8">
          <button
            onClick={onJoinWaitlist}
            className={`inline-flex items-center justify-center rounded-full bg-[${BRAND_COLORS.primary}] px-6 py-3 text-sm font-medium text-black shadow hover:bg-[${BRAND_COLORS.primaryHover}] transition-colors cursor-pointer`}
          >
            {t.waitlist.button}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16 xl:gap-20">
        {/* Left: Solutions List */}
        <div style={{ width: SOLUTION_TEXT_WIDTH }} className="flex-shrink-0">
          {SOLUTIONS.map((solution, index) => (
            <div key={solution.key}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                className="py-8 cursor-pointer transition-colors duration-300"
                style={{
                  color: hoveredSolution === solution.key ? BRAND_COLORS.primary : BRAND_COLORS.textSecondary
                }}
                onMouseEnter={() => setHoveredSolution(solution.key)}
              >
                <h3 className="font-normal mb-4" style={{ fontSize: '25px', lineHeight: '1.2' }}>
                  {t.verticals[solution.key as keyof typeof t.verticals].title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.4' }}>
                  {t.verticals[solution.key as keyof typeof t.verticals].body}
                </p>
              </motion.div>
              {index < SOLUTIONS.length - 1 && (
                <div className={`w-full bg-[${BRAND_COLORS.textSecondary}]`} style={{ height: '0.2px' }} />
              )}
            </div>
          ))}
        </div>

        {/* Right: Image Area */}
        <div className="flex-shrink-0">
          <div className="relative">
            {hoveredSolution && renderSolutionImage(hoveredSolution)}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-6">
        {SOLUTIONS.map((solution, index) => (
          <motion.div
            key={solution.key}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
            className="rounded-2xl border border-foreground/10 bg-background/60 p-6"
          >
            <h3 className="text-xl font-semibold mb-3">
              {t.verticals[solution.key as keyof typeof t.verticals].title}
            </h3>
            <p className="text-foreground/70 mb-4">
              {t.verticals[solution.key as keyof typeof t.verticals].body}
            </p>
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={solution.image}
                alt={`${solution.key} visual`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const t = useMemo(() => texts[language], [language]);
  const docsHref = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://www.notion.so";
  
  return (
    <div className="relative flex min-h-screen flex-col text-foreground">
      <header className="fixed top-0 left-0 right-0 z-10 w-full bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logo okulus long white.svg" alt="Okulus logo" width={120} height={20}/>
          </div>
          
          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="#problems" className="text-sm text-white hover:text-white/90 transition-colors">
              Problem
            </a>
            <a href="#solutions" className="text-sm text-white hover:text-white/90 transition-colors">
              Solutions
            </a>
            <a
              href={docsHref}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white hover:text-white/90 transition-colors"
            >
              Docs
            </a>
          </nav>
          
          {/* Desktop Language + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
            <button
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === "en" ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80"
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === "fr" ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80"
              }`}
              onClick={() => setLanguage("fr")}
            >
              FR
              </button>
            </div>
            <button
              onClick={() => setShowWaitlistModal(true)}
              className={`inline-flex items-center justify-center rounded-full bg-[${BRAND_COLORS.primary}] px-4 py-2 text-sm font-medium text-black hover:bg-[${BRAND_COLORS.primaryHover}] transition-colors cursor-pointer`}
            >
              {t.waitlist.button}
            </button>
          </div>
          
          {/* Mobile CTA only */}
          <div className="md:hidden">
            <button
              onClick={() => setShowWaitlistModal(true)}
              className={`inline-flex items-center justify-center rounded-full bg-[${BRAND_COLORS.primary}] px-4 py-2 text-sm font-medium text-black hover:bg-[${BRAND_COLORS.primaryHover}] transition-colors cursor-pointer`}
            >
              {t.waitlist.button}
            </button>
          </div>
        </div>
      </header>

        {/* Hero */}
      <section className="relative">
        <LampContainer className={`min-h-[600 px] bg-[${BRAND_COLORS.dark}]`}>
          <div className="relative z-50 flex flex-col items-center text-center px-8">
            <h1 className="text-4xl sm:text-4xl md:text-7xl font-semibold tracking-tight text-white">
                {t.heroTitle}
              </h1>
            <p className="mt-3 text-base sm:text-xl text-white/70 max-w-2xl mx-auto">
                {t.heroSubtitle}
              </p>
            <div className="mt-9">
              <button
                onClick={() => setShowWaitlistModal(true)}
                className={`inline-flex items-center justify-center rounded-full bg-[${BRAND_COLORS.primary}] px-6 py-3 text-sm font-medium text-black shadow hover:bg-[${BRAND_COLORS.primaryHover}] transition-colors cursor-pointer`}
                >
                  {t.waitlist.button}
              </button>
              </div>
            <div className="mt-8 flex items-center justify-center">
              <span className="text-sm text-white/70">
                {t.subscribersText}
                </span>
            </div>
          </div>
        </LampContainer>
        </section>

      <main className="mt-16 mx-auto max-w-6xl px-10">
        {/* Problems */}
        <section id="problems" className="mt-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-semibold">{t.problemsTitle}</h2>
            <p className="mt-3 text-base sm:text-xl text-white/70 max-w-2xl mx-auto">{t.problemsSubtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
              custom={0}
              className="group rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-2"
              style={{ 
                backgroundColor: BRAND_COLORS.problemCardBg,
                borderColor: BRAND_COLORS.problemCardStroke,
                boxShadow: `0 4px 20px ${BRAND_COLORS.problemCardStroke}40`
              }}
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/10">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: BRAND_COLORS.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                    </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_COLORS.problemCardText }}>Limited Access to African Investments</h3>
              <p className="text-sm leading-relaxed" style={{ color: BRAND_COLORS.problemCardText }}>
                Investors struggle with fragmented, outdated systems. Opening accounts across African exchanges is slow and complex, blocking diaspora and locals from seamless access.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              custom={1}
              className="group rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-2"
              style={{ 
                backgroundColor: BRAND_COLORS.problemCardBg,
                borderColor: BRAND_COLORS.problemCardStroke,
                boxShadow: `0 4px 20px ${BRAND_COLORS.problemCardStroke}40`
              }}
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/10">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: BRAND_COLORS.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                    </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_COLORS.problemCardText }}>Illiquid Private Markets</h3>
              <p className="text-sm leading-relaxed" style={{ color: BRAND_COLORS.problemCardText }}>
                Once invested in African SMEs, capital is locked for years with no clear exit. Investors lack flexibility to rebalance or capture gains when needed.
                    </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
              custom={2}
              className="group rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-2"
              style={{ 
                backgroundColor: BRAND_COLORS.problemCardBg,
                borderColor: BRAND_COLORS.problemCardStroke,
                boxShadow: `0 4px 20px ${BRAND_COLORS.problemCardStroke}40`
              }}
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/10">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: BRAND_COLORS.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_COLORS.problemCardText }}>Currency & Value Erosion</h3>
              <p className="text-sm leading-relaxed" style={{ color: BRAND_COLORS.problemCardText }}>
                Local devaluation and FX volatility often erode returns, making even high-performing investments lose their value in global terms.
              </p>
              </motion.div>
          </div>
        </section>

        {/* Solutions */}
        <SolutionsSection language={language} onJoinWaitlist={() => setShowWaitlistModal(true)} />

      </main>

      {/* Spacer between main content and footer */}
      <div className="h-[50px]"></div>

      <footer className="py-10" style={{ backgroundColor: BRAND_COLORS.primary }}>
        <div className="mx-auto max-w-6xl px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-black">© {new Date().getFullYear()} Okulus</span>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm">
              <a className="text-black hover:text-black/80 transition-colors" href="/privacy">
                {t.footer.privacy}
              </a>
              <a className="text-black hover:text-black/80 transition-colors" href="/terms">
                {t.footer.terms}
              </a>
              <a className="text-black hover:text-black/80 transition-colors" href="mailto:hello@okulus.com">
                {t.footer.contact}
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <a
                aria-label="X"
                href="https://x.com/okulus"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 grid place-items-center rounded-full border border-black/20 text-xs text-black hover:bg-black/10 transition-colors"
              >
                X
              </a>
              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/company/okulus"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 grid place-items-center rounded-full border border-black/20 text-xs font-semibold text-black hover:bg-black/10 transition-colors"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal 
          language={language} 
          onClose={() => setShowWaitlistModal(false)} 
        />
      )}
    </div>
  );
}

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

function WaitlistModal({ language, onClose }: { language: Language; onClose: () => void }) {
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    ageRange: '',
    investorType: '',
    ticketSize: '',
    investmentInterests: [] as string[],
    motivation: [] as string[],
    referredBy: ''
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [position, setPosition] = useState<number | null>(null);
  const t = useMemo(() => texts[language], [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Request failed");
      
      setStatus("success");
      setPosition(data.position);
    } catch {
      setStatus("error");
    }
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      investmentInterests: checked 
        ? [...prev.investmentInterests, interest]
        : prev.investmentInterests.filter(i => i !== interest)
    }));
  };

  const handleMotivationChange = (motivation: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      motivation: checked 
        ? [...prev.motivation, motivation]
        : prev.motivation.filter(m => m !== motivation)
    }));
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?ref=${encodeURIComponent(formData.email)}` : '';
  
  const handleShare = (platform: string) => {
    const message = t.waitlist.form.shareMessage + " " + shareUrl;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Join me on Okulus&body=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        break;
    }
  };

  if (status === "success") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.waitlist.form.successTitle}</h3>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? `Vous êtes le numéro ${position} sur la liste d'attente !`
                : `You are number ${position} on the waitlist!`
              }
            </p>
            <p className="text-sm text-gray-500 mb-6">{t.waitlist.form.successMessage}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">{t.waitlist.form.share}</h4>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare('email')}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {language === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t.waitlist.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.email} *
            </label>
      <input
        type="email"
        required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.country} *
            </label>
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
            >
              <option value="" className="text-gray-500">Select your country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country} className="text-black">
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.ageRange} *
            </label>
            <select
              required
              value={formData.ageRange}
              onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
            >
              <option value="" className="text-gray-500">Select age range</option>
              <option value="18-24" className="text-black">18–24</option>
              <option value="25-34" className="text-black">25–34</option>
              <option value="35-44" className="text-black">35–44</option>
              <option value="45-54" className="text-black">45–54</option>
              <option value="55+" className="text-black">55+</option>
            </select>
          </div>

          {/* Investor Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.investorType} *
            </label>
            <select
              required
              value={formData.investorType}
              onChange={(e) => setFormData(prev => ({ ...prev, investorType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
            >
              <option value="" className="text-gray-500">Select investor type</option>
              <option value="Individual" className="text-black">Individual</option>
              <option value="Diaspora" className="text-black">Diaspora</option>
              <option value="Angel" className="text-black">Angel</option>
              <option value="Family office" className="text-black">Family office</option>
              <option value="Institutional" className="text-black">Institutional</option>
            </select>
          </div>

          {/* Ticket Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.ticketSize} *
            </label>
            <select
              required
              value={formData.ticketSize}
              onChange={(e) => setFormData(prev => ({ ...prev, ticketSize: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
            >
              <option value="" className="text-gray-500">Select investment size</option>
              <option value="<50" className="text-black">&lt;50 €/month</option>
              <option value="50-500" className="text-black">50–500 €/month</option>
              <option value="500-5k" className="text-black">500–5k €/month</option>
              <option value="5k+" className="text-black">5k+ €/month</option>
            </select>
          </div>

          {/* Investment Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.investmentInterests}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Startups', 'Real Estate', 'Agriculture', 'African stock exchanges', 'Private Equity', 'Stablecoin-backed assets'].map((interest) => (
                <label key={interest} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.investmentInterests.includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.waitlist.form.motivation}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {['Diversify portfolio', 'Support African growth', 'Earn high returns', 'Connect with diaspora', 'Impact investing'].map((motiv) => (
                <label key={motiv} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.motivation.includes(motiv)}
                    onChange={(e) => handleMotivationChange(motiv, e.target.checked)}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{motiv}</span>
                </label>
              ))}
            </div>
          </div>

      <button
        type="submit"
        disabled={status === "loading"}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              status === "loading" 
                ? "bg-gray-400 cursor-not-allowed text-white" 
                : `bg-[${BRAND_COLORS.primary}] hover:bg-[${BRAND_COLORS.primaryHover}] text-black cursor-pointer`
            }`}
          >
            {status === "loading" ? (language === 'fr' ? 'Envoi...' : 'Submitting...') : t.waitlist.button}
      </button>

      {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              {language === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.'}
            </p>
      )}
    </form>
      </div>
    </div>
  );
}

