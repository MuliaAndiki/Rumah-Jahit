import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const LayananProsesSection: React.FC = () => {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden pt-20">
      {/* Header */}
      <section className="relative py-24 px-6 border-b border-border/80 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />
        <div className="relative max-w-4xl mx-auto space-y-6 z-10">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Rumah Jahit Services &amp; Workflow
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground leading-tight">
            Spesialisasi Layanan &amp; <br />
            <span className="italic text-muted-foreground">Alur Kerja Rumah Jahit</span>
          </h1>
          <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dedikasi kami terfokus pada pembuatan busana bersiluet tajam dengan kenyamanan sejati. Berikut adalah rincian layanan dan proses yang kami jalani bersama setiap klien.
          </p>
        </div>
      </section>

      {/* Section 1: Spesialisasi Layanan Kami */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-b border-border/80">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Our Specialties
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
            Spesialisasi Layanan Kami
          </h2>
          <p className="font-serif text-base text-muted-foreground leading-relaxed">
            Empat pilar keahlian utama yang dikerjakan dengan standar tailoring internasional oleh master cutter dan artisan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-10 border border-border/80 bg-card space-y-6 hover:border-foreground/60 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-serif text-2xl font-normal text-foreground">01. Kebaya Eksklusif &amp; Gaun Pengantin</span>
                <Icon icon="mdi:flower-tulip-outline" className="text-3xl text-muted-foreground" />
              </div>
              <p className="font-serif text-base text-muted-foreground leading-relaxed">
                Rancang bangun kebaya pengantin, gaun akad/pemberkatan, dan gaun resepsi dengan konstruksi fitting presisi tinggi. Kami menggunakan bahan brokat impor pilihan, chantilly lace, dan penataan payet/beading tangan yang memperanggun keindahan postur alami tubuh Anda.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between font-serif text-xs text-muted-foreground uppercase tracking-widest">
              <span>Estimasi: 4 - 6 Minggu</span>
              <span>Investasi: Mulai Rp 4.500.000</span>
            </div>
          </div>

          <div className="p-10 border border-border/80 bg-card space-y-6 hover:border-foreground/60 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-serif text-2xl font-normal text-foreground">02. Gaun Pesta &amp; Evening Dress</span>
                <Icon icon="mdi:hanger" className="text-3xl text-muted-foreground" />
              </div>
              <p className="font-serif text-base text-muted-foreground leading-relaxed">
                Perpaduan keagungan desain elegan dan ketepatan cutting modern. Pembuatan gaun pesta malam, cocktail dress, maupun dress formal rancangan khusus dengan penataan drapery dan cutting yang disesuaikan secara sempurna dengan anatomi tubuh pemakainya.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between font-serif text-xs text-muted-foreground uppercase tracking-widest">
              <span>Estimasi: 3 - 4 Minggu</span>
              <span>Investasi: Mulai Rp 5.000.000</span>
            </div>
          </div>

          <div className="p-10 border border-border/80 bg-card space-y-6 hover:border-foreground/60 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-serif text-2xl font-normal text-foreground">03. Busana Kerja &amp; Formal Dress Wanita</span>
                <Icon icon="mdi:briefcase-outline" className="text-3xl text-muted-foreground" />
              </div>
              <p className="font-serif text-base text-muted-foreground leading-relaxed">
                Koleksi pakaian kerja eksekutif wanita (blazer wanita custom, blouse formal bermutu tinggi, serta celana dan rok kerja elegan) yang dirancang untuk kenyamanan maksimal dalam mobilitas tinggi dan jamuan resmi.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between font-serif text-xs text-muted-foreground uppercase tracking-widest">
              <span>Estimasi: 2 - 3 Minggu</span>
              <span>Investasi: Mulai Rp 2.500.000</span>
            </div>
          </div>

          <div className="p-10 border border-border/80 bg-card space-y-6 hover:border-foreground/60 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-serif text-2xl font-normal text-foreground">04. Alterasi &amp; Restorasi Gaun Mewah</span>
                <Icon icon="mdi:content-cut" className="text-3xl text-muted-foreground" />
              </div>
              <p className="font-serif text-base text-muted-foreground leading-relaxed">
                Layanan penyesuaian ulang (recutting &amp; resizing) untuk gaun pesta impor dan busana kesayangan Anda. Master penjahit kami menyesuaikan struktur jahitan agar pas, sempurna, dan relevan dengan postur tubuh Anda hari ini.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between font-serif text-xs text-muted-foreground uppercase tracking-widest">
              <span>Estimasi: 1 - 2 Minggu</span>
              <span>Investasi: Mulai Rp 1.200.000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Alur Kerja 4 Langkah */}
      <section className="py-24 px-6 bg-muted/20 border-b border-border/80">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Alur Pemesanan &amp; Fitting
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
              Alur Kerja 4 Langkah
            </h2>
            <p className="font-serif text-base text-muted-foreground leading-relaxed">
              Setiap karya yang keluar dari pintu atelier Rumah Jahit telah melewati proses kolaboratif 4 langkah berikut ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-background border border-border/80 space-y-4 relative">
              <div className="w-12 h-12 bg-primary text-primary-foreground font-serif text-xl flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif text-xl font-normal text-foreground">
                Konsultasi &amp; Pilihan Kain
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Anda bertemu langsung dengan Master Cutter atau konsultan mode kami. Kita membahas karakter acara, siluet yang diinginkan, serta memilih bahan dari buku katalog impor bermutu tinggi.
              </p>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-4 relative">
              <div className="w-12 h-12 bg-primary text-primary-foreground font-serif text-xl flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif text-xl font-normal text-foreground">
                Pengukuran &amp; Pola Kertas
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Pengukuran lebih dari 20 titik anatomi tubuh Anda secara mendetail. Berdasarkan ukuran ini, master pattern maker membuat pola kertas khusus yang disimpan abadi atas nama Anda di atelier.
              </p>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-4 relative">
              <div className="w-12 h-12 bg-primary text-primary-foreground font-serif text-xl flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif text-xl font-normal text-foreground">
                Baste Fitting &amp; Koreksi
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Sesi fitting pertama (baste fitting) dengan busana setengah jadi yang dirangkai benang sementara. Kita memeriksa jatuhnya kain, kelengkungan bahu, dan kenyamanan di area pinggang dan kerah.
              </p>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-4 relative">
              <div className="w-12 h-12 bg-primary text-primary-foreground font-serif text-xl flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-serif text-xl font-normal text-foreground">
                Final Fitting &amp; Penyerahan
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Setelah semua koreksi diproses dan jahitan tangan diselesaikan, Anda melakukan fitting akhir. Busana diserahkan dengan gantungan kayu ukir dan cover garment eksklusif Rumah Jahit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Transparansi Sistem DP & Garansi Fitting */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-b border-border/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Transparansi &amp; Komitmen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Sistem Pembayaran yang Jelas <br />
              <span className="italic text-muted-foreground">&amp; Garansi Fitting 30 Hari</span>
            </h2>
            <p className="font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
              Kami menjunjung tinggi kejujuran dan transparansi dalam setiap transaksi seiring dengan komitmen mutlak atas kepuasan hasil jahitan Anda.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 border border-border/80 bg-card space-y-4">
              <div className="flex items-center gap-3 font-serif text-xl text-foreground">
                <Icon icon="mdi:credit-card-outline" className="text-2xl text-primary" />
                <span>Sistem Pembayaran (50% / 50%)</span>
              </div>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Untuk memulai pembuatan pola kertas dan pemesanan bahan impor dari luar negeri, klien dikenakan uang muka (Down Payment / DP) sebesar 50% dari total investasi. Sisa pelunasan 50% dibayarkan setelah sesi final fitting selesai dan busana siap diserahterimakan.
              </p>
            </div>

            <div className="p-8 border border-border/80 bg-card space-y-4">
              <div className="flex items-center gap-3 font-serif text-xl text-foreground">
                <Icon icon="mdi:shield-check" className="text-2xl text-primary" />
                <span>Garansi Penyesuaian Siluet 30 Hari</span>
              </div>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Jika dalam 30 hari pertama setelah penyerahan busana Anda mengalami sedikit perubahan berat badan atau membutuhkan penyesuaian kelonggaran di area pinggang/bahu, kami akan melakukannnya di atelier secara gratis tanpa biaya tambahan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Mulai Konsultasi Karya Busana Anda
        </h2>
        <p className="font-serif text-base text-muted-foreground max-w-xl mx-auto">
          Hubungi kami sekarang untuk menanyakan ketersediaan bahan atau menjadwalkan kunjungan fitting pertama Anda.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="https://wa.me/6285294988446"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" className="text-xl" />
            <span>Konsultasi via WhatsApp</span>
          </Link>
          <Link
            href="/katalog"
            className="px-8 py-4 bg-background border border-border/80 text-foreground font-serif text-lg tracking-wide hover:bg-muted/30 transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Lihat Galeri Katalog</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LayananProsesSection;
