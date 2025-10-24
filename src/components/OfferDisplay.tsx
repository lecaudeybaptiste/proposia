"use client";

import { motion } from "framer-motion";
import { CheckCircle, Rocket, Target, Users } from "lucide-react";

interface OfferDisplayProps {
  offer: string;
}

export default function OfferDisplay({ offer }: OfferDisplayProps) {
  // Fonction robuste pour extraire les sections Markdown
  const extractSection = (keyword: string) => {
    try {
      const regex = new RegExp(
        `###[^\\n]*${keyword}[^\\n]*\\n([\\s\\S]*?)(?=\\n###|$)`,
        "i"
      );
      const match = offer.match(regex);
      if (!match || !match[1]) return null;
      return match[1].trim();
    } catch {
      return null;
    }
  };

  // Extraction du titre
  let title = "Offre personnalisée";
  try {
    const titleMatch = offer.match(/^##+\s*(.*)/m);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    } else {
      const firstLine = offer.split("\n")[0];
      if (firstLine) title = firstLine.replace(/[#*]/g, "").trim();
    }
  } catch {
    title = "Offre Proposia";
  }

  const forWho = extractSection("Pour qui");
  const problem = extractSection("probl");
  const solution = extractSection("solution");
  const benefits = extractSection("bénéf");
  const packs = extractSection("formule|pack");
  const why = extractSection("pourquoi");
  const cta = extractSection("contact|prêt|🚀");

  // Animation au scroll
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Type-safe
      },
    }),
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="space-y-10 text-gray-800"
    >
      {/* Titre principal */}
      <motion.header variants={fadeIn} custom={0} className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-600 mb-3">
          {title}
        </h1>
        {forWho && (
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto whitespace-pre-line">
            {forWho}
          </p>
        )}
      </motion.header>

      {/* Problème */}
      {problem && (
        <motion.section
          variants={fadeIn}
          custom={1}
          className="bg-red-50 border border-red-100 rounded-3xl p-6"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3 text-red-700">
            <Target className="w-5 h-5" /> Le problème
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {problem}
          </p>
        </motion.section>
      )}

      {/* Solution */}
      {solution && (
        <motion.section
          variants={fadeIn}
          custom={2}
          className="bg-green-50 border border-green-100 rounded-3xl p-6"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3 text-green-700">
            <Users className="w-5 h-5" /> La solution
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {solution}
          </p>
        </motion.section>
      )}

      {/* Bénéfices */}
      {benefits && (
        <motion.section
          variants={fadeIn}
          custom={3}
          className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-sky-600">
            <CheckCircle className="w-5 h-5" /> Les bénéfices
          </h2>
          <ul className="space-y-2 list-disc pl-6 text-gray-700">
            {benefits
              .split("\n")
              .filter((b) => b.trim().length > 0)
              .map((b, i) => (
                <li key={i}>{b.replace(/^- /, "").trim()}</li>
              ))}
          </ul>
        </motion.section>
      )}

      {/* Packs / Formules */}
      {packs && (
        <motion.section
          variants={fadeIn}
          custom={4}
          className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-indigo-700">
            <Rocket className="w-5 h-5" /> Les formules
          </h2>
          <div className="space-y-3 text-gray-800 whitespace-pre-line">
            {packs}
          </div>
        </motion.section>
      )}

      {/* Pourquoi moi */}
      {why && (
        <motion.section
          variants={fadeIn}
          custom={5}
          className="bg-yellow-50 border border-yellow-100 rounded-3xl p-6"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-yellow-700">
            💬 Pourquoi me choisir ?
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{why}</p>
        </motion.section>
      )}

      {/* Appel à l’action */}
      {cta && (
        <motion.section
          variants={fadeIn}
          custom={6}
          className="text-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-3xl p-10 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">
            🚀 Passez à l’action dès aujourd’hui
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
            {cta}
          </p>
        </motion.section>
      )}
    </motion.article>
  );
}
