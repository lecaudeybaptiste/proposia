"use client";

import HeaderMain from "@/components/HeaderMain";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <HeaderMain />

      {/* Section Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-8 md:px-16 py-24">
        {/* Texte d'accroche */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Crée ton offre pro en{" "}
            <span className="text-sky-500">5 minutes</span>.<br />
            Sans galérer sur le texte ni le design.
          </h1>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Proposia t’aide à formuler, structurer et présenter ton offre
            professionnelle grâce à l’intelligence artificielle. Simple, rapide,
            efficace.
          </p>

          {/* Bouton principal */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(56, 189, 248, 0.3)",
              backgroundColor: "#0284c7",
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/create")}
            className="px-8 py-4 bg-sky-600 text-white font-semibold rounded-full shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            🚀 Je crée mon offre maintenant
          </motion.button>

          <p className="text-gray-400 text-sm mt-4">
            Déjà +200 freelances ont clarifié leur offre avec Proposia.
          </p>
        </div>

        {/* Exemple d'offre générée */}
        <div className="hidden md:flex justify-center">
          <article className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md space-y-5">
            <h3 className="text-lg font-bold text-sky-700">
              💼 Création de sites vitrines pour indépendants
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Pour les <strong>coachs et thérapeutes débutants</strong> qui
              veulent renforcer leur crédibilité, gagner du temps et attirer
              plus de clients grâce à un site pro et sur mesure.
            </p>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                ❌ Le problème
              </h4>
              <p className="text-gray-600 text-sm">
                Beaucoup peinent à se faire connaître et à dégager une image
                pro. Résultat : peu de clients, peu de confiance.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                ✅ La solution
              </h4>
              <p className="text-gray-600 text-sm">
                Je crée pour vous un site vitrine moderne, clair et optimisé
                pour convertir vos visiteurs en clients.
              </p>
            </div>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-500" /> Crédibilité
                renforcée
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-500" /> Gain de temps
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-500" /> Plus de clients
              </li>
            </ul>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-center rounded-xl py-3 mt-4">
              <p className="text-sm font-semibold">
                🚀 Prêt à booster ton activité ?
              </p>
            </div>
          </article>
        </div>
      </section>

      {/*Section "Comment ça marche ?" */}
      <section className="py-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comment ça marche ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-16 text-center">
          {[
            {
              icon: "✍️",
              title: "1. Remplis 5 questions",
              text: "Décris ton activité, ton public et ton offre en quelques phrases.",
            },
            {
              icon: "⚙️",
              title: "2. L’IA rédige ton offre",
              text: "Proposia te génère automatiquement un texte clair, convaincant et professionnel.",
            },
            {
              icon: "🚀",
              title: "3. Télécharge ton offre",
              text: "Obtiens ton offre prête à partager à tes clients ou à publier sur ton site.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 transition"
            >
              <div className="text-sky-500 text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Call To Action final */}
      <section className="py-24 bg-gradient-to-r from-sky-500 to-indigo-500 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Prêt à clarifier ton offre ?
        </h2>
        <p className="text-lg mb-8 text-sky-100">
          Commence gratuitement dès maintenant.
        </p>

        <div className="flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(255,255,255,0.4)",
              backgroundColor: "#ffffff",
              color: "#0369a1",
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/create")}
            className="px-10 py-4 bg-white text-sky-600 font-semibold rounded-full shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            ✍️ Créer mon offre
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
