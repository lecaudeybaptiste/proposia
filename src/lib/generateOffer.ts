// ============================================
// 🤖 FONCTION DE GÉNÉRATION D'OFFRE ADAPTÉE À L'AVATAR CLIENT
// ============================================
// Objectif : simuler une IA qui rédige une offre claire et professionnelle
// et qui adapte le ton, les bénéfices et les arguments selon la cible
// ============================================

type OfferInputs = {
  activity: string;
  target: string;
  problem: string;
  benefits: string;
  packs: string;
};

// Modèles d’écriture selon l’avatar client
const avatarStyles: Record<
  string,
  { tone: string; focus: string; example: string }
> = {
  coach: {
    tone: "énergique, motivant et orienté résultats",
    focus: "la transformation personnelle, la discipline et la confiance",
    example:
      "Imaginez vos clients plus confiants, plus performants et alignés avec leurs objectifs grâce à votre accompagnement.",
  },
  thérapeute: {
    tone: "empathique, rassurant et humain",
    focus: "le bien-être, la sérénité et la relation de confiance",
    example:
      "Vos clients se sentent enfin écoutés, compris et accompagnés dans un espace bienveillant et apaisant.",
  },
  designer: {
    tone: "créatif, moderne et professionnel",
    focus: "l’image de marque, l’esthétique et la différenciation",
    example:
      "Chaque visuel devient une expérience qui attire, inspire et fait rayonner votre univers.",
  },
  consultant: {
    tone: "structuré, stratégique et orienté performance",
    focus: "la clarté, la rentabilité et la croissance mesurable",
    example:
      "Vous aidez vos clients à prendre des décisions alignées et rentables grâce à votre expertise.",
  },
  parDefaut: {
    tone: "professionnel et clair",
    focus: "la valeur ajoutée et les bénéfices concrets",
    example:
      "Vous aidez vos clients à atteindre leurs objectifs plus rapidement grâce à une méthode claire et efficace.",
  },
};

export function generateOffer({
  activity,
  target,
  problem,
  benefits,
  packs,
}: OfferInputs) {
  // Détecte l’avatar à partir du texte fourni
  const avatarKey = (() => {
    const t = target.toLowerCase();
    if (t.includes("coach")) return "coach";
    if (t.includes("thérapeute") || t.includes("hypno") || t.includes("psych"))
      return "thérapeute";
    if (t.includes("design") || t.includes("graph")) return "designer";
    if (
      t.includes("consult") ||
      t.includes("business") ||
      t.includes("freelance")
    )
      return "consultant";
    return "parDefaut";
  })();

  const avatar = avatarStyles[avatarKey];

  // Construction du texte final
  return `
# 💼 Offre ${activity ? "pour " + activity : "professionnelle"}

**Public cible :**
${target || "Ton client idéal"}

---

## 🧩 Le problème à résoudre

${
  problem ||
  "Votre audience rencontre un blocage récurrent dans son quotidien ou son activité, et cela l’empêche d’atteindre ses objectifs."
}

---

## 🚀 Ma solution personnalisée

En tant que ${activity || "professionnel"}, j’accompagne ${
    target || "mes clients"
  } à surmonter leurs difficultés à travers une approche ${avatar.tone}.  
Mon travail se concentre sur ${avatar.focus}.  

${avatar.example}

---

## 🎯 Les bénéfices concrets

${
  benefits ||
  "- Gagner du temps\n- Améliorer ses résultats\n- Reprendre confiance"
}

---

## 💎 Mes offres disponibles

${
  packs ||
  "Je propose plusieurs formules adaptées à vos besoins : Pack Découverte, Pack Avancé et Pack Sur-Mesure."
}

---

## 🤝 Pourquoi choisir mon accompagnement ?

- Une approche ${avatar.tone}
- Un suivi personnalisé et humain
- Des résultats concrets et mesurables
- Une communication claire et transparente

---

## 🚀 Passez à l’action

Contactez-moi dès aujourd’hui pour transformer votre activité et obtenir des résultats durables.  
  `;
}
