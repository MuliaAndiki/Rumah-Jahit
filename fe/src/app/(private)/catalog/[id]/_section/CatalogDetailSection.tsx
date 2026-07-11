"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Input } from "@/components/atoms";
import type { CatalogItemData, CategoryItem, CatalogImageItem } from "@/services/props.service";

interface CatalogDetailSectionProps {
  state: {
    item: CatalogItemData | null;
    categories: CategoryItem[];
    isLoading: boolean;
    isUploading: boolean;
    uploadProgressText: string;
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
    deleteImageId: string | null;
    setDeleteImageId: (id: string | null) => void;
    isPending: boolean;
  };
  service: {
    onUpdateMetadata: (e: React.FormEvent) => void;
    onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSetPrimary: (imageId: string) => void;
    onConfirmDeleteImage: () => void;
  };
}

const CatalogDetailSection: React.FC<CatalogDetailSectionProps> = ({ state, service }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
        <Icon icon="mdi:loading" className="animate-spin text-3xl text-primary" />
        <p className="text-sm font-medium">Memuat detail katalog...</p>
      </div>
    );
  }

  if (!state.item) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center space-y-4 text-center p-6">
        <Icon icon="mdi:alert-circle-outline" className="text-5xl text-destructive" />
        <h2 className="font-bold text-xl text-foreground">Item Katalog Tidak Ditemukan</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Item dengan ID yang dipilih mungkin telah dihapus atau URL tidak valid.
        </p>
        <Link href="/catalog">
          <Button className="rounded-xl font-bold mt-2">
            <Icon icon="mdi:arrow-left" className="mr-1.5" />
            Kembali ke Kelola Katalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/catalog" className="w-10 h-10 rounded-xl bg-muted border border-border/80 flex items-center justify-center text-foreground font-bold hover:bg-muted/80 transition-colors">
            <Icon icon="mdi:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="font-bold text-lg leading-tight text-foreground">{state.item.title}</h1>
            <p className="text-xs text-muted-foreground font-mono">ID: {state.item.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${state.item.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border border-amber-500/20"}`}>
            {state.item.isPublished ? "Publik" : "Draft"}
          </span>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata Edit Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2 border-b border-border/60 pb-3">
              <Icon icon="mdi:file-document-edit-outline" className="text-primary text-lg" />
              Detail & Informasi Busana
            </h3>

            <form onSubmit={service.onUpdateMetadata} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Busana</label>
                <Input
                  type="text"
                  required
                  value={state.formTitle}
                  onChange={(e) => state.setFormTitle(e.target.value)}
                  className="h-11 rounded-xl font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</label>
                <select
                  value={state.formCategoryId}
                  onChange={(e) => state.setFormCategoryId(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border/80 bg-background text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Tanpa Kategori</option>
                  {state.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Harga Mulai (Rp)</label>
                <Input
                  type="number"
                  placeholder="3500000"
                  value={state.formPriceStart}
                  onChange={(e) => state.setFormPriceStart(e.target.value)}
                  className="h-11 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimasi Waktu Pengerjaan</label>
                <Input
                  type="text"
                  placeholder="2 - 3 Minggu"
                  value={state.formEstimatedTime}
                  onChange={(e) => state.setFormEstimatedTime(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Deskripsi & Spesifikasi</label>
                <textarea
                  rows={4}
                  value={state.formDescription}
                  onChange={(e) => state.setFormDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border/80 bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-border/60">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={state.formIsPublished}
                    onChange={(e) => state.setFormIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Publikasikan ke Web Klien</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={state.formIsFeatured}
                    onChange={(e) => state.setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Tampilkan di Bagian Unggulan (Featured)</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={state.isPending}
                size="lg"
                className="w-full rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-11 mt-4 shadow-sm"
              >
                {state.isPending ? "Menyimpan Perubahan..." : "Simpan Perubahan Metadata"}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Direct Cloudinary Gallery Manager */}
        <div className="lg:col-span-2 space-y-6">
          {/* Direct Upload Dropzone */}
          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Icon icon="mdi:cloud-upload-outline" className="text-primary text-lg" />
                  Direct Cloudinary Image Upload
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Foto diunggah langsung dari browser ke Cloudinary tanpa membebani memori server.
                </p>
              </div>

              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={state.isUploading || state.isPending}
                className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Icon icon="mdi:folder-image" className="mr-1.5 text-lg" />
                Pilih & Unggah Foto
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={service.onFileSelected}
                className="hidden"
              />
            </div>

            {state.isUploading ? (
              <div className="p-8 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center space-y-3 text-center">
                <Icon icon="mdi:cloud-sync-outline" className="text-4xl text-primary animate-bounce" />
                <p className="font-bold text-sm text-foreground">{state.uploadProgressText || "Mengunggah gambar ke Cloudinary..."}</p>
                <p className="text-xs text-muted-foreground">Mohon tunggu hingga proses selesai...</p>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 rounded-xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center space-y-2 text-center cursor-pointer"
              >
                <Icon icon="mdi:image-plus" className="text-4xl text-muted-foreground" />
                <p className="font-bold text-sm text-foreground">Klik di sini untuk menambah foto hasil jahitan baru</p>
                <p className="text-xs text-muted-foreground">Format yang didukung: JPG, PNG, WEBP. Maksimal kualitas tinggi.</p>
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Icon icon="mdi:image-multiple-outline" className="text-primary text-lg" />
                Galeri Foto Produk ({state.item.images?.length || 0})
              </h3>
              <span className="text-xs text-muted-foreground font-medium">
                Klik ikon bintang untuk menjadikan foto utama.
              </span>
            </div>

            {!state.item.images || state.item.images.length === 0 ? (
              <div className="py-16 text-center space-y-2 text-muted-foreground">
                <Icon icon="mdi:image-off-outline" className="text-5xl mx-auto opacity-40" />
                <p className="font-semibold text-foreground">Belum Ada Foto Produk</p>
                <p className="text-xs">Silakan unggah foto pertama Anda melalui tombol di atas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {state.item.images.map((img) => (
                  <div
                    key={img.id}
                    className={`group relative rounded-2xl overflow-hidden border-2 transition-all bg-muted/30 ${img.isPrimary ? "border-primary ring-2 ring-primary/20 shadow-md" : "border-border/80 hover:border-primary/60"}`}
                  >
                    <div className="aspect-4/5 w-full bg-black/5 overflow-hidden">
                      <img
                        src={img.imageUrl}
                        alt="Galeri produk"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Top Badges & Actions */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      {img.isPrimary ? (
                        <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Icon icon="mdi:star" /> Utama
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => service.onSetPrimary(img.id)}
                          disabled={state.isPending}
                          className="px-2.5 py-1 rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold shadow-sm backdrop-blur-xs transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                        >
                          <Icon icon="mdi:star-outline" /> Jadikan Utama
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => state.setDeleteImageId(img.id)}
                        disabled={state.isPending}
                        className="w-8 h-8 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm backdrop-blur-xs transition-colors"
                        title="Hapus gambar"
                      >
                        <Icon icon="mdi:trash-can-outline" className="text-base" />
                      </button>
                    </div>

                    <div className="p-3 bg-background/90 backdrop-blur-xs border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>Order: #{img.displayOrder}</span>
                      <span className="truncate max-w-[120px]" title={img.cloudinaryPublicId}>{img.cloudinaryPublicId.split("/").pop()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Confirm Delete Image */}
      {state.deleteImageId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl border border-border/80 p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto text-2xl">
              <Icon icon="mdi:alert-circle-outline" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground">Hapus Foto Galeri?</h3>
              <p className="text-xs text-muted-foreground">
                Apakah Anda yakin ingin menghapus foto ini? File foto di Cloudinary dan referensi di database akan dihapus permanen.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => state.setDeleteImageId(null)}
                className="rounded-xl font-bold flex-1"
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={service.onConfirmDeleteImage}
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

export default CatalogDetailSection;
