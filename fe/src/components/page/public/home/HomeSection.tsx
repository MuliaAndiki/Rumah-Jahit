import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { CatalogItemData } from "@/services/props.service";

interface HomeSectionProps {
  state: {
    featuredItems: CatalogItemData[];
    isLoading: boolean;
  };
}

const HomeSection: React.FC<HomeSectionProps> = ({ state }) => {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden pt-20">
      {/* Section 2: Cinematic Hero Banner */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-24 border-b border-border/80">
        {/* Architectural grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 dark:opacity-10" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border/80 bg-background text-[11px] font-sans uppercase tracking-[0.3em] text-muted-foreground">
            <span>Bespoke Tailoring Atelier &bull; Jakarta Selatan</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.15]">
            Seni Jahit Presisi <br className="hidden sm:block" />
            <span className="italic text-muted-foreground font-light">&amp;</span> Kemewahan Tenang
          </h1>

          <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Rumah Jahit menghadirkan dedikasi penuh pada potongan busana yang sempurna. Dibuat secara personal dengan teknik rancang bangun klasik dan bahan terpilih bagi pribadi berkarakter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/katalog"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <span>Jelajahi Lookbook</span>
              <Icon icon="mdi:arrow-right" className="text-xl" />
            </Link>
            <Link
              href="https://wa.me/6281122334455"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-background text-foreground border border-foreground/80 font-serif text-lg tracking-wide hover:bg-muted/30 transition-colors flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:whatsapp" className="text-xl text-emerald-600" />
              <span>Konsultasi Bespoke</span>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-border/60 font-serif text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mt-1">Pola Bespoke Personal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Super 150s+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mt-1">Wool &amp; Silk Eksklusif</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3 - 4 Minggu</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mt-1">Ketepatan Waktu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Sekilas Atelier (Brand Story Teaser) */}
      <section className="py-24 px-6 border-b border-border/80 bg-muted/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Sekilas Atelier Kami
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Warisan Keindahan <br />
              <span className="italic text-muted-foreground">&amp;</span> Ketelitian Tanpa Kompromi
            </h2>
            <p className="font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
              Di Rumah Jahit, setiap potongan busana lahir dari percakapan mendalam dan ketajaman mata master pattern maker kami. Kami menolak produksi massal demi merawat seni tailoring tradisional yang memadukan kenyamanan anatomis dan estetika modern yang bersahaja.
            </p>
            <div className="pt-2">
              <Link
                href="/tentang-kami"
                className="inline-flex items-center gap-2 font-serif text-base text-foreground border-b border-foreground pb-1 hover:opacity-75 transition-opacity"
              >
                <span>Pelajari Filosofi &amp; Standar Kualitas Kami</span>
                <Icon icon="mdi:arrow-right" className="text-lg" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-3/4 bg-muted border border-border/80 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
                alt="Bespoke Tailoring Craftsmanship"
                className="w-full h-full object-cover filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-3/4 bg-muted border border-border/80 overflow-hidden relative mt-8">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                alt="Master Tailor Measuring"
                className="w-full h-full object-cover filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Karya Terpopuler (Featured Lookbook Teaser) */}
      <section className="py-28 px-6 max-w-7xl mx-auto space-y-16 border-b border-border/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/80 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
              Karya Terpopuler Lookbook
            </h2>
          </div>
          <Link
            href="/katalog"
            className="font-serif text-base text-foreground hover:underline underline-offset-8 inline-flex items-center gap-2"
          >
            <span>Lihat Seluruh Portofolio</span>
            <Icon icon="mdi:arrow-right" />
          </Link>
        </div>

        {state.isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
            <Icon icon="mdi:loading" className="animate-spin text-3xl text-primary" />
            <p className="font-serif text-base">Memuat koleksi terpopuler...</p>
          </div>
        ) : state.featuredItems.length === 0 ? (
          <div className="py-20 text-center space-y-3 border border-border/60 bg-muted/20 p-8">
            <Icon icon="mdi:hanger" className="text-5xl mx-auto opacity-30 text-foreground" />
            <p className="font-serif text-xl text-foreground">Koleksi Lookbook Sedang Dipersiapkan</p>
            <p className="font-serif text-sm text-muted-foreground max-w-md mx-auto">
              Master penjahit kami sedang merampungkan pemotretan untuk karya-karya terbaru. Silakan kunjungi kembali segera.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {state.featuredItems.map((item) => {
              const primaryImg = item.images?.find((i) => i.isPrimary) || item.images?.[0];
              return (
                <Link
                  key={item.id}
                  href={`/katalog/${item.slug || item.id}`}
                  className="group flex flex-col space-y-4 cursor-pointer"
                >
                  <div className="aspect-4/5 w-full bg-muted overflow-hidden relative border border-border/60">
                    {primaryImg ? (
                      <img
                        src={primaryImg.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground space-y-2">
                        <Icon icon="mdi:image-outline" className="text-4xl opacity-40" />
                        <span className="text-xs font-sans uppercase tracking-widest">Foto Dalam Proses</span>
                      </div>
                    )}
                    {item.category?.name && (
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs px-3 py-1 text-[11px] font-sans uppercase tracking-widest text-foreground border border-border/60">
                        {item.category.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between font-serif text-xs text-muted-foreground">
                      <span>Estimasi: {item.estimatedTime || "3-4 Minggu"}</span>
                      {item.priceStart && (
                        <span className="font-mono text-sm font-semibold text-foreground">
                          Mulai Rp {Number(item.priceStart).toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-foreground group-hover:underline underline-offset-4 transition-all">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="font-serif text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 5: Mengapa Memilih Kami (Value Proposition) */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-b border-border/80">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Value Proposition
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
            Mengapa Memilih Atelier Kami
          </h2>
          <p className="font-serif text-base text-muted-foreground leading-relaxed">
            Keunggulan mendasar yang menjadikan Rumah Jahit rujukan utama busana formal dan ceremonial di Jakarta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 border border-border/80 bg-card space-y-4 hover:border-foreground/60 transition-colors">
            <Icon icon="mdi:ruler-square-compass" className="text-3xl text-foreground" />
            <h3 className="font-serif text-xl font-normal text-foreground">
              Pola Kertas Individual
            </h3>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              Kami tidak pernah menggunakan pola standar yang dimodifikasi. Setiap klien dibuatkan pola kertas baru sesuai proporsi unik bahu, pinggang, dan postur Anda.
            </p>
          </div>

          <div className="p-8 border border-border/80 bg-card space-y-4 hover:border-foreground/60 transition-colors">
            <Icon icon="mdi:texture-box" className="text-3xl text-foreground" />
            <h3 className="font-serif text-xl font-normal text-foreground">
              Kain Impor Kelas Dunia
            </h3>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              Akses langsung ke pabrik tekstil terkemuka di Eropa dan Asia (Ermenegildo Zegna, Loro Piana, Dormeuil, dan sutra ATBM nusantara kualitas premium).
            </p>
          </div>

          <div className="p-8 border border-border/80 bg-card space-y-4 hover:border-foreground/60 transition-colors">
            <Icon icon="mdi:human-male-height" className="text-3xl text-foreground" />
            <h3 className="font-serif text-xl font-normal text-foreground">
              Sesi Fitting Presisi
            </h3>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              Sesi baste fitting yang menyeluruh memastikan tidak ada lipatan yang keliru, memberikan keleluasaan bergerak tanpa mengorbankan ketajaman siluet busana.
            </p>
          </div>

          <div className="p-8 border border-border/80 bg-card space-y-4 hover:border-foreground/60 transition-colors">
            <Icon icon="mdi:shield-check-outline" className="text-3xl text-foreground" />
            <h3 className="font-serif text-xl font-normal text-foreground">
              Garansi Siluet 30 Hari
            </h3>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              Kami memberikan jaminan penyesuaian ukuran gratis hingga 30 hari setelah busana diserahterimakan untuk kepuasan dan ketenangan pikiran Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Cerita Klien (Editorial Testimonial) */}
      <section className="py-24 px-6 bg-muted/30 border-b border-border/80">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Editorial Testimonial
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
              Cerita Klien Kami
            </h2>
            <p className="font-serif text-base text-muted-foreground leading-relaxed">
              Pengalaman langsung dari para eksekutif dan mempelai yang mempercayakan penampilan terpenting mereka pada Rumah Jahit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-background border border-border/80 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-500 text-lg">
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                </div>
                <p className="font-serif text-base text-foreground italic leading-relaxed">
                  &ldquo;Jas wedding saya dikerjakan dengan presisi luar biasa. Fitting kedua langsung sempurna tanpa perlu banyak koreksi. Bagian bahunya sangat kokoh dan nyaman dipakai sepanjang hari resepsi.&rdquo;
                </p>
              </div>
              <div className="border-t border-border/60 pt-4">
                <p className="font-serif text-lg font-bold text-foreground">Hendra &amp; Clarissa</p>
                <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Bespoke Wedding Tuxedo &bull; Jakarta</p>
              </div>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-500 text-lg">
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                </div>
                <p className="font-serif text-base text-foreground italic leading-relaxed">
                  &ldquo;Sebagai pengacara yang bertugas di persidangan tiap hari, kenyamanan dan potongan jas adalah segalanya. Rumah Jahit memahami struktur tubuh saya dan hasil jasnya memberikan rasa percaya diri tinggi.&rdquo;
                </p>
              </div>
              <div className="border-t border-border/60 pt-4">
                <p className="font-serif text-lg font-bold text-foreground">Bambang S., S.H., M.H.</p>
                <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Senior Attorney &bull; Kebayoran Baru</p>
              </div>
            </div>

            <div className="p-8 bg-background border border-border/80 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-500 text-lg">
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                  <Icon icon="mdi:star" />
                </div>
                <p className="font-serif text-base text-foreground italic leading-relaxed">
                  &ldquo;Kualitas jahitan kebaya modifikasi untuk acara lamaran sangat rapi dan elegan. Pilihan bahan sutra dan brokat yang direkomendasikan master penjahit benar-benar berkelas.&rdquo;
                </p>
              </div>
              <div className="border-t border-border/60 pt-4">
                <p className="font-serif text-lg font-bold text-foreground">dr. Anisa Pratiwi</p>
                <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Bespoke Kebaya &bull; Menteng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal">
          Siap Merasakan Pengalaman Bespoke?
        </h2>
        <p className="font-serif text-base text-muted-foreground max-w-xl mx-auto">
          Hubungi master penjahit kami via WhatsApp atau kunjungi studio kami di Kebayoran Baru untuk konsultasi langsung.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="https://wa.me/6281122334455"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" className="text-xl" />
            <span>Jadwalkan Konsultasi</span>
          </Link>
          <Link
            href="/lokasi-dan-kontak"
            className="px-8 py-4 bg-background border border-border/80 text-foreground font-serif text-lg tracking-wide hover:bg-muted/30 transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Lihat Alamat &amp; Jam Buka</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
