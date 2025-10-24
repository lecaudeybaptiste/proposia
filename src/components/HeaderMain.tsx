"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo Proposia */}
      <Link href="/" className="text-2xl font-bold text-sky-500 tracking-tight">
        Proposia
      </Link>

      {/* Bouton principal */}
      <Link
        href="/create"
        className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
      >
        Créer mon offre
      </Link>
    </header>
  );
}
