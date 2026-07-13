import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Input } from "@/components/atoms";
import { AdminNavigationTabs } from "@/components/molecules/AdminNavigationTabs";
import type { CatalogItemData, CategoryItem } from "@/services/props.service";

interface CatalogSectionProps {
  state: {
    catalogItems: CatalogItemData[];
    categories: CategoryItem[];
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
    formTitle: string;
    setFormTitle: (val: string) => void;
    formDescription: string;
    setFormDescription: (val: string) => void;
    formPriceStart: string;
    setFormPriceStart: (val: string) => void;
    formEstimatedTime: string;
    setFormEstimatedTime: (val: string) => void;
    formCategoryId: string;
    setFormCategoryId: (val: string) => void;
    formIsFeatured: boolean;
    setFormIsFeatured: (val: boolean) => void;
    formIsPublished: boolean;
    setFormIsPublished: (val: boolean) => void;
    deleteTargetId: string | null;
    setDeleteTargetId: (id: string | null) => void;
    isPending: boolean;
  };
  service: {
    onOpenCreate: () => void;
    onSubmitCreate: (e: React.FormEvent) => void;
    onConfirmDelete: () => void;
  };
}

const CatalogSection: React.FC<CatalogSectionProps> = ({ state, service }) => {
  const filteredCatalog = state.catalogItems.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(state.searchQuery.toLowerCase()));
    const matchCategory = !state.selectedCategory || String(item.categoryId || "") === state.selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-linear-to-b bg-background pb-16">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Navigation Tabs */}
        <AdminNavigationTabs activeTab="catalog" />

        {/* Action & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Icon icon="mdi:magnify" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-lg" />
              <Input
                type="text"
                placeholder="Cari judul atau deskripsi..."
                value={state.searchQuery}
                onChange={(e) => state.setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-border/80 bg-background"
              />
            </div>

            <select
              value={state.selectedCategory}
              onChange={(e) => state.setSelectedCategory(e.target.value)}
              className="h-11 px-4 rounded-xl border border-border/80 bg-background text-sm font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Semua Kategori</option>
              {state.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Button size="lg" onClick={service.onOpenCreate} className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-11 shadow-sm">
            <Icon icon="mdi:plus" className="mr-1.5 text-xl" />
            Tambah Item Katalog
          </Button>
        </div>

        {/* Catalog Table/Grid */}
        <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
          {state.isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
              <Icon icon="mdi:loading" className="animate-spin text-3xl text-primary" />
              <p className="text-sm font-medium">Memuat data katalog...</p>
            </div>
          ) : filteredCatalog.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-muted-foreground">
              <Icon icon="mdi:hanger" className="text-4xl mx-auto opacity-50" />
              <p className="font-semibold text-foreground">Tidak ada item katalog ditemukan</p>
              <p className="text-xs">Silakan buat item baru atau ganti filter pencarian.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-xs font-bold uppercase text-muted-foreground">
                    <th className="py-3 px-4">Gambar</th>
                    <th className="py-3 px-4">Judul Busana</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Harga Mulai</th>
                    <th className="py-3 px-4">Estimasi Waktu</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi & Galeri</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-sm">
                  {filteredCatalog.map((item) => {
                    const primaryImg = item.images?.find((i) => i.isPrimary) || item.images?.[0];
                    return (
                      <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-xl bg-muted border border-border/60 overflow-hidden flex items-center justify-center">
                            {primaryImg ? (
                              <img src={primaryImg.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <Icon icon="mdi:image-outline" className="text-xl text-muted-foreground" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-foreground">
                          <div>
                            <p>{item.title}</p>
                            <p className="text-xs font-mono text-muted-foreground">{item.slug}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-muted text-xs font-medium">
                            {item.category?.name || "Tanpa Kategori"}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs font-semibold">
                          {item.priceStart ? `Rp ${Number(item.priceStart).toLocaleString("id-ID")}` : "-"}
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{item.estimatedTime || "-"}</td>
                        <td className="py-3 px-4 space-x-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border border-amber-500/20"}`}>
                            {item.isPublished ? "Publik" : "Draft"}
                          </span>
                          {item.isFeatured && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                              ★ Featured
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Link
                            href={`/catalog/${item.id}`}
                            className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xs transition-colors inline-flex items-center gap-1"
                          >
                            <Icon icon="mdi:folder-image" />
                            Kelola & Galeri ({item.images?.length || 0})
                          </Link>
                          <button
                            type="button"
                            onClick={() => state.setDeleteTargetId(item.id)}
                            className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold text-xs transition-colors inline-flex items-center gap-1"
                          >
                            <Icon icon="mdi:trash-can-outline" />
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Create Catalog Item */}
      {state.isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl border border-border/80 p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-lg text-foreground">Tambah Item Katalog Baru</h3>
              <button
                type="button"
                onClick={() => state.setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>

            <form onSubmit={service.onSubmitCreate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Busana</label>
                <Input
                  type="text"
                  required
                  placeholder="Contoh: Kebaya Pengantin Modern Eksklusif"
                  value={state.formTitle}
                  onChange={(e) => state.setFormTitle(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</label>
                <select
                  value={state.formCategoryId}
                  onChange={(e) => state.setFormCategoryId(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border/80 bg-background text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Pilih Kategori (Opsional)</option>
                  {state.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Harga Mulai (Rp)</label>
                  <Input
                    type="number"
                    placeholder="3500000"
                    value={state.formPriceStart}
                    onChange={(e) => state.setFormPriceStart(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimasi Waktu</label>
                  <Input
                    type="text"
                    placeholder="2 - 3 Minggu"
                    value={state.formEstimatedTime}
                    onChange={(e) => state.setFormEstimatedTime(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Deskripsi & Detail Jahitan</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan detail jahitan, jenis kain, dan spesifikasi pesanan..."
                  value={state.formDescription}
                  onChange={(e) => state.setFormDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border/80 bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-border/60">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={state.formIsPublished}
                    onChange={(e) => state.setFormIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Publikasikan (Aktif)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={state.formIsFeatured}
                    onChange={(e) => state.setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Jadikan Unggulan (Featured)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => state.setIsModalOpen(false)}
                  className="rounded-xl font-bold"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={state.isPending}
                  className="rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {state.isPending ? "Menyimpan..." : "Buat Item & Kelola Galeri"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirm Delete */}
      {state.deleteTargetId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl border border-border/80 p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto text-2xl">
              <Icon icon="mdi:alert-circle-outline" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground">Hapus Item Katalog?</h3>
              <p className="text-xs text-muted-foreground">
                Apakah Anda yakin ingin menghapus item ini? Semua foto di Cloudinary dan data galeri yang terkait akan dihapus permanen.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => state.setDeleteTargetId(null)}
                className="rounded-xl font-bold flex-1"
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={service.onConfirmDelete}
                disabled={state.isPending}
                className="rounded-xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 flex-1"
              >
                {state.isPending ? "Menghapus..." : "Ya, Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogSection;
