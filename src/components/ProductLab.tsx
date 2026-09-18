"use client";

import { motion } from "framer-motion";

const products = [
  {
    name: "MealMe",
    stage: "0→1 AI product · In build",
    tagline: "Turn spoken, inherited and occasion-based recipes into a structured, searchable family recipe memory.",
    problem:
      "Recipes are often shared conversationally — 'a handful', 'a little', 'cook until it looks right' — and valuable family or cultural knowledge is easily lost across generations, visits and special occasions.",
    solution:
      "A voice-first capture experience that converts conversational recipe instructions into an editable structured recipe, then saves it in a version-controlled repository that can be searched, refined and reused.",
    capabilities: [
      "Audio-to-text recipe capture with ingredient, quantity and method structuring",
      "Preserves rough measurements while converting them into a usable ingredient list",
      "Editable transcript and human confirmation before the recipe becomes authoritative",
      "Version-controlled recipe repository for inherited, cultural, holiday, ceremony and travel recipes",
      "Search, sort and retrieval designed around repeat cooking and family reuse",
      "Contextual guidance such as best time to eat and food/drink pairing suggestions",
      "LLM workflow testing for classification, extraction, confidence, fallbacks and multilingual inputs"
    ],
    lens: "Product focus: trust, capture accuracy, retrieval quality, repeat use and preserving human context rather than over-automating it."
  },
  {
    name: "HalfPurple",
    stage: "Consumer wellness product · In build",
    tagline: "A warm, practical epilepsy companion designed around everyday support, routine and confidence.",
    problem:
      "People living with epilepsy often manage medication, mood, memory, routines, resources and support across disconnected places, while existing experiences can feel overly clinical or fragmented.",
    solution:
      "A consumer wellness companion that brings daily support into one experience while keeping clear boundaries around medical advice and sensitive personal data.",
    capabilities: [
      "Medication tracking and simple daily check-ins",
      "Mood logging with timestamped entries and supportive activity pathways",
      "Mind & Memory experiences spanning meditation, visualization and cognitive activities",
      "Country/province-aware epilepsy resources and emergency-contact support",
      "Personalized onboarding based on user needs, difficulties and preferences",
      "Caregiver and support-network pathways designed as a later-stage capability",
      "AI opportunities explored with privacy, human oversight and trust as product constraints"
    ],
    lens: "Product focus: retention through useful daily routines, emotional warmth, accessibility and responsible design in a sensitive domain."
  },
  {
    name: "Bully Buddy",
    stage: "AI support concept · MVP design",
    tagline: "One-tap, age-appropriate guidance for children facing bullying — designed to support, not replace, trusted adults.",
    problem:
      "When bullying happens at school or in social settings, a child may need immediate help deciding what to do before they can reach a parent, caregiver or teacher.",
    solution:
      "A constrained AI support agent that helps a child think through the situation, choose an appropriate next action and understand when adult involvement is necessary.",
    capabilities: [
      "One-tap conversational support for bullying situations in school and social settings",
      "Actionable guidance for when to disengage, speak up, seek help or escalate to an adult",
      "Confidence-building prompts that help children practise handling difficult interactions",
      "Parental controls and deliberate usage limits to avoid encouraging additional screen time",
      "Safety-oriented escalation rules that preserve direct parent/caregiver communication",
      "iMessage integration so a child can access support without installing a separate app",
      "Designed around age-appropriate language, privacy and clear limits on AI autonomy"
    ],
    lens: "Product focus: immediate usefulness with strong safety boundaries, parental visibility and minimal-screen interaction."
  }
];

export default function ProductLab() {
  return (
    <section className="relative w-full bg-[#121212] py-24 px-4 md:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-14">
          <p className="text-sm font-semibold text-blue-400 tracking-[0.2em] uppercase mb-4">
            Independent AI Product Lab
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Building from problem discovery to working product.
          </h2>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-light">
            0→1 product work across discovery, product strategy, roadmaps, UX, AI workflow design,
            rapid prototyping and structured validation. Claude, GPT and Microsoft Copilot are used
            across ideation, solution design, workflow iteration and testing — with human judgement,
            trust and measurable user value kept at the centre.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />
              <div className="p-7 md:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400 mb-3">
                    {product.stage}
                  </p>
                  <h3 className="text-3xl font-black text-white mb-3">{product.name}</h3>
                  <p className="text-neutral-200 leading-relaxed">{product.tagline}</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold mb-2">
                      Problem
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">{product.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold mb-2">
                      Product
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">{product.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold mb-3">
                      Key capabilities
                    </h4>
                    <ul className="space-y-2.5">
                      {product.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start text-sm text-neutral-300">
                          <span className="text-blue-400 mr-3 mt-0.5">•</span>
                          <span className="leading-relaxed">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-7">
                  <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      <span className="font-semibold text-white">PM lens: </span>
                      {product.lens.replace("Product focus: ", "")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
