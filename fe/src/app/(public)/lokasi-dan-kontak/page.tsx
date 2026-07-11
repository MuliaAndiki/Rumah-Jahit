import { Metadata } from "next";
import LokasiKontakContainer from "./_container/lokasiKontak";

export const metadata: Metadata = {
  title: "Lokasi Studio & Janji Temu Fitting | Rumah Jahit Bespoke",
  description: "Alamat studio Rumah Jahit di Jl. Senopati Dalam No. 88, Kebayoran Baru, Jakarta Selatan. Reservasi janji temu baste & final fitting via WhatsApp.",
};

export default function LokasiKontakPage() {
  return <LokasiKontakContainer />;
}
