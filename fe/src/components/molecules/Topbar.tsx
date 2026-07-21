'use client';

import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect,useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Skeleton } from '@/components/atoms/skeleton';
import { PickResponeGetMe } from '@/types/res/auth.respone';
import { cn } from '@/utils/classname';

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
  onLogout?: () => void;
}

export function Topbar({
  getMe,
  isLoading,
  title,
  subtitle,
  notificationHref,
  profileHref,
  onLogout,
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
     

      <div className="flex h-full min-w-0 flex-1 items-center justify-between gap-2 px-3 lg:gap-4 lg:px-5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground lg:text-base">{title}</p>
          <p className="truncate text-[11px] text-muted-foreground lg:text-xs">
            {subtitle || currentDate || 'Memuat tanggal...'}
          </p>
        </div>

        <button className="relative inline-flex items-center justify-center rounded-full border border-border bg-card  p-2 text-muted-foreground transition hover:bg-muted">
          <Link href={notificationHref}>
            <Bell className="w-5 h-5" />
          </Link>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary lg:h-12 lg:w-12 outline-none">
            {getMe?.avaUrl ? (
              <Image
                src={getMe.avaUrl ? '/avatars/2.png': "/avatars/2.png"}
                alt="Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>{getMe?.name?.charAt(0)}</span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={profileHref} className="cursor-pointer w-full">
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
