'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { cn } from '@/utils/classname';

import { PickResponeGetMe } from '@/types/res/auth.respone';
import { Skeleton } from '@/components/atoms/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import {
  SIDEBAR_CONTENT_TRANSITION,
  SIDEBAR_WIDTH_TRANSITION,
  getSidebarLabelVisibility,
} from '@/core/layouts/sidebar.layout';

interface TopbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  getMe: PickResponeGetMe;
  isLoading: boolean;
  title: string;
  subtitle: string;
  notificationHref: string;
  profileHref: string;
  sidebarOpenWidth: string;
  sidebarClosedWidth: string;
}

export function Topbar({
  isOpen,
  toggleSidebar,
  getMe,
  isLoading,
  title,
  subtitle,
  notificationHref,
  profileHref,
  sidebarOpenWidth,
  sidebarClosedWidth,
}: TopbarProps) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex h-16 w-full border-b border-border bg-linear-to-r from-background via-background/80 to-background/20 lg:h-20">
      <div
        className={cn(
          'flex items-center border-r border-border p-3 lg:p-5 overflow-hidden',
          SIDEBAR_WIDTH_TRANSITION,
          isOpen
            ? cn(sidebarOpenWidth, 'justify-between')
            : cn(sidebarClosedWidth, 'justify-center lg:justify-end')
        )}
      >
        <div
          className={cn(
            'h-24 w-24 shrink-0',
            SIDEBAR_CONTENT_TRANSITION,
            getSidebarLabelVisibility(isOpen)
          )}
        >
          {/* <Title /> */}
          Rumah Jahit
        </div>
        <button onClick={toggleSidebar} aria-label="Toggle sidebar" className="p-3 block  ">
          <Menu
            className={cn(
              'w-6 h-6 lg:w-7 lg:h-7  text-muted-foreground transition-transform duration-300 ease-in-out',
              !isOpen && 'rotate-180'
            )}
          />
        </button>
      </div>

      <div className="flex h-full min-w-0 flex-1 items-center justify-between gap-2 px-3 lg:gap-4 lg:px-5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground lg:text-base">{title}</p>
          <p className="truncate text-[11px] text-muted-foreground lg:text-xs">
            {subtitle || currentDate || 'Memuat tanggal...'}
          </p>
        </div>

        <button className="relative inline-flex items-center justify-center rounded-full border border-border bg-white p-2 text-muted-foreground transition hover:bg-muted">
          <Link href={notificationHref}>
            <Bell className="w-5 h-5" />
          </Link>
        </button>

        <Link
          href={profileHref}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary lg:h-12 lg:w-12"
        >
          {getMe?.avaUrl ? (
            <Image
              src={getMe.avaUrl}
              alt="Avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{getMe?.username?.charAt(0)}</span>
          )}
        </Link>
      </div>
    </div>
  );
}
