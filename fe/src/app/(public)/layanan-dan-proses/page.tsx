import { Metadata } from "next";
import LayananProsesContainer from "./_container/layananProses";

export const metadata: Metadata = {
  title: "Layanan & Alur Kerja | Rumah Jahit Khusus Wanita",
  description: "Spesialisasi pembuatan kebaya, gaun pesta, dress custom, dan alur kerja fitting presisi dengan transparansi DP & garansi 30 hari.",
};

export default function LayananProsesPage() {
  return <LayananProsesContainer />;
}
