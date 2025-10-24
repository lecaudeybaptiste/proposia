"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderApp({
  step,
  showModify,
}: {
  step?: string; // facultatif désormais
  showModify?: boolean;
}) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Détermine la progression selon la page
  useEffect(() => {
    if (!step) return;

    // Vérifie précisément le numéro d'étape
    if (step.startsWith("Étape 1")) {
      setProgress(50);
    } else if (step.startsWith("Étape 2")) {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [step]);

  return (
    <header className="relative flex flex-col gap-4 mb-10 max-w-3xl mx-auto px-2">
      {/* Ligne du haut : navigation */}
      <div className="flex justify-between items-center">
        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="text-sky-500 font-medium hover:underline cursor-pointer"
        >
          ← Retour
        </button>

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <Image
            src="/favicon-proposia.png"
            alt="Logo Proposia"
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          <span className="text-lg font-semibold text-sky-600 hidden sm:inline">
            Proposia
          </span>
        </div>

        {/* Étape ou bouton “Modifier” */}
        {showModify ? (
          <button
            onClick={() => router.push("/create")}
            className="text-gray-500 text-sm hover:underline cursor-pointer"
          >
            Modifier mon offre
          </button>
        ) : step ? (
          <div className="text-gray-400 text-sm">{step}</div>
        ) : (
          <div className="text-gray-400 text-sm">Étape</div>
        )}
      </div>

      {/* Barre de progression animée */}
      {step && (
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </header>
  );
}
