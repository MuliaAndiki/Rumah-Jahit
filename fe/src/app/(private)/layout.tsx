"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import ThemeToggle from "@/core/components/theme-toggle";
import PrivateProviders from "@/core/providers/private.provider";

const adminNavItems = [
  { label: "Ringkasan", href: "/dashboard", icon: "mdi:view-dashboard-outline" },
  { label: "Kategori", href: "/categories", icon: "mdi:folder-outline" },
  { label: "Katalog", href: "/catalog", icon: "mdi:hanger" },
  { label: "Pengaturan", href: "/settings", icon: "mdi:cog-outline" },
];

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <PrivateProviders>
      <div className="min-h-screen flex bg-background text-foreground">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border flex flex-col justify-between shrink-0">
          <div>
            {/* Logo / Brand */}
            <div className="h-20 flex items-center px-6 border-b border-border">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-lg tracking-wider">
                  RJ
                </div>
                <div>
                  <h1 className="font-serif font-bold text-lg leading-tight tracking-wide text-foreground">
                    Rumah Jahit
                  </h1>
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
                    Atelier Admin
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1.5">
              {adminNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <Icon icon={item.icon} className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Sidebar / Action */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
            >
              <Icon icon="mdi:open-in-new" className="w-4 h-4" />
              <span>Lihat Website</span>
            </Link>
            <ThemeToggle />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          <div className="w-full px-8 py-10">
            {children}
          </div>
        </main>
      </div>
    </PrivateProviders>
  );
}
