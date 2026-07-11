import { Metadata } from "next";
import FaqContainer from "./_container/faq";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ) & Layanan Bespoke | Rumah Jahit Atelier",
  description: "Pertanyaan yang sering diajukan seputar waktu pengerjaan jas/kebaya, sistem DP 50%, garansi fitting 30 hari, serta perbedaan Bespoke dan Made-to-Measure.",
};

export default function FaqPage() {
  return <FaqContainer />;
}
