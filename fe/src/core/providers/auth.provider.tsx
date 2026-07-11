'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { setCurrentUser } from '@/stores/authSlice/authSlice';
import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!currentUser?.user?.token) {
      const token = getCookie(APP_SESSION_COOKIE_KEY);
      if (token) {
        dispatch(setCurrentUser({ user: { token } } as any));
      }
    }
  }, [currentUser, dispatch]);

  React.useEffect(() => {
    const isPrivateRoute =
      pathname?.startsWith('/dashboard') ||
      pathname?.startsWith('/categories') ||
      pathname?.startsWith('/catalog') ||
      pathname?.startsWith('/settings');

    const isAuthPage =
      pathname?.startsWith('/login') ||
      pathname?.startsWith('/register');

    const isAuthenticated = Boolean(currentUser?.user?.token);

    if (!isAuthenticated && isPrivateRoute) {
      router.replace('/login');
      return;
    }

    if (isAuthenticated && isAuthPage) {
      router.replace('/dashboard');
      return;
    }
  }, [pathname, currentUser, router]);

  return <>{children}</>;
}
