import { Metadata } from "next";
import LokasiKontakContainer from "./_container/lokasiKontak";

export const metadata: Metadata = {
  title: "Lokasi Studio & Janji Temu Fitting | Rumah Jahit Khusus Wanita",
  description: "Alamat studio Rumah Jahit di Takengon, Aceh Tengah. Reservasi janji temu konsultasi & fitting via WhatsApp +62 852-9498-8446.",
};

export default function LokasiKontakPage() {
  return <LokasiKontakContainer />;
}
