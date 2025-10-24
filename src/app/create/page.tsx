"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderApp from "@/components/HeaderApp";
import Button from "@/components/Button";

export default function CreatePage() {
  const router = useRouter();

  // États des champs
  const [activity, setActivity] = useState("");
  const [target, setTarget] = useState("");
  const [problem, setProblem] = useState("");
  const [benefits, setBenefits] = useState("");
  const [packs, setPacks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Préremplissage automatique si query params présents
  useEffect(() => {
    // On force la lecture depuis window.location.search
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);

    const queryActivity = urlParams.get("activity");
    const queryTarget = urlParams.get("target");
    const queryProblem = urlParams.get("problem");
    const queryBenefits = urlParams.get("benefits");
    const queryPacks = urlParams.get("packs");

    if (queryActivity) setActivity(queryActivity);
    if (queryTarget) setTarget(queryTarget);
    if (queryProblem) setProblem(queryProblem);
    if (queryBenefits) setBenefits(queryBenefits);
    if (queryPacks) setPacks(queryPacks);
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      activity: activity.trim(),
      target: target.trim(),
      problem: problem.trim(),
      benefits: benefits.trim(),
      packs: packs.trim(),
    };

    console.log("📤 Données envoyées à l’API:", payload);

    try {
      // On garde une copie locale avant la redirection
      sessionStorage.setItem("proposiaData", JSON.stringify(payload));

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.offer) {
        const params = new URLSearchParams({
          offer: data.offer,
        });
        router.push(`/preview?${params.toString()}`);
      } else {
        console.error("Erreur API:", data.error || data);
        alert("Erreur lors de la génération de ton offre.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Essaie à nouveau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <HeaderApp step="Étape 1 sur 2" />

      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Crée ton offre professionnelle
        </h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Réponds à ces quelques questions et laisse Proposia générer ton offre
          en quelques secondes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activité */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Ton activité principale
            </label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
              placeholder="Ex : Coach sportif, Graphiste, Développeur web..."
              required
            />
          </div>

          {/* Cible */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Ton public cible
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
              placeholder="Ex : entrepreneurs, étudiants, particuliers..."
              required
            />
          </div>

          {/* Problème */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Le problème que tu résous
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 resize-none"
              rows={3}
              placeholder="Ex : manque de visibilité, gestion du stress, alimentation déséquilibrée..."
              required
            ></textarea>
          </div>

          {/* Bénéfices */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Les bénéfices que tu apportes
            </label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 resize-none"
              rows={3}
              placeholder="Ex : plus de clients, gain de confiance, meilleur équilibre..."
              required
            ></textarea>
          </div>

          {/* Packs */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tes packs ou offres (facultatif)
            </label>
            <textarea
              value={packs}
              onChange={(e) => setPacks(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 resize-none"
              rows={3}
              placeholder="Ex : Pack Starter, Pack Premium..."
            ></textarea>
          </div>

          {/* Bouton de validation */}
          <div className="flex justify-center pt-8">
            <Button type="submit" variant={isLoading ? "secondary" : "primary"}>
              {isLoading ? "L’IA rédige ton offre..." : "⚡ Générer mon offre"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
