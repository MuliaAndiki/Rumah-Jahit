import * as React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/components/atoms';
import { AdminNavigationTabs } from '@/components/molecules/AdminNavigationTabs';
import type { CatalogItemData, CategoryItem } from '@/services/props.service';

interface DashboardSectionProps {
  state: {
    user: any;
    categories: CategoryItem[];
    catalogItems: CatalogItemData[];
    isLoading: boolean;
  };
  service: {
    onLogout: () => void;
  };
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ state, service }) => {
  const totalCategories = state.categories.length;
  const totalCatalog = state.catalogItems.length;
  const totalPublished = state.catalogItems.filter((i) => i.isPublished).length;
  const totalFeatured = state.catalogItems.filter((i) => i.isFeatured).length;

  return (
    <div className="min-h-screen bg-linear-to-b from-background /5 via-background to-background pb-16">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Navigation Tabs */}
        <AdminNavigationTabs activeTab="dashboard" />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Total Kategori
              </p>
              <p className="text-3xl font-black text-foreground">
                {state.isLoading ? '...' : totalCategories}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl">
              <Icon icon="mdi:tag-multiple-outline" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Total Item Katalog
              </p>
              <p className="text-3xl font-black text-foreground">
                {state.isLoading ? '...' : totalCatalog}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
              <Icon icon="mdi:hanger" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Publik / Aktif
              </p>
              <p className="text-3xl font-black text-emerald-600">
                {state.isLoading ? '...' : totalPublished}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-2xl">
              <Icon icon="mdi:check-circle-outline" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Item Unggulan (Featured)
              </p>
              <p className="text-3xl font-black text-amber-500">
                {state.isLoading ? '...' : totalFeatured}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl">
              <Icon icon="mdi:star-outline" />
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-linear-to-br from-primary/10 via-background to-background border border-border/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                Kategori
              </span>
              <h3 className="text-lg font-bold mt-2">Atur Kategori Busana</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tambahkan kategori seperti Kebaya, Jas Formal, Gaun Pengantin, atau Seragam Kerja.
              </p>
            </div>
            <Link href="/categories">
              <Button size="lg" className="w-full rounded-xl font-bold">
                <Icon icon="mdi:plus-circle-outline" className="mr-2 text-lg" />
                Buka Manajemen Kategori
              </Button>
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-linear-to-br from-blue-500/10 via-background to-background border border-border/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Katalog Bespoke
              </span>
              <h3 className="text-lg font-bold mt-2">Kelola Katalog & Galeri</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Unggah foto hasil jahitan, tentukan harga estimasi, dan waktu pengerjaan secara
                langsung ke Cloudinary.
              </p>
            </div>
            <Link href="/catalog">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-xl font-bold border-blue-500/30 text-blue-600 hover:bg-blue-500/10"
              >
                <Icon icon="mdi:hanger" className="mr-2 text-lg" />
                Buka Manajemen Katalog
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Items Preview Table */}
        <div className="p-6 rounded-2xl bg-background border border-border/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Icon icon="mdi:clock-time-eight-outline" className="text-primary text-lg" />
              Katalog Terbaru
            </h3>
            <Link href="/catalog" className="text-xs font-bold text-primary hover:underline">
              Lihat Semua ({totalCatalog}) &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-xs font-bold uppercase text-muted-foreground">
                  <th className="py-3 px-4">Judul</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga Mulai</th>
                  <th className="py-3 px-4">Waktu Pengerjaan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm">
                {state.catalogItems.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground">{item.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-xs font-medium">
                        {item.category?.name || 'Tanpa Kategori'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      {item.priceStart
                        ? `Rp ${Number(item.priceStart).toLocaleString('id-ID')}`
                        : '-'}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {item.estimatedTime || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.isPublished ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}
                      >
                        {item.isPublished ? 'Publik' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/catalog/${item.id}`}
                        className="px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xs transition-colors"
                      >
                        Kelola &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
                {state.catalogItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
                      Belum ada item katalog yang ditambahkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSection;
