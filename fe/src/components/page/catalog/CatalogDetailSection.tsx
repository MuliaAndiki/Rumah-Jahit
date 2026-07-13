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
    onUploadPanelImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUploadOtherImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSetPrimary: (imageId: string) => void;
    onConfirmDeleteImage: () => void;
  };
}

const CatalogDetailSection: React.FC<CatalogDetailSectionProps> = ({ state, service }) => {
  const panelInputRef = React.useRef<HTMLInputElement | null>(null);
  const otherInputRef = React.useRef<HTMLInputElement | null>(null);

  const primaryImg = state.item?.images?.find((i) => i.isPrimary) || null;
  const otherImages = state.item?.images?.filter((i) => !i.isPrimary) || [];

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-3 text-muted-foreground">
        <Icon icon="mdi:loading" className="animate-spin text-3xl text-primary" />
        <p className="text-sm font-medium">Memuat detail katalog...</p>
      </div>
    );
  }

  if (!state.item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4 text-center p-6">
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
    <div className="min-h-screen bg-background pb-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
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
      </div>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-6 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                {state.isPending ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Divided Gallery Manager (Panel & Detail Photos) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Box 1: Foto Panel Utama (Sampul Katalog) */}
          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Tahap 1 &bull; Wajah Katalog Depan</span>
                <h3 className="font-bold text-base flex items-center gap-2 mt-0.5 text-foreground">
                  <Icon icon="mdi:image-frame" className="text-primary text-lg" />
                  Foto Panel Utama (1 Foto Sampul)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Foto tunggal yang muncul di daftar katalog depan (`/katalog`). Hanya ada 1 foto utama.
                </p>
              </div>

              <Button
                type="button"
                onClick={() => panelInputRef.current?.click()}
                disabled={state.isUploading || state.isPending}
                className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-xs"
              >
                <Icon icon="mdi:camera-plus" className="mr-1.5 text-lg" />
                {primaryImg ? "Ganti Foto Panel" : "Unggah Foto Panel"}
              </Button>
              <input
                ref={panelInputRef}
                type="file"
                accept="image/*"
                onChange={service.onUploadPanelImage}
                className="hidden"
              />
            </div>

            {state.isUploading ? (
              <div className="p-8 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center space-y-3 text-center">
                <Icon icon="mdi:cloud-sync-outline" className="text-4xl text-primary animate-bounce" />
                <p className="font-bold text-sm text-foreground">{state.uploadProgressText || "Mengunggah gambar ke Cloudinary..."}</p>
                <p className="text-xs text-muted-foreground">Mohon tunggu hingga proses selesai...</p>
              </div>
            ) : primaryImg ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center bg-muted/20 p-4 rounded-xl border border-border/60">
                <div className="sm:col-span-1 aspect-4/5 w-full max-w-[180px] mx-auto rounded-xl overflow-hidden border-2 border-primary ring-2 ring-primary/20 relative shadow-md bg-black/5">
                  <img
                    src={primaryImg.imageUrl}
                    alt="Panel Utama"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider shadow-xs">
                    Panel Depan
                  </span>
                </div>
                <div className="sm:col-span-2 space-y-3 text-left">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-foreground">Foto Panel Utama Aktif</h4>
                    <p className="text-xs text-muted-foreground">
                      Foto ini saat ini menjadi representasi visual utama pada halaman public lookbook.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background border border-border/60 font-mono text-xs text-muted-foreground break-all">
                    Public ID: {primaryImg.cloudinaryPublicId}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => panelInputRef.current?.click()}
                      disabled={state.isPending}
                      className="rounded-xl font-bold text-xs"
                    >
                      <Icon icon="mdi:refresh" className="mr-1 text-base" />
                      Ganti Foto Panel
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => state.setDeleteImageId(primaryImg.id)}
                      disabled={state.isPending}
                      className="rounded-xl font-bold text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
                    >
                      <Icon icon="mdi:trash-can-outline" className="mr-1 text-base" />
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !state.isUploading && panelInputRef.current?.click()}
                className="p-8 rounded-xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center space-y-2 text-center cursor-pointer"
              >
                <Icon icon="mdi:image-frame" className="text-4xl text-muted-foreground" />
                <p className="font-bold text-sm text-foreground">Belum Ada Foto Panel Utama</p>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Klik di sini untuk mengunggah 1 foto utama (sampul) hasil jahitan busana ini.
                </p>
              </div>
            )}
          </div>

          {/* Box 2: Foto Detail Lainnya (Galeri 3 - 5 Foto dari Segala Arah) */}
          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tahap 2 &bull; Detail Segala Arah</span>
                <h3 className="font-bold text-base flex items-center gap-2 mt-0.5 text-foreground">
                  <Icon icon="mdi:camera-burst" className="text-primary text-lg" />
                  Foto Detail Lainnya ({otherImages.length} Foto)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Foto tambahan (3 - 5 foto dari sudut kiri, kanan, belakang, atau zoom) yang muncul saat klien membuka detail (`/katalog/[slug]`).
                </p>
              </div>

              <Button
                type="button"
                onClick={() => otherInputRef.current?.click()}
                disabled={state.isUploading || state.isPending}
                className="rounded-xl font-bold bg-muted hover:bg-muted/80 text-foreground border border-border/80 shrink-0 shadow-xs"
              >
                <Icon icon="mdi:image-multiple-outline" className="mr-1.5 text-lg text-primary" />
                Unggah Foto Tambahan
              </Button>
              <input
                ref={otherInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={service.onUploadOtherImages}
                className="hidden"
              />
            </div>

            {otherImages.length === 0 ? (
              <div
                onClick={() => !state.isUploading && otherInputRef.current?.click()}
                className="py-14 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/40 bg-muted/10 hover:bg-muted/20 transition-colors flex flex-col items-center justify-center space-y-2 text-center cursor-pointer"
              >
                <Icon icon="mdi:image-plus" className="text-4xl text-muted-foreground opacity-60" />
                <p className="font-bold text-sm text-foreground">Belum Ada Foto Detail Tambahan</p>
                <p className="text-xs text-muted-foreground max-w-md">
                  Unggah 3 - 5 foto dari berbagai sudut (tampak samping, belakang, atau zoom jahitan/kain) untuk memberikan gambaran lengkap kepada klien.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {otherImages.map((img, index) => (
                  <div
                    key={img.id}
                    className="group relative rounded-2xl overflow-hidden border border-border/80 hover:border-primary/60 transition-all bg-muted/30 flex flex-col"
                  >
                    <div className="aspect-4/5 w-full bg-black/5 overflow-hidden relative">
                      <img
                        src={img.imageUrl}
                        alt={`Detail ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-background/90 backdrop-blur-xs border border-border/60 font-mono text-[11px] font-bold text-foreground">
                        Foto #{index + 1}
                      </div>

                      {/* Hover Action Buttons */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => service.onSetPrimary(img.id)}
                          disabled={state.isPending}
                          className="px-2.5 py-1 rounded-full bg-background/95 hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold shadow-sm backdrop-blur-xs transition-colors flex items-center gap-1"
                          title="Jadikan sebagai Foto Panel Utama"
                        >
                          <Icon icon="mdi:star-outline" className="text-sm" /> Jadikan Panel
                        </button>
                        <button
                          type="button"
                          onClick={() => state.setDeleteImageId(img.id)}
                          disabled={state.isPending}
                          className="w-7 h-7 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm backdrop-blur-xs transition-colors"
                          title="Hapus gambar"
                        >
                          <Icon icon="mdi:trash-can-outline" className="text-sm" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-background/90 backdrop-blur-xs border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground mt-auto">
                      <span>Order: #{img.displayOrder}</span>
                      <span className="truncate max-w-[120px]" title={img.cloudinaryPublicId}>
                        {img.cloudinaryPublicId.split("/").pop()}
                      </span>
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
