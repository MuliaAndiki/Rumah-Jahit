import { Metadata } from "next";
import FaqContainer from "./_container/faq";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ) | Rumah Jahit Khusus Wanita",
  description: "Pertanyaan yang sering diajukan seputar waktu pengerjaan kebaya & gaun, sistem DP 50%, garansi fitting 30 hari, serta keunggulan jahit custom eksklusif.",
};

export default function FaqPage() {
  return <FaqContainer />;
}
