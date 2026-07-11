"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import ThemeToggle from "@/core/components/theme-toggle";

const adminNavItems = [
  { label: "Ringkasan", href: "/dashboard", icon: "mdi:view-dashboard-outline" },
  { label: "Kategori", href: "/categories", icon: "mdi:folder-outline" },
  { label: "Katalog", href: "/catalog", icon: "mdi:hanger" },
  { label: "Pengaturan", href: "/settings", icon: "mdi:cog-outline" },
];

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-card border-r border-border/80 flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Brand */}
          <div className="px-6 py-6 border-b border-border/60">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-primary text-primary-foreground font-black text-sm flex items-center justify-center tracking-widest">
                RJ
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-normal tracking-wide text-foreground group-hover:opacity-80 transition-opacity">
                  RUMAH JAHIT
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-sans">
                  Admin Studio
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6 space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 font-serif text-base transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <Icon icon={item.icon} className="text-xl" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="px-6 py-6 border-t border-border/60 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Icon icon="mdi:arrow-left" className="text-sm" />
            <span>Ke Lookbook Publik</span>
          </Link>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
