"use client";

import { motion } from "framer-motion";

const products = [
  {
    id: "half-purple",
    name: "HalfPurple",
    eyebrow: "Consumer wellness · In build",
    headline: "Everyday epilepsy support, designed to feel human.",
    summary:
      "A warm companion for medication routines, mood check-ins, memory support and trusted resources — with clear boundaries around medical advice.",
    tags: ["0→1 product", "Wellness", "Trust & safety"],
    accent: "#7C6FE8",
    tint: "#F0ECFF",
    visual: "halfPurple",
  },
  {
    id: "mealme",
    name: "MealMe",
    eyebrow: "Voice AI · In build",
    headline: "Turn spoken recipes into something families can keep.",
    summary:
      "A voice-first product that captures conversational recipes, structures ingredients and methods, and preserves the context behind family food.",
    tags: ["Voice AI", "LLM workflow", "Human-in-loop"],
    accent: "#D46B4C",
    tint: "#FFF0EA",
    visual: "mealMe",
  },
  {
    id: "bully-buddy",
    name: "Bully Buddy",
    eyebrow: "AI support concept · MVP design",
    headline: "Fast, age-appropriate guidance when a child needs help.",
    summary:
      "A constrained AI support experience for bullying situations — designed to guide the next safe action while keeping parents and trusted adults central.",
    tags: ["AI agent", "Child safety", "Responsible AI"],
    accent: "#278A72",
    tint: "#E9F8F2",
    visual: "bullyBuddy",
  },
];

const services = [
  {
    number: "01",
    title: "Product Discovery",
    copy: "User research, problem framing, user bucketing, journeys and opportunity identification.",
  },
  {
    number: "02",
    title: "Roadmaps & Prioritization",
    copy: "Turning scattered ideas into a sequenced roadmap tied to user and business value.",
  },
  {
    number: "03",
    title: "Workflow Automation",
    copy: "As-Is → To-Be process design, automation opportunities, requirements and implementation-ready flows.",
  },
  {
    number: "04",
    title: "AI Adoption & Training",
    copy: "Use-case discovery, pilots, governance, workshops, prompt guidance and adoption planning.",
  },
  {
    number: "05",
    title: "0→1 MVP Building",
    copy: "From idea to scope, prototype, validation and a working MVP with fast learning loops.",
  },
];

const experience = [
  ["2023–2025", "Langara College", "Senior Product Manager · People Systems, Workday HCM & AI"],
  ["2022–2023", "TELUS Digital", "Senior Product Manager · Digital Transformation & Adoption"],
  ["2021–2022", "Tata Consultancy Services", "Product Manager · Enterprise Platforms & Transformation"],
  ["Earlier", "Aon Hewitt + TCS", "HRIS, benefits, data, QA and enterprise transformation"],
];

function ProductVisual({ type }: { type: string }) {
  if (type === "halfPurple") {
    return (
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[28px] border border-black/10 bg-[#F7F4FF] p-5">
        <div className="absolute -right-14 -top-10 h-44 w-44 rounded-full bg-[#DCD4FF]" />
        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#E8E2FF]" />
        <div className="relative mx-auto mt-2 w-[78%] max-w-[270px] rounded-[34px] border-[8px] border-[#2A2638] bg-white p-4 shadow-2xl">
          <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#D8D4E5]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C6FE8]">Daily check-in</p>
          <h4 className="mt-2 text-xl font-semibold text-[#282434]">How are you feeling?</h4>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {["Low", "Neutral", "Happy", "Great"].map((mood, index) => (
              <div
                key={mood}
                className={`rounded-xl px-1 py-3 text-center text-[10px] font-semibold ${index === 2 ? "bg-[#7C6FE8] text-white" : "bg-[#F1EEF8] text-[#5B5666]"}`}
              >
                {mood}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-[#F7F5FB] p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#282434]">Medication</span>
              <span className="rounded-full bg-[#E6F7EE] px-2 py-1 text-[#278A72]">On track</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#E7E1F3]">
              <div className="h-2 w-[72%] rounded-full bg-[#7C6FE8]" />
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-[#E7E1F3] p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#8B8498]">Mind & Memory</p>
            <p className="mt-1 text-sm font-medium text-[#282434]">2-minute reset for today</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "mealMe") {
    return (
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[28px] border border-black/10 bg-[#FFF6F0] p-5">
        <div className="absolute right-8 top-7 h-24 w-24 rounded-full bg-[#FFDCCF]" />
        <div className="relative mt-8 rounded-[26px] bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D46B4C]">Voice capture</p>
              <h4 className="mt-1 text-xl font-semibold text-[#2B2624]">Mum's masala chai</h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D46B4C] text-white">●</div>
          </div>
          <div className="mt-5 flex h-12 items-center gap-1">
            {[14, 26, 18, 36, 24, 42, 28, 20, 38, 24, 15, 32, 20, 40, 24, 16].map((h, i) => (
              <span key={i} className="w-1.5 rounded-full bg-[#E6977D]" style={{ height: h }} />
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-[#6C625D]">
            “Add water, tea leaves, cardamom, then milk…”
          </p>
        </div>
        <div className="relative ml-auto mt-4 w-[88%] rounded-[26px] border border-[#F2D7CD] bg-[#FFFDFC] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A776A]">Structured recipe</span>
            <span className="rounded-full bg-[#F6E6DE] px-2 py-1 text-[10px] font-semibold text-[#B75A3F]">Review</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#544B47]">
            <div className="rounded-xl bg-[#FFF4EE] p-3">Water · 1 cup</div>
            <div className="rounded-xl bg-[#FFF4EE] p-3">Milk · ½ cup</div>
            <div className="rounded-xl bg-[#FFF4EE] p-3">Tea · 1 tsp</div>
            <div className="rounded-xl bg-[#FFF4EE] p-3">Cardamom · 2</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[330px] overflow-hidden rounded-[28px] border border-black/10 bg-[#EFFAF6] p-5">
      <div className="absolute -left-10 top-7 h-32 w-32 rounded-full bg-[#CFEFE4]" />
      <div className="relative mx-auto mt-5 w-[86%] rounded-[28px] bg-white p-5 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#278A72]">Bully Buddy</p>
        <div className="mt-4 space-y-3">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#EAF7F2] p-3 text-sm text-[#38544C]">
            They keep hiding my bag at lunch.
          </div>
          <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#F4F4F1] p-3 text-sm leading-5 text-[#41413E]">
            Are you safe right now? If yes, stay near people you trust and tell an adult what has been happening.
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-[#BFE4D6] bg-[#F5FCF9] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#278A72]">Next safe step</p>
          <p className="mt-1 text-sm font-semibold text-[#24483E]">Tell a trusted adult today</p>
          <p className="mt-1 text-xs leading-5 text-[#5E756E]">Parent · Teacher · School counsellor</p>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-[#E5F5EF] px-3 py-2 text-[10px] font-semibold text-[#278A72]">I need words to say</span>
          <span className="rounded-full bg-[#F3F3F0] px-3 py-2 text-[10px] font-semibold text-[#66645E]">I'm safe now</span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioV2() {
  return (
    <main className="min-h-screen bg-[#F5F2EA] text-[#1F1F1C]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F5F2EA]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="text-lg font-bold tracking-tight">SK.</a>
          <nav className="hidden items-center gap-7 text-sm text-[#5A5954] md:flex">
            <a className="transition hover:text-black" href="#work">Work</a>
            <a className="transition hover:text-black" href="#services">Services</a>
            <a className="transition hover:text-black" href="#thinking">How I think</a>
            <a className="transition hover:text-black" href="#experience">Experience</a>
          </nav>
          <a
            href="mailto:shikhakhandelwalm@gmail.com"
            className="rounded-full bg-[#1F1F1C] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Let's talk
          </a>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-7xl px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6C655A]"
            >
              Senior Product Leader · Builder · Human-centred AI
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-8xl"
            >
              I build products that make complicated things feel usable.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-[#5F5B54] md:text-xl"
            >
              I have led enterprise products inside large organizations and I build independently from zero —
              using research, user bucketing, workflow design and AI to solve real problems.
            </motion.p>
            <div className="mt-9 flex flex-wrap gap-3">
              {["Enterprise product leadership", "0→1 AI products", "Research & user bucketing", "Workflow transformation"].map((item) => (
                <span key={item} className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-[#4B4842]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-black/10 bg-[#1F1F1C] p-8 text-white md:p-10">
            <p className="text-sm uppercase tracking-[0.18em] text-white/55">A little more than a job title</p>
            <p className="mt-5 text-3xl font-medium leading-tight tracking-[-0.03em]">
              Building products at work. Building products independently. Raising future leaders at home.
            </p>
            <div className="mt-8 border-t border-white/15 pt-6 text-sm leading-6 text-white/65">
              I care about useful products, clear thinking, responsible AI and experiences that protect human confidence — especially in sensitive moments.
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="border-y border-black/5 bg-[#FBFAF6] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6C655A]">Selected work</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Products I am actively shaping.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#6D6962]">
              These are living products. Screens shown here are portfolio mockups; launch links will be added as products go live.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid overflow-hidden rounded-[36px] border border-black/10 bg-white lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ background: product.accent }} />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6760]">{product.eyebrow}</p>
                    </div>
                    <h3 className="mt-7 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{product.name}</h3>
                    <p className="mt-4 max-w-lg text-2xl font-medium leading-tight tracking-[-0.02em]">{product.headline}</p>
                    <p className="mt-6 max-w-xl text-base leading-7 text-[#666159]">{product.summary}</p>
                  </div>
                  <div className="mt-10">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-[#5E5A53]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-6 text-sm font-semibold">Case study in progress →</p>
                  </div>
                </div>
                <div className="p-4 md:p-6" style={{ background: product.tint }}>
                  <ProductVisual type={product.visual} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6C655A]">Services</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">What I can help you build.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#68645D]">
              For founders, product leaders and teams that need clarity between a problem, a roadmap and something people can actually use.
            </p>
          </div>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {services.map((service) => (
              <div key={service.number} className="grid gap-3 py-6 sm:grid-cols-[60px_220px_1fr] sm:items-start">
                <span className="text-xs font-semibold text-[#99938A]">{service.number}</span>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm leading-6 text-[#68645D]">{service.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1F1F1C] py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Enterprise impact</p>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[30px] bg-white/10 lg:grid-cols-4">
            {[
              ["40%", "less manual effort", "Langara"],
              ["30%", "higher engagement", "Langara"],
              ["7M", "users served", "TELUS"],
              ["12% → 45%", "product adoption", "TELUS"],
            ].map(([metric, label, org]) => (
              <div key={metric} className="bg-[#1F1F1C] p-6 md:p-8">
                <div className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{metric}</div>
                <div className="mt-3 text-sm text-white/65">{label}</div>
                <div className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">{org}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Case-study direction</p>
              <h3 className="mt-3 text-2xl font-medium">Redesigning P&C workflows around Workday</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">As-Is mapping → gap analysis → To-Be workflow → automation → UAT → adoption.</p>
            </div>
            <div className="rounded-[26px] border border-white/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Case-study direction</p>
              <h3 className="mt-3 text-2xl font-medium">Taking Copilot from pilot to practical adoption</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">Use-case intake → readiness → pilot cohort → training → feedback → broader enablement.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="thinking" className="bg-[#FBFAF6] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6C655A]">How I think</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Show the thinking, not just the outcome.
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#278A72]">Artifact 01</p>
                  <h3 className="mt-2 text-2xl font-semibold">User bucketing</h3>
                </div>
                <span className="rounded-full bg-[#E9F8F2] px-3 py-1.5 text-xs font-semibold text-[#278A72]">Bully Buddy</span>
              </div>
              <div className="mt-7 overflow-hidden rounded-2xl border border-black/10">
                <div className="grid grid-cols-[0.8fr_1.2fr_1.3fr] bg-[#F2F0EA] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777269]">
                  <span>User</span><span>Need / friction</span><span>Product response</span>
                </div>
                {[
                  ["Child", "Immediate help, fear", "Simple next step + escalation"],
                  ["Parent", "Visibility, trust", "Controls + adult communication"],
                  ["School", "Safety, privacy", "Clear boundaries + handoff"],
                ].map((row) => (
                  <div key={row[0]} className="grid grid-cols-[0.8fr_1.2fr_1.3fr] border-t border-black/10 px-4 py-4 text-xs leading-5">
                    <span className="font-semibold">{row[0]}</span>
                    <span className="text-[#67635C]">{row[1]}</span>
                    <span className="text-[#67635C]">{row[2]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-[#6B665F]">
                I use segmentation to make trade-offs visible: different users can need very different forms of safety, control and value from the same product.
              </p>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6FE8]">Artifact 02</p>
                  <h3 className="mt-2 text-2xl font-semibold">As-Is → To-Be</h3>
                </div>
                <span className="rounded-full bg-[#F0ECFF] px-3 py-1.5 text-xs font-semibold text-[#6557C8]">Workflow transformation</span>
              </div>
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#989188]">As-Is</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {["Request", "Email", "HR follow-up", "Manager approval", "IT", "Manual status"].map((step, i, arr) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded-lg bg-[#F2F0EA] px-3 py-2 text-xs">{step}</span>
                        {i < arr.length - 1 && <span className="text-[#B7B0A7]">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-black/10" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7C6FE8]">To-Be</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {["Intake", "Workflow rules", "Approvals", "System update", "Notify", "Track"].map((step, i, arr) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded-lg bg-[#F0ECFF] px-3 py-2 text-xs font-medium text-[#5145A9]">{step}</span>
                        {i < arr.length - 1 && <span className="text-[#A69BDD]">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-7 text-sm leading-6 text-[#6B665F]">
                The tool is rarely the starting point. I first make the current state visible, then decide what should be simplified, automated or deliberately kept human.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6C655A]">Experience</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Built inside companies. Built outside them too.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#68645D]">
              15+ years across enterprise technology, digital transformation, People Systems, product adoption and now independent AI product building.
            </p>
          </div>
          <div className="border-t border-black/10">
            {experience.map(([date, org, role]) => (
              <div key={org} className="grid gap-2 border-b border-black/10 py-6 sm:grid-cols-[110px_180px_1fr]">
                <span className="text-xs font-semibold text-[#99938A]">{date}</span>
                <span className="font-semibold">{org}</span>
                <span className="text-sm leading-6 text-[#68645D]">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-[#EDE9DE] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6C655A]">What I care about</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Products should increase confidence, not complexity.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-[#625E56]">
            <p>
              I am particularly drawn to products that improve mental wellbeing, confidence and everyday quality of life.
            </p>
            <p>
              I believe AI should support human judgement rather than replace it — especially when products serve children, families or people navigating sensitive situations.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#F5F2EA] py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="rounded-[36px] bg-[#1F1F1C] p-8 text-white md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Open to the right problem</p>
            <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                If you are building something useful, I would love to hear about it.
              </h2>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a href="mailto:shikhakhandelwalm@gmail.com" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1F1F1C]">
                  Email me
                </a>
                <a
                  href="https://linkedin.com/in/shikhakhandelwal"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-2 text-xs text-[#8B867E] sm:flex-row">
            <span>Shikha Khandelwal · Senior Product Leader & Builder</span>
            <span>Vancouver, Canada</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
