import { jsPDF } from "jspdf";

/**
 * Exporte une offre en PDF propre (UTF-8 natif + mise en page claire)
 */
export function exportOfferPDF({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  try {
    if (!content || content.trim().length === 0) {
      alert("❌ Aucune offre à exporter.");
      return;
    }

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 25;

    // Nettoyage des caractères étranges
    const cleanText = content
      .replace(/[#*_`~>]/g, "") // markdown
      .replace(/[^\S\r\n]+/g, " ") // espaces multiples
      .replace(/\r/g, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/[^a-zA-Z0-9À-ÖØ-öø-ÿœŒçÇéèàùâêîôûëïüÿ'’\n\s.,!?():;%-]/g, "") // supprime les symboles IA
      .trim();

    const sections = cleanText.split(/---+/g);

    // Titre principal
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(0, 102, 204);
    pdf.text(title || "Offre Proposia", pageWidth / 2, y, { align: "center" });
    y += 12;

    pdf.setDrawColor(0, 102, 204);
    pdf.setLineWidth(0.8);
    pdf.line(20, y, pageWidth - 20, y);
    y += 12;

    // Parcours des sections
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    sections.forEach((section) => {
      const lines = section
        .trim()
        .split("\n")
        .filter((l) => l.trim().length > 0);
      if (lines.length === 0) return;

      const header = lines[0];
      const body = lines.slice(1).join("\n");

      // Couleur du titre selon le contenu
      if (header.toLowerCase().includes("probl")) pdf.setTextColor(220, 20, 60);
      else if (header.toLowerCase().includes("solution"))
        pdf.setTextColor(34, 139, 34);
      else if (header.toLowerCase().includes("bénéf"))
        pdf.setTextColor(70, 130, 180);
      else if (header.toLowerCase().includes("formule"))
        pdf.setTextColor(123, 104, 238);
      else if (header.toLowerCase().includes("pourquoi"))
        pdf.setTextColor(255, 165, 0);
      else if (
        header.toLowerCase().includes("prêt") ||
        header.toLowerCase().includes("contact")
      )
        pdf.setTextColor(0, 102, 204);
      else pdf.setTextColor(0, 0, 0);

      // Titre
      pdf.setFont("helvetica", "bold");
      const sectionTitle = header.replace(/\s+/g, " ").trim();
      pdf.text(sectionTitle, 20, y);
      y += 8;

      // Texte
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(40, 40, 40);
      const textLines = pdf.splitTextToSize(body, pageWidth - 40);
      pdf.text(textLines, 20, y);
      y += textLines.length * 7 + 5;

      if (y > 270) {
        pdf.addPage();
        y = 25;
      }
    });

    pdf.save(`${title.replace(/\s+/g, "_") || "Offre_Proposia"}.pdf`);
  } catch (error) {
    console.error("💥 Erreur export PDF :", error);
    alert("❌ Une erreur est survenue lors de la création du PDF.");
  }
}
