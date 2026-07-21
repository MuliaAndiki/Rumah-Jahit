'use client';

import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Cek token langsung dari cookie
    const token = getCookie(APP_SESSION_COOKIE_KEY);
    setIsAuthenticated(Boolean(token));
  }, [pathname]); // Re-evaluasi tiap ada perubahan rute

  useEffect(() => {
    // Jangan jalankan logika redirect jika pengecekan awal auth belum selesai
    if (isAuthenticated === null) return;

    // 1. Definisikan halaman public
    const isPublicRoute =
      pathname === '/' ||
      pathname?.startsWith('/home') ||
      pathname?.startsWith('/faq') ||
      pathname?.startsWith('/katalog') ||
      pathname?.startsWith('/layanan-dan-proses') ||
      pathname?.startsWith('/lokasi-dan-kontak') ||
      pathname?.startsWith('/tentang-kami');

    // 2. Definisikan halaman privat
    const isPrivateRoute =
      pathname?.startsWith('/dashboard') ||
      pathname?.startsWith('/categories') ||
      pathname?.startsWith('/catalog') ||
      pathname?.startsWith('/settings');

    // 3. Definisikan halaman auth
    const isAuthPage =
      pathname?.startsWith('/login') ||
      pathname?.startsWith('/register');

    // Rules Navigasi:
    
    // Jika mengakses halaman auth tapi sudah login -> ke dashboard
    if (isAuthenticated && isAuthPage) {
      router.replace('/dashboard');
      return;
    }

    // Jika mengakses halaman privat tapi belum login -> ke login
    if (!isAuthenticated && isPrivateRoute) {
      router.replace('/login');
      return;
    }

    // Jika halaman public, biarkan akses masuk (tidak ada redirect)
    if (isPublicRoute) {
      return;
    }

  }, [pathname, isAuthenticated, router]);

  return <>{children}</>;
}
