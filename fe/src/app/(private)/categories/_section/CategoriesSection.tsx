"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Input } from "@/components/atoms";
import type { CategoryItem } from "@/services/props.service";

interface CategoriesSectionProps {
  state: {
    categories: CategoryItem[];
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
    editingCategory: CategoryItem | null;
    formName: string;
    setFormName: (val: string) => void;
    formSlug: string;
    setFormSlug: (val: string) => void;
    deleteTargetId: number | null;
    setDeleteTargetId: (id: number | null) => void;
    isPending: boolean;
  };
  service: {
    onOpenCreate: () => void;
    onOpenEdit: (item: CategoryItem) => void;
    onSubmitForm: (e: React.FormEvent) => void;
    onConfirmDelete: () => void;
  };
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ state, service }) => {
  const filteredCategories = state.categories.filter((c) =>
    c.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-sm hover:opacity-90">
            RJ
          </Link>
          <div>
            <h1 className="font-bold text-lg leading-tight text-foreground">Kelola Kategori Busana</h1>
            <p className="text-xs text-muted-foreground">Daftar kategori produk Rumah Jahit</p>
          </div>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="rounded-xl font-bold">
            <Icon icon="mdi:arrow-left" className="mr-1.5 text-base" />
            Kembali ke Ringkasan
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-4">
          <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-muted/40 hover:bg-muted/80 text-foreground font-semibold text-sm flex items-center gap-2 transition-colors">
            <Icon icon="mdi:view-dashboard-outline" className="text-lg text-muted-foreground" />
            Ringkasan
          </Link>
          <Link href="/categories" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-sm flex items-center gap-2">
            <Icon icon="mdi:tag-multiple-outline" className="text-lg" />
            Kelola Kategori
          </Link>
          <Link href="/catalog" className="px-4 py-2 rounded-xl bg-muted/40 hover:bg-muted/80 text-foreground font-semibold text-sm flex items-center gap-2 transition-colors">
            <Icon icon="mdi:hanger" className="text-lg text-muted-foreground" />
            Kelola Katalog
          </Link>
        </div>

        {/* Action & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Icon icon="mdi:magnify" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-lg" />
            <Input
              type="text"
              placeholder="Cari nama atau slug kategori..."
              value={state.searchQuery}
              onChange={(e) => state.setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border-border/80 bg-background"
            />
          </div>

          <Button size="lg" onClick={service.onOpenCreate} className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-11 shadow-sm">
            <Icon icon="mdi:plus" className="mr-1.5 text-xl" />
            Tambah Kategori Baru
          </Button>
        </div>

        {/* Categories Table/List */}
        <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
          {state.isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
              <Icon icon="mdi:loading" className="animate-spin text-3xl text-primary" />
              <p className="text-sm font-medium">Memuat data kategori...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-muted-foreground">
              <Icon icon="mdi:tag-off-outline" className="text-4xl mx-auto opacity-50" />
              <p className="font-semibold text-foreground">Tidak ada kategori ditemukan</p>
              <p className="text-xs">Silakan tambahkan kategori baru atau ubah kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-xs font-bold uppercase text-muted-foreground">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Nama Kategori</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4">Jumlah Item</th>
                    <th className="py-3 px-4">Dibuat Pada</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-sm">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-muted-foreground">#{cat.id}</td>
                      <td className="py-3 px-4 font-bold text-foreground">{cat.name}</td>
                      <td className="py-3 px-4 font-mono text-xs text-primary bg-primary/5 px-2 py-1 rounded w-fit">{cat.slug}</td>
                      <td className="py-3 px-4 font-semibold">
                        {cat._count?.catalogItems !== undefined ? `${cat._count.catalogItems} item` : "-"}
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => service.onOpenEdit(cat)}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white font-bold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Icon icon="mdi:pencil-outline" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => state.setDeleteTargetId(cat.id)}
                          className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Icon icon="mdi:trash-can-outline" />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Add / Edit */}
      {state.isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl border border-border/80 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-lg text-foreground">
                {state.editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
              </h3>
              <button
                type="button"
                onClick={() => state.setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>

            <form onSubmit={service.onSubmitForm} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Nama Kategori</label>
                <Input
                  type="text"
                  required
                  placeholder="Contoh: Kebaya Pengantin"
                  value={state.formName}
                  onChange={(e) => {
                    const val = e.target.value;
                    state.setFormName(val);
                    if (!state.editingCategory) {
                      state.setFormSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
                    }
                  }}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (URL Identifer)</label>
                <Input
                  type="text"
                  required
                  placeholder="kebaya-pengantin"
                  value={state.formSlug}
                  onChange={(e) => state.setFormSlug(e.target.value)}
                  className="h-11 rounded-xl font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Digunakan untuk URL katalog produk pada tampilan web.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
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
                  {state.isPending ? "Menyimpan..." : state.editingCategory ? "Simpan Perubahan" : "Buat Kategori"}
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
              <h3 className="font-bold text-lg text-foreground">Hapus Kategori?</h3>
              <p className="text-xs text-muted-foreground">
                Apakah Anda yakin ingin menghapus kategori ini? Item katalog yang terkait dengan kategori ini akan di-set ke null.
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

export default CategoriesSection;
