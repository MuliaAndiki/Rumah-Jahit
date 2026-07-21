import { Icon } from "@iconify/react";
import Link from "next/link";
import * as React from "react";

import type { CatalogItemData } from "@/services/props.service";

interface PublicCatalogDetailSectionProps {
  state: {
    item: CatalogItemData | null;
    relatedItems: CatalogItemData[];
    activeImageIndex: number;
    isLoading: boolean;
  };
  service: {
    onSelectImage: (index: number) => void;
  };
}

const PublicCatalogDetailSection: React.FC<PublicCatalogDetailSectionProps> = ({ state, service }) => {
  const item = state.item;
  
  const sortedImages = React.useMemo(() => {
    if (!item?.images || item.images.length === 0) return [];
    return [...item.images].sort((a, b) => {
      if (a.isPrimary) return -1;
      if (b.isPrimary) return 1;
      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });
  }, [item?.images]);

  if (state.isLoading) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center space-y-4 pt-28 pb-20 text-muted-foreground">
        <Icon icon="mdi:loading" className="animate-spin text-4xl text-primary" />
        <p className="font-serif text-lg">Memuat rincian karya busana custom...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center space-y-6 pt-28 pb-20 text-center px-6">
        <Icon icon="mdi:hanger" className="text-6xl text-muted-foreground opacity-30" />
        <h2 className="font-serif text-3xl font-normal text-foreground">
          Karya Tidak Ditemukan
        </h2>
        <p className="font-serif text-base text-muted-foreground max-w-md">
          Model busana yang Anda cari mungkin telah dipindahkan atau belum dipublikasikan dalam lookbook saat ini.
        </p>
        <Link
          href="/katalog"
          className="px-6 py-3 bg-primary text-primary-foreground font-serif text-base hover:bg-primary/90 transition-colors"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }



  const activeImg = sortedImages[state.activeImageIndex] || sortedImages[0];
  const waMessage = encodeURIComponent(
    `Halo Rumah Jahit Studio, saya sangat tertarik untuk berkonsultasi mengenai pembuatan model busana wanita: "${item.title}"${item.priceStart ? ` (Mulai IDR ${Number(item.priceStart).toLocaleString("id-ID")})` : ""}. Apakah bisa diinfokan jadwal fitting berikutnya?`
  );
  const waUrl = `https://wa.me/6281122334455?text=${waMessage}`;

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-28 pb-32 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Breadcrumb Nav */}
        <nav className="flex items-center space-x-2 font-serif text-sm text-muted-foreground border-b border-border/60 pb-4">
          <Link href="/" className="hover:text-foreground transition-colors">Lookbook</Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-foreground transition-colors">Katalog Koleksi</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{item.title}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Gallery Slider / Thumbnails (5 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Active Image Viewport */}
            <div className="aspect-4/5 w-full bg-muted overflow-hidden relative border border-border/80">
              {activeImg ? (
                <img
                  src={activeImg.imageUrl}
                  alt={`${item.title} - Foto ${state.activeImageIndex + 1}`}
                  className="w-full h-full object-cover animate-enter"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground space-y-3">
                  <Icon icon="mdi:image-outline" className="text-6xl opacity-30" />
                  <span className="font-serif text-sm">Foto belum tersedia</span>
                </div>
              )}
              {item.category?.name && (
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs px-3 py-1 text-[11px] font-sans uppercase tracking-[0.25em] text-foreground border border-border/60">
                  {item.category.name}
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            {sortedImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {sortedImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => service.onSelectImage(idx)}
                    className={`aspect-square bg-muted overflow-hidden border transition-all ${
                      state.activeImageIndex === idx
                        ? "border-foreground ring-1 ring-foreground opacity-100"
                        : "border-border/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.imageUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specification & Editorial Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <div className="space-y-4 border-b border-border/80 pb-8">
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground block">
                Spesifikasi Busana Custom
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-foreground leading-tight">
                {item.title}
              </h1>

              <div className="flex items-baseline justify-between pt-2">
                {item.priceStart ? (
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground block">
                      Estimasi Investasi
                    </span>
                    <span className="font-mono text-2xl font-bold text-foreground">
                      Mulai IDR {Number(item.priceStart).toLocaleString("id-ID")}
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-lg italic text-muted-foreground">Harga by Quotation</span>
                )}

                <div className="text-right space-y-1">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground block">
                    Waktu Pengerjaan
                  </span>
                  <span className="font-serif text-lg text-foreground font-medium">
                    {item.estimatedTime || "3 - 4 Minggu"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm uppercase tracking-widest text-muted-foreground">
                Filosofi &amp; Detail Siluet
              </h3>
              <div className="font-serif text-lg text-foreground/90 leading-relaxed space-y-4 whitespace-pre-line">
                {item.description || "Rancangan busana wanita eksklusif dengan fitting anatomis presisi, serta pemilihan kain impor berkualitas tinggi yang diproses dengan ketelitian jahitan tangan penjahit berpengalaman kami."}
              </div>
            </div>

            {/* Quality Checkpoints */}
            <div className="bg-muted/30 border border-border/80 p-6 space-y-3 font-serif">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Jaminan Kualitas Studio:
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <Icon icon="mdi:check-circle-outline" className="text-lg text-foreground" />
                  <span>Sesi fitting personal hingga 2x (Baste &amp; Final Fitting)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon icon="mdi:check-circle-outline" className="text-lg text-foreground" />
                  <span>Koreksi proporsi anatomi &amp; pola kertas eksklusif</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon icon="mdi:check-circle-outline" className="text-lg text-foreground" />
                  <span>Garansi adjustment ukuran hingga 30 hari paska penyerahan</span>
                </li>
              </ul>
            </div>

            {/* Dedicated WhatsApp CTA Button */}
            <div className="pt-4 space-y-3">
              <Link
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-enhanced"
              >
                <Icon icon="mdi:whatsapp" className="text-2xl" />
                <span>Konsultasi Model Ini via WhatsApp</span>
              </Link>
              <p className="font-serif text-xs text-center text-muted-foreground italic">
                *Pesan otomatis akan menyertakan nama dan spesifikasi model ini untuk memudahkan tim konsultan studio.
              </p>
            </div>
          </div>
        </div>

        {/* Related / Recommended Items */}
        {state.relatedItems.length > 0 && (
          <div className="pt-20 border-t border-border/80 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-sans uppercase tracking-[0.25em] text-muted-foreground">
                  Simultaneous Aesthetic
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                  Rekomendasi Karya Senada
                </h2>
              </div>
              <Link
                href="/katalog"
                className="font-serif text-base text-foreground hover:underline underline-offset-8 inline-flex items-center gap-2"
              >
                <span>Lihat Seluruh Katalog</span>
                <Icon icon="mdi:arrow-right" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {state.relatedItems.map((relItem) => {
                const relImg = relItem.images?.find((i) => i.isPrimary) || relItem.images?.[0];
                return (
                  <Link
                    key={relItem.id}
                    href={`/katalog/${relItem.slug || relItem.id}`}
                    className="group flex flex-col space-y-3"
                  >
                    <div className="aspect-4/5 w-full bg-muted overflow-hidden relative border border-border/60">
                      {relImg ? (
                        <img
                          src={relImg.imageUrl}
                          alt={relItem.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Icon icon="mdi:image-outline" className="text-3xl opacity-40" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-normal text-foreground group-hover:underline underline-offset-4 truncate">
                        {relItem.title}
                      </h4>
                      {relItem.priceStart && (
                        <p className="font-mono text-xs font-semibold text-muted-foreground">
                          Mulai IDR {Number(relItem.priceStart).toLocaleString("id-ID")}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicCatalogDetailSection;
