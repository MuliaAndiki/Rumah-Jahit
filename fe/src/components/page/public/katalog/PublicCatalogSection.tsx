import { Icon } from "@iconify/react";
import Link from "next/link";
import * as React from "react";

import type { CatalogItemData, CategoryItem } from "@/services/props.service";

interface PublicCatalogSectionProps {
  state: {
    items: CatalogItemData[];
    categories: CategoryItem[];
    selectedCategory: string;
    searchQuery: string;
    isLoading: boolean;
  };
  service: {
    onSelectCategory: (categorySlugOrId: string) => void;
    onSearchChange: (query: string) => void;
  };
}

const PublicCatalogSection: React.FC<PublicCatalogSectionProps> = ({ state, service }) => {
  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-28 pb-32 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Editorial Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-border/80 pb-12">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Portofolio Busana Wanita &bull; Lookbook
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground tracking-tight">
            Katalog Busana Wanita Custom
          </h1>
          <p className="font-serif text-lg text-muted-foreground leading-relaxed">
            Setiap rancangan adalah manifestasi dari keindahan siluet keanggunan wanita, material kelas atas, dan sentuhan detail presisi dari penjahit berpengalaman kami. Pilih model dan konsultasikan impian busana Anda via WhatsApp.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-md mx-auto relative">
            <input
              type="text"
              value={state.searchQuery}
              onChange={(e) => service.onSearchChange(e.target.value)}
              placeholder="Cari model busana atau siluet..."
              className="w-full pl-10 pr-4 py-3 bg-muted/40 border border-border/80 font-serif text-base text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-colors"
            />
            <Icon icon="mdi:magnify" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-muted-foreground" />
            {state.searchQuery && (
              <button
                type="button"
                onClick={() => service.onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon icon="mdi:close" className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Tabs */}
        <div className="flex items-center justify-center overflow-x-auto pb-4 border-b border-border/60 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              type="button"
              onClick={() => service.onSelectCategory("")}
              className={`px-5 py-2.5 font-serif text-base tracking-wide transition-all ${
                state.selectedCategory === ""
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              Semua Karya
            </button>
            {state.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => service.onSelectCategory(String(cat.id))}
                className={`px-5 py-2.5 font-serif text-base tracking-wide transition-all whitespace-nowrap ${
                  state.selectedCategory === String(cat.id)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {cat.name}
                {typeof cat._count?.catalogItems === "number" && (
                  <span className="ml-2 text-xs opacity-75 font-mono">({cat._count.catalogItems})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        {state.isLoading ? (
          <div className="py-28 flex flex-col items-center justify-center space-y-4 text-muted-foreground">
            <Icon icon="mdi:loading" className="animate-spin text-4xl text-primary" />
            <p className="font-serif text-lg">Memuat koleksi portofolio...</p>
          </div>
        ) : state.items.length === 0 ? (
          <div className="py-28 text-center space-y-4 border border-border/60 bg-muted/10 max-w-2xl mx-auto p-12">
            <Icon icon="mdi:hanger" className="text-6xl mx-auto text-muted-foreground opacity-30" />
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Tidak Ada Karya Ditemukan
            </h3>
            <p className="font-serif text-base text-muted-foreground">
              {state.searchQuery || state.selectedCategory
                ? "Karya sesuai kriteria pencarian atau kategori ini belum tersedia. Silakan coba filter lainnya."
                : "Belum ada koleksi yang dipublikasikan saat ini."}
            </p>
            {(state.searchQuery || state.selectedCategory) && (
              <button
                type="button"
                onClick={() => {
                  service.onSelectCategory("");
                  service.onSearchChange("");
                }}
                className="mt-2 px-6 py-2.5 border border-foreground/80 font-serif text-sm uppercase tracking-widest text-foreground hover:bg-muted/30 transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {state.items.map((item) => {
              const primaryImg = item.images?.find((i) => i.isPrimary) || item.images?.[0];
              return (
                <Link
                  key={item.id}
                  href={`/katalog/${item.slug || item.id}`}
                  className="group flex flex-col space-y-4"
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

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between font-serif text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Icon icon="mdi:clock-outline" className="text-sm" />
                        <span>Estimasi: {item.estimatedTime || "3-4 Minggu"}</span>
                      </span>
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
      </div>
    </div>
  );
};

export default PublicCatalogSection;
