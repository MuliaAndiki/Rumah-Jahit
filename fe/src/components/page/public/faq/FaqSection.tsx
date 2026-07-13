import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    category: "Proses & Waktu",
    question: "Berapa lama waktu pembuatan kebaya atau gaun pesta di Rumah Jahit?",
    answer: "Untuk pembuatan gaun pesta atau cocktail dress membutuhkan waktu estimasi 3 sampai 4 minggu, termasuk 2 kali sesi fitting (baste fitting & final fitting). Sementara untuk kebaya pengantin atau gaun resepsi dengan aplikasi payet/brokat rumit membutuhkan waktu sekitar 4 sampai 6 minggu. Kami sangat menyarankan reservasi minimal 1.5 bulan sebelum hari acara Anda."
  },
  {
    category: "Bahan & Tekstil",
    question: "Apakah saya bisa membawa kain atau pesanan bahan dari luar studio?",
    answer: "Tentu bisa (Cut, Make & Trim / CMT service). Master Cutter kami akan memeriksa terlebih dahulu karakteristik, ketebalan, dan kualitas kain yang Anda bawa untuk memastikan apakah bahan tersebut cocok dengan struktur konstruksi kanvas dan siluet yang Anda inginkan."
  },
  {
    category: "Investasi & Pembayaran",
    question: "Bagaimana sistem pembayaran dan ketentuan uang muka (Down Payment / DP)?",
    answer: "Untuk memulai proses pembuatan pola kertas baru (individual pattern drafting) dan pemesanan bahan impor, kami menerapkan sistem pembayaran uang muka sebesar 50% di awal. Sisa pelunasan sebesar 50% dibayarkan saat busana selesai, telah melalui final fitting, dan siap diserahterimakan."
  },
  {
    category: "Konstruksi Tailoring",
    question: "Apa perbedaan mendasar antara Busana Custom Eksklusif dengan Made-to-Measure (MTM)?",
    answer: "Pada Made-to-Measure (MTM), penjahit menggunakan pola standar (S, M, L) yang sudah ada lalu sedikit membesarkan atau mengecilkan bagian tertentu sesuai tubuh Anda. Sementara pada jahit custom eksklusif di Rumah Jahit, kami membuat pola kertas baru dari nol (scratch) khusus untuk proporsi anatomi tubuh Anda, menggunakan konstruksi bustier/corsetry yang presisi, serta melakukan baste fitting saat busana baru setengah jadi untuk kenyamanan tingkat tinggi."
  },
  {
    category: "Garansi & Fitting",
    question: "Bagaimana jika ukuran atau berat badan saya berubah sebelum hari acara?",
    answer: "Ketenangan Anda adalah prioritas kami. Rumah Jahit memberikan garansi penyesuaian siluet dan ukuran (resizing adjustment) secara gratis hingga 30 hari paska penyerahan busana. Master penjahit kami telah menyisipkan cadangan kain di titik-titik kelim rahasia agar busana mudah disesuaikan."
  },
  {
    category: "Layanan Khusus",
    question: "Apakah Rumah Jahit menyediakan layanan konsultasi & pengukuran privat (Private Fitting)?",
    answer: "Ya, kami menyediakan layanan Private Fitting Service di studio kami di Takengon maupun kunjungan khusus dengan reservasi sebelumnya. Tim penjahit kami beserta sampel katalog kain impor akan mendampingi Anda."
  }
];

interface FaqSectionProps {
  state: {
    openIndex: number | null;
  };
  service: {
    onToggleAccordion: (index: number) => void;
  };
}

const FaqSection: React.FC<FaqSectionProps> = ({ state, service }) => {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden pt-20">
      {/* Section 1: Header FAQ */}
      <section className="relative py-24 px-6 border-b border-border/80 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />
        <div className="relative max-w-4xl mx-auto space-y-6 z-10">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Frequently Asked Questions
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground leading-tight">
            Pertanyaan Umum &amp; <br />
            <span className="italic text-muted-foreground">Informasi Layanan</span>
          </h1>
          <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Semua hal yang perlu Anda ketahui mengenai tahapan pembuatan busana, standar kualitas atelier, serta ketentuan layanan di Rumah Jahit.
          </p>
        </div>
      </section>

      {/* Section 2: Daftar Pertanyaan Accordion */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-b border-border/80">
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = state.openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-border/80 bg-card transition-all"
              >
                <button
                  type="button"
                  onClick={() => service.onToggleAccordion(idx)}
                  className="w-full px-8 py-6 text-left flex items-start justify-between gap-6 hover:bg-muted/20 transition-colors"
                >
                  <div className="space-y-1">
                    {item.category && (
                      <span className="text-[11px] font-sans uppercase tracking-widest text-primary block font-medium">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center border border-border/60 shrink-0 transition-transform duration-300 ${isOpen ? "bg-foreground text-background rotate-180" : "bg-transparent text-foreground"}`}>
                    <Icon icon="mdi:chevron-down" className="text-xl" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-8 pb-8 pt-2 border-t border-border/40 font-serif text-base sm:text-lg text-muted-foreground leading-relaxed animate-enter">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Direct Assistance CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl mb-2">
          <Icon icon="mdi:frequently-asked-questions" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Masih Memiliki Pertanyaan Khusus?
        </h2>
        <p className="font-serif text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Konsultasikan langsung kebutuhan busana formal atau kebaya Anda bersama tim penjahit kami melalui obrolan WhatsApp atau telepon langsung.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="https://wa.me/6285294988446"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" className="text-xl" />
            <span>Tanya Langsung via WhatsApp</span>
          </Link>
          <Link
            href="/lokasi-dan-kontak"
            className="px-8 py-4 bg-background border border-border/80 text-foreground font-serif text-lg tracking-wide hover:bg-muted/30 transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Kunjungi Studio Kami</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
