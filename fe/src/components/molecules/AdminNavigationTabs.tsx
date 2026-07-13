import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface AdminNavigationTabsProps {
  activeTab?: "dashboard" | "categories" | "catalog";
}

export const AdminNavigationTabs: React.FC<AdminNavigationTabsProps> = ({ activeTab }) => {
  const tabs = [
    {
      id: "dashboard",
      href: "/dashboard",
      label: "Ringkasan",
      icon: "mdi:view-dashboard-outline",
    },
    {
      id: "categories",
      href: "/categories",
      label: "Kelola Kategori",
      icon: "mdi:tag-multiple-outline",
    },
    {
      id: "catalog",
      href: "/catalog",
      label: "Kelola Katalog",
      icon: "mdi:hanger",
    },
  ] as const;

  return (
    <div className="flex items-center gap-2 border-b border-border/60 pb-4 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors shrink-0 ${
              isActive
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "bg-muted/40 hover:bg-muted/80 text-foreground font-semibold"
            }`}
          >
            <Icon
              icon={tab.icon}
              className={`text-lg ${isActive ? "" : "text-muted-foreground"}`}
            />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminNavigationTabs;
