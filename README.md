# 🚀 Proposia — Crée ton offre professionnelle en 5 minutes

Proposia est une application web développée avec **Next.js** et **Tailwind CSS**, conçue pour aider les indépendants, freelances et créateurs à **formuler et structurer leur offre de services professionnelle** en quelques minutes.  
Grâce à une interface intuitive et un générateur intelligent, Proposia transforme un simple formulaire en une offre claire, structurée et prête à partager.

## 🧩 Objectif du projet

L’objectif de Proposia est de simplifier la création d’offres commerciales professionnelles pour les indépendants.  
Le projet a été conçu dans le cadre du **projet-passerelle Believemy** afin de démontrer la maîtrise :

- du framework **Next.js** (routage, API routes, client/server components)
- du design system **Tailwind CSS**
- et de l’intégration d’outils modernes : Framer Motion, export PDF, génération locale simulée

## ⚙️ Technologies utilisées

- **Framework principal** : [Next.js 14](https://nextjs.org/)
- **Style & UI** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Export PDF** : [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://github.com/niklasvh/html2canvas)
- **Langage** : TypeScript
- **Hébergement / Local** : Vercel ou localhost |

## 💡 Fonctionnalités principales

✅ Génération automatique d’offres à partir d’un simple formulaire  
✅ Affichage instantané du rendu final avec une mise en page claire  
✅ Téléchargement de l’offre en **PDF**  
✅ Mode édition pour ajuster l’offre après coup  
✅ Interface **responsive**, fluide et agréable à parcourir

## 🧱 Structure du projet

```bash
src/
 ├── app/
 │   ├── page.tsx              # Page d’accueil (Home)
 │   ├── create/page.tsx       # Formulaire de génération d’offre
 │   ├── preview/page.tsx      # Page de prévisualisation d’offre
 │   ├── api/generate/route.ts # API simulant la génération d’offre
 │   └── globals.css           # Styles globaux
 │
 ├── components/
 │   ├── HeaderMain.tsx        # Header principal (Home)
 │   ├── HeaderApp.tsx         # Header des pages internes
 │   ├── OfferDisplay.tsx      # Affichage structuré de l’offre
 │   ├── Button.tsx            # Bouton générique
 │   └── Footer.tsx            # Pied de page global
 │
 ├── lib/
 │   ├── generateOffer.ts      # Génération locale (simulation IA)
 │   ├── exportPDF.ts          # Exportation PDF
 │   └── formatOffer.ts        # Mise en forme du texte brut
 │
 └── public/
     └── favicon-proposia.png  # Icône principale
```

## 🧭 Installation & lancement

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/ton-compte/proposia.git
cd proposia
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Lancer le projet en local

```bash
npm run dev
```

Le site sera ensuite accessible sur :  
👉 [http://localhost:3000](http://localhost:3000)

## 🎬 Utilisation

**1. Accueil (Home)** — découvre le concept et lance la création.  
**2. Formulaire (Create)** — renseigne ton activité, ta cible et tes offres.  
**3. Aperçu (Preview)** — visualise ton offre générée automatiquement.  
**4. Export PDF** — télécharge ton offre professionnelle.  
**5. Mode édition** — reviens modifier ton offre à tout moment.

## ⚠️ Limites de la version actuelle (V1)

- Génération **locale** sans IA réelle (mock interne).
- Export PDF basé sur une **capture HTML** (pas de mise en page vectorisée).
- Aucune **base de données** ni **authentification** utilisateur pour le moment.
- Design optimisé pour la clarté et la logique fonctionnelle.

## 🚀 Améliorations prévues (V2)

- Intégration d’une **IA réelle (OpenAI API)** pour un texte dynamique.
- Système d’**authentification et sauvegarde d’offres**.
- Personnalisation du **ton de communication** (professionnel, inspirant, premium).
- Partage d’offres via **liens publics** et collaboration.
- Interface d’administration pour visualiser toutes les offres créées.

## 🎥 Démonstration

🎬 **Vidéo YouTube (non répertoriée)** :
👉 [(https://youtu.be/Au1oR4rwv6g)]

## Github

🔗 **Lien du repository GitHub :** [https://github.com/lecaudeybaptiste/proposia]

## 👤 Auteur

**Baptiste Lecaudey**

## 📄 Licence

Projet réalisé dans le cadre de la formation **Believemy - Développeur Web**  
© 2025 — Tous droits réservés à **Baptiste Lecaudey**
