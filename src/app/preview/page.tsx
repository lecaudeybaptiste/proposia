"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import HeaderApp from "@/components/HeaderApp";
import OfferDisplay from "@/components/OfferDisplay";
import Button from "@/components/Button";
import { exportOfferPDF } from "@/lib/exportPDF";

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [offerText, setOfferText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Loader animé
  const loadingPhrases = useMemo(
    () => [
      "L’IA structure ton offre…",
      "Optimisation du texte…",
      "Préparation de la mise en page…",
    ],
    []
  );

  const [loadingIndex, setLoadingIndex] = useState(0);
  useEffect(() => {
    if (!isGenerating) return;
    const id = setInterval(() => {
      setLoadingIndex((i) => (i + 1) % loadingPhrases.length);
    }, 1500);
    return () => clearInterval(id);
  }, [isGenerating, loadingPhrases.length]);

  // Params
  const offerParam = searchParams.get("offer");

  // Récupère et affiche l'offre transmise via les paramètres d'URL
  useEffect(() => {
    async function hydrate() {
      setIsGenerating(true);
      setErrorMsg(null);

      if (offerParam && offerParam.trim().length > 0) {
        setOfferText(offerParam);
        setIsGenerating(false);
        return;
      }

      setIsGenerating(false);
      setErrorMsg("Aucune donnée à afficher. Reviens compléter le formulaire.");
    }

    hydrate();
  }, [offerParam]);

  // Actions
  const handleBack = () => router.push("/create");
  const handleCopy = async () => {
    await navigator.clipboard.writeText(offerText);
    alert("✅ Offre copiée dans le presse-papiers !");
  };

  const handleEdit = () => {
    const stored = sessionStorage.getItem("proposiaData");
    if (!stored) {
      alert("Aucune donnée trouvée à modifier.");
      return;
    }
    const savedData = JSON.parse(stored);
    const params = new URLSearchParams(savedData);
    router.push(`/create?${params.toString()}`);
  };

  // Rendu
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 text-gray-800 py-16 px-6">
      <HeaderApp step="Étape 2 sur 2" />

      {/* Zone centrale */}
      <section className="max-w-4xl mx-auto py-10 lg:py-16 flex flex-col items-center">
        {isGenerating ? (
          // ⏳ Loader animé
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-14 h-14 mb-6">
                <div className="absolute inset-0 border-4 border-sky-300 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-gray-700 text-lg font-medium">
                {loadingPhrases[loadingIndex]}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Quelques secondes suffisent…
              </p>
            </div>
          </motion.div>
        ) : offerText ? (
          // Offre affichée
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-3xl w-full "
          >
            <OfferDisplay offer={offerText} />
          </motion.div>
        ) : (
          // Aucune donnée / erreur
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center"
          >
            <p className="mb-6 text-gray-600">
              {errorMsg || "Aucune offre à afficher."}
            </p>
            <Button onClick={handleBack} variant="secondary">
              ← Revenir au formulaire
            </Button>
          </motion.div>
        )}

        {/* Boutons d’action */}
        {!isGenerating && offerText && (
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="transform transition hover:scale-105">
              <Button onClick={handleCopy} variant="outline">
                📋 Copier
              </Button>
            </div>
            <div className="transform transition hover:scale-105">
              <Button
                onClick={() =>
                  exportOfferPDF({
                    title: "Offre Proposia",
                    content: offerText,
                  })
                }
                variant="primary"
              >
                💾 Télécharger en PDF
              </Button>
            </div>
            <div className="transform transition hover:scale-105">
              <Button onClick={handleEdit} variant="secondary">
                ✏️ Modifier l’offre
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
