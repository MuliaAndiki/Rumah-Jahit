import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const TentangKamiSection: React.FC = () => {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden pt-20">
      {/* Section 1: Title Header (Filosofi & Warisan) */}
      <section className="relative py-24 px-6 border-b border-border/80 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />
        <div className="relative max-w-4xl mx-auto space-y-6 z-10">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Filosofi &amp; Warisan Atelier
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground leading-tight">
            Keanggunan dalam Kesederhanaan, <br />
            <span className="italic text-muted-foreground">Ketepatan dalam Setiap Jahitan</span>
          </h1>
          <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Busana bukan sekadar penutup tubuh; busana adalah bahasa keanggunan, martabat, dan rasa hormat pada diri sendiri.
          </p>
        </div>
      </section>

      {/* Section 2: Sejarah & Dedikasi Usaha */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-border/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Sejarah &amp; Dedikasi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Dari Studio Kecil Hingga <br /> Rujukan Busana Berkelas
            </h2>
            <div className="font-serif text-base sm:text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Didirikan lebih dari dua dekade lalu di kawasan Jakarta Selatan, Rumah Jahit bermula dari kecintaan mendalam pada seni rancang bangun busana klasik (traditional bespoke tailoring).
              </p>
              <p>
                Dalam dunia modern yang serba cepat dan didominasi oleh konveksi instan, kami memilih jalan yang membutuhkan ketekunan, waktu, dan ketelitian. Kami percaya bahwa setiap individu memiliki postur anatomis yang unik, yang tidak dapat dipaksakan ke dalam ukuran standar berlabel S, M, L, atau XL.
              </p>
              <p>
                Dedikasi kami pada kualitas jahitan tangan dan pelayanan personal telah menjadikan Rumah Jahit sebagai kepercayaan para pejabat diplomatik, eksekutif bisnis, serta mempelai pria dan wanita di momen paling istimewa mereka.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <div className="aspect-4/5 bg-muted border border-border/80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
                alt="Atelier Heritage 1"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
            <div className="aspect-4/5 bg-muted border border-border/80 overflow-hidden mt-12">
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
                alt="Atelier Heritage 2"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Standar Kualitas (The Craftsmanship Showcase) */}
      <section className="py-24 px-6 bg-muted/20 border-b border-border/80">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              The Craftsmanship Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
              Standar Kualitas &amp; Teknik Rancang
            </h2>
            <p className="font-serif text-base text-muted-foreground leading-relaxed">
              Tiga pilar pengerjaan yang membedakan busana bespoke Rumah Jahit dengan produksi lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-background border border-border/80 space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                <Icon icon="mdi:needle" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground">
                Traditional Hand-Canvassing
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Jas kami dibangun dengan lapisan kanvas bulu kuda (horsehair canvas) yang dijahit tangan lapis demi lapis, bukan dilem dengan bahan sintesis. Hasilnya, jas dapat bernapas, mengikuti kontur tubuh seiring waktu, dan tidak pernah melempem atau menggelembung setelah dicuci kering.
              </p>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                <Icon icon="mdi:iron-outline" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground">
                3-Stage Steam Pressing
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Proses penyetrikaan uap bertekanan tinggi dilakukan dalam 3 tahap terpisah selama proses konstruksi busana. Ini memastikan serat kain wol atau sutra matang sempurna dan membentuk kelengkungan bahu serta dada secara alami.
              </p>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                <Icon icon="mdi:ruler-r-square" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground">
                Anatomical Pattern Drafting
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                Kami memperhitungkan ketidaksimetrisan bahu, kelengkungan tulang belakang, serta postur berdiri Anda. Master penjahit mengukir kelonggaran dan ketegangan di titik-titik krusial agar busana nyaman dipakai saat duduk maupun berdiri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Sosok di Balik Karya (The Maker / Designer) */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-border/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-3/4 bg-muted border border-border/80 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                alt="Master Tailor"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute bottom-0 inset-x-0 bg-background/90 backdrop-blur-xs p-6 border-t border-border/80">
                <p className="font-serif text-xl font-bold text-foreground">Master Hendro Wibowo</p>
                <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Founder &amp; Head Master Cutter</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              The Maker &amp; Artisan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Sosok di Balik Setiap <br /> Pola &amp; Potongan Busana
            </h2>
            <div className="font-serif text-base sm:text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Mengawali karir sejak tahun 1990-an di bawah didikan master tailor bergaya Inggris lama, Master Hendro Wibowo telah menghabiskan lebih dari 30 tahun mengasah sensitivitasnya terhadap struktur tekstil dan anatomi manusia.
              </p>
              <p className="italic text-foreground font-normal border-l-2 border-foreground pl-4 py-1 my-4">
                &ldquo;Rahasia dari jas dan busana yang agung bukanlah pada ornamen yang mencolok, melainkan pada ketenangan siluet dan kenyamanan mutlak yang dirasakan pemakainya sejak detik pertama mengenakannya.&rdquo;
              </p>
              <p>
                Setiap klien yang melangkah masuk ke Rumah Jahit akan ditangani secara langsung oleh tim penjahit profesional di bawah supervisi ketat Master Hendro. Mulai dari pengambilan ukuran awal hingga torehan kapur baste fitting, setiap detail diawasi langsung di studio kami.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="font-serif text-3xl font-bold text-foreground">30+ Tahun</p>
                <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mt-1">Pengalaman Bespoke</p>
              </div>
              <div className="h-10 w-px bg-border/80" />
              <div className="text-center sm:text-left">
                <p className="font-serif text-3xl font-bold text-foreground">2.500+</p>
                <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mt-1">Karya Busana Diciptakan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action (CTA) Banner */}
      <section className="py-24 px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-sans uppercase tracking-[0.3em] opacity-80 block">
            Undangan Eksklusif
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            Rasakan Sendiri Keanggunan <br className="hidden sm:block" /> Potongan Bespoke
          </h2>
          <p className="font-serif text-base sm:text-lg opacity-90 max-w-xl mx-auto leading-relaxed">
            Kami mengundang Anda untuk hadir ke studio kami, menyentuh koleksi kain impor langsung, dan mendiskusikan visi busana Anda bersama master penjahit kami.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://wa.me/6281122334455"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-background text-foreground font-serif text-lg tracking-wide hover:bg-muted/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:whatsapp" className="text-xl text-emerald-600" />
              <span>Reservasi Konsultasi Fitting</span>
            </Link>
            <Link
              href="/layanan-dan-proses"
              className="px-8 py-4 border border-primary-foreground/60 text-primary-foreground font-serif text-lg tracking-wide hover:bg-primary-foreground/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Lihat Alur Kerja Kami</span>
              <Icon icon="mdi:arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangKamiSection;
