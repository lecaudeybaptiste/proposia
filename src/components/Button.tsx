"use client";

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button", // nouvelle prop avec valeur par défaut
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset"; // définition du type autorisé
}) {
  const base =
    "px-6 py-3 font-semibold rounded-full transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      base +
      " bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90 focus:ring-sky-400",
    secondary:
      base + " bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      base +
      " border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };

  return (
    <button type={type} onClick={onClick} className={variants[variant]}>
      {children}
    </button>
  );
}
