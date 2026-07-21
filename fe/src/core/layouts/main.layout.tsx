'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Topbar } from '@/components/molecules/Topbar';
import { useApi } from '@/hooks/useApi';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { unwrapResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { PickResponeGetMe } from '@/types/res/auth.respone';

import { Sidebar } from './sidebar.component/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const api = useApi();
  const useGetMe = api.auth.query.me;
  const getMeData = unwrapResponse(useGetMe as any) as PickResponeGetMe | undefined;
  const pathname = usePathname();
  const toggleSidebar = () => setIsOpen(!isOpen);

  const logoutMutate = api.auth.mutate.logout;

  const getPageHeader = (path: string) => {
    if (path.includes('/dashboard')) return { title: 'Dashboard', subtitle: 'Panel Kendali Utama & Ikhtisar Rumah Jahit' };
    if (path.includes('/catalog')) return { title: 'Katalog', subtitle: 'Manajemen Koleksi & Busana Wanita Custom' };
    if (path.includes('/settings')) return { title: 'Pengaturan', subtitle: 'Konfigurasi Profil & Preferensi Sistem' };
    return { title: 'Admin Panel', subtitle: 'Rumah Jahit Khusus Wanita' };
  };
  const pageHeader = getPageHeader(pathname);

  const ns = useAppNameSpace();

  function handleLogout() {
    logoutMutate.mutate();
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-foreground relative">
      <Topbar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        getMe={getMeData ?? ({} as PickResponeGetMe)}
        isLoading={useGetMe.isLoading}
        title={pageHeader.title}
        subtitle={pageHeader.subtitle}
        // setting disini
        notificationHref={'/'}
        profileHref={'/profile'}
        sidebarOpenWidth={'w-64'}
        sidebarClosedWidth={'w-14 lg:w-24'}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 pt-16 lg:pt-20">
        <Sidebar
          isOpen={isOpen}
          isPending={logoutMutate.isPending}
          onLogout={handleLogout}
          getme={getMeData ?? ({} as PickResponeGetMe)}
          isLoading={useGetMe.isLoading}
        />

        <main className="flex-1 w-full min-w-0 pb-20 md:pb-0 overflow-x-hidden  bg-linear-to-b from-primary via-primary/30 to-primary/5 ">
          {children}
        </main>
      </div>
    </div>
  );
}
