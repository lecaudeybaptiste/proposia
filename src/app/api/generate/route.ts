import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { activity, target, problem, benefits, packs } = body;

    if (!activity || !target || !problem || !benefits) {
      return NextResponse.json(
        { error: "Champs manquants dans la requête." },
        { status: 400 }
      );
    }

    // Convertit la liste des bénéfices en format lisible
    const benefitList = benefits
      .split(",")
      .map((b: string) => b.trim())
      .filter((b: string) => b.length > 0)
      .map((b: string) => `- ${b.charAt(0).toUpperCase() + b.slice(1)}`)
      .join("\n");

    // Convertit la liste des packs ou fournit une valeur par défaut
    const packList = packs
      ? packs
          .split("+")
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 0)
          .map(
            (p: string) =>
              `- **${p}** : détails personnalisables selon le projet`
          )
          .join("\n")
      : "- **Essentiel** : l’essentiel pour bien démarrer\n- **Premium** : accompagnement complet et sur mesure";

    // Texte final simulé (style professionnel)
    const offerText = `
## 💼 ${activity} — une présence en ligne qui inspire confiance

### 🎯 Pour qui ?
Pour les **${target}** qui souhaitent renforcer leur **crédibilité**, **gagner du temps** et **attirer plus de clients** grâce à un site professionnel et sur mesure.

---

### ❌ Le problème
Aujourd’hui, de nombreux ${target.toLowerCase()} peinent à se faire connaître. ${problem}.  
Résultat : ils passent à côté de belles opportunités et donnent une image en dessous de leur vrai niveau de compétence.

---

### ✅ La solution
Je crée pour vous un **site vitrine professionnel**, moderne et efficace, qui valorise votre activité et traduit votre personnalité.  
Mon objectif : transformer vos visiteurs en clients grâce à un design clair, des textes percutants et une structure pensée pour convertir.

---

### 💎 Les bénéfices concrets
${benefitList}
- Image professionnelle cohérente
- Site optimisé pour Google
- Accompagnement humain et réactif

---

### ⚙️ Les formules disponibles
${packList}

---

### 🚀 Pourquoi me choisir ?
- Spécialisé dans la création de sites pour ${target.toLowerCase()}  
- Accompagnement simple, humain et sans jargon  
- Livraison rapide, design moderne et mobile-friendly  
- Support après la mise en ligne  

---

### 📩 Prêt à lancer votre activité sur le web ?
Offrez-vous un site à votre image, qui inspire confiance et attire vos clients idéaux.  
👉 **Contactez-moi dès aujourd’hui** pour transformer votre activité en vitrine professionnelle.
`;

    return NextResponse.json({ offer: offerText });
  } catch (error) {
    console.error("Erreur API mock:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
