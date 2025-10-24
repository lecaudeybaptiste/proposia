// ============================================
// 🧠 formatOffer.ts — Proposia
// ============================================
// Objectif : transformer le texte généré (IA)
// en un objet structuré pour affichage visuel
// ============================================

export interface FormattedOffer {
  title: string;
  problem: string;
  solution: string;
  benefits: string[];
  packs: string[];
  cta: string;
}

/**
 * Fonction de mise en forme d'une offre
 * @param rawText Texte brut renvoyé par l'IA
 * @returns Objet structuré prêt à afficher
 */
export function formatOffer(rawText: string): FormattedOffer {
  // Nettoyage du texte brut
  const text = rawText.replace(/\r?\n+/g, "\n").trim();

  // Extraction avec regex simples
  const titleMatch = text.match(/^(?:🎯|💼|🎨|🔥|⭐|🧠)?\s*(.+?)\n/);
  const problemMatch = text.match(/🚫.*?\n(.*?)\n💡/s);
  const solutionMatch = text.match(/💡.*?\n(.*?)\n🌟/s);
  const benefitsMatch = text.match(/🌟.*?\n([\s\S]*?)\n💎/s);
  const packsMatch = text.match(/💎.*?\n([\s\S]*?)\n🚀/s);
  const ctaMatch = text.match(/🚀.*?\n(.*)/s);

  // Traitement des listes à puces éventuelles
  const benefits = benefitsMatch
    ? benefitsMatch[1]
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((b) => b.replace(/^[-•✅⭐]/, "").trim())
    : [];

  const packs = packsMatch
    ? packsMatch[1]
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((p) => p.replace(/^[-•💎]/, "").trim())
    : [];

  // Construction de l’objet structuré
  return {
    title: titleMatch ? titleMatch[1].trim() : "Offre de service personnalisée",
    problem: problemMatch ? problemMatch[1].trim() : "",
    solution: solutionMatch ? solutionMatch[1].trim() : "",
    benefits,
    packs,
    cta: ctaMatch ? ctaMatch[1].trim() : "Contacte-moi dès aujourd’hui 🚀",
  };
}
