import { Metadata } from "next";
import TentangKamiContainer from "./_container/tentangKami";

export const metadata: Metadata = {
  title: "Tentang Kami & Warisan Atelier | Rumah Jahit Bespoke",
  description: "Filosofi, sejarah, dan standar kualitas traditional hand-canvassing dari Rumah Jahit Bespoke Studio Jakarta.",
};

export default function TentangKamiPage() {
  return <TentangKamiContainer />;
}
