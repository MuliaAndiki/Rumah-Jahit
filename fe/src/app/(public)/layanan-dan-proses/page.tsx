import { Metadata } from "next";
import LayananProsesContainer from "./_container/layananProses";

export const metadata: Metadata = {
  title: "Layanan & Alur Kerja Bespoke | Rumah Jahit Atelier",
  description: "Spesialisasi pembuatan jas formal, kebaya, tuxedo, dan alur kerja 4 langkah baste fitting dengan transparansi DP & garansi 30 hari.",
};

export default function LayananProsesPage() {
  return <LayananProsesContainer />;
}
