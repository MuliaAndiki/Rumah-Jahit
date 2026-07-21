import { Metadata } from "next";

import TentangKamiContainer from "./_container/tentangKami";

export const metadata: Metadata = {
  title: "Tentang Kami & Warisan Atelier | Rumah Jahit Khusus Wanita",
  description: "Filosofi, sejarah, dan standar kualitas jahit busana wanita eksklusif dari Rumah Jahit Studio Takengon, Aceh Tengah.",
};

export default function TentangKamiPage() {
  return <TentangKamiContainer />;
}
