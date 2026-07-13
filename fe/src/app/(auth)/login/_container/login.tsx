"use client";

import * as React from "react";
import { saveTokens } from "@/server/auth-cookies";
import { savePwaAuthSession } from "@/utils/pwa-auth.storage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import LoginSection from "@/components/page/auth/LoginSection";
import {
  loginSchema,
  type LoginFormValues,
} from "@/schemas/auth.schema";
import type { AuthMode } from "@/types";
import {
  getSavedAccounts,
  saveAccountToStorage,
  type SavedLoginAccount,
} from "@/utils/saved-login.storage";

export default function LoginContainer() {
  const router = useRouter();
  const api = useApi();

  const [isAuth, setIsAuth] = React.useState<AuthMode>("login");
  const [savedAccounts, setSavedAccounts] = React.useState<SavedLoginAccount[]>([]);
  const [selectedSavedUsername, setSelectedSavedUsername] = React.useState<string | null>(null);
  const [loginEntryMode, setLoginEntryMode] = React.useState<"picker" | "selected" | "manual">("manual");
  const [isSavedAccountsReady, setIsSavedAccountsReady] = React.useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

 
  React.useEffect(() => {
    const accounts = getSavedAccounts();
    setSavedAccounts(accounts);
    setIsSavedAccountsReady(true);
    if (accounts.length > 0) {
      setLoginEntryMode("picker");
    } else {
      setLoginEntryMode("manual");
    }
  }, []);

  const handleLogin = (values: LoginFormValues) => {
    api.auth.login.mutate(
      {
        email: values.username,
        password: values.password,
      },
      {
        onSuccess: async (res) => {
          if (res.data?.token) {
            const accessToken = res.data.token;
            const refreshToken = res.data.refreshToken || res.data.token;
            const role = res.data.user?.role || "ADMIN";
            try {
              await saveTokens({ accessToken, refreshToken, role });
            } catch (e) {
              console.error("Gagal menyimpan cookies login di container:", e);
            }
            if (typeof window !== "undefined") {
              localStorage.setItem("token", accessToken);
              document.cookie = `rjahit_session=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
              document.cookie = `rjahit_refres=${refreshToken}; path=/; max-age=2592000; SameSite=Lax`;
              if (role) document.cookie = `rjahit_role=${role}; path=/; max-age=2592000; SameSite=Lax`;
            }
            savePwaAuthSession({
              accessToken,
              refreshToken,
              user: res.data.user,
              role,
            });
          }
          saveAccountToStorage({
            username: values.username,
            name: res.data?.user?.name || values.username,
          });
          router.push("/dashboard");
        },
      }
    );
  };

  

  const handleGuestLogin = async () => {
    try {
      await saveTokens({
        accessToken: "guest_mock_token",
        refreshToken: "guest_mock_token",
        role: "ADMIN",
      });
    } catch (e) {
      console.error(e);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "guest_mock_token");
      document.cookie = `rjahit_session=guest_mock_token; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `rjahit_refres=guest_mock_token; path=/; max-age=2592000; SameSite=Lax`;
      document.cookie = `rjahit_role=ADMIN; path=/; max-age=2592000; SameSite=Lax`;
    }
    savePwaAuthSession({
      accessToken: "guest_mock_token",
      refreshToken: "guest_mock_token",
      user: {
        id: "guest-id",
        name: "Guest Atelier",
        email: "guest@rumahjahit.id",
        role: "ADMIN",
      },
      role: "ADMIN",
    });
    router.push("/dashboard");
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      await saveTokens({
        accessToken: "google_mock_token",
        refreshToken: "google_mock_token",
        role: "ADMIN",
      });
    } catch (e) {
      console.error(e);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "google_mock_token");
      document.cookie = `rjahit_session=google_mock_token; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `rjahit_refres=google_mock_token; path=/; max-age=2592000; SameSite=Lax`;
      document.cookie = `rjahit_role=ADMIN; path=/; max-age=2592000; SameSite=Lax`;
    }
    savePwaAuthSession({
      accessToken: "google_mock_token",
      refreshToken: "google_mock_token",
      user: {
        id: "google-id",
        name: "Google Admin",
        email: "admin@rumahjahit.id",
        role: "ADMIN",
      },
      role: "ADMIN",
    });
    router.push("/dashboard");
  };

  const handleSelectSavedAccount = (account: SavedLoginAccount) => {
    setSelectedSavedUsername(account.username);
    setLoginEntryMode("selected");
    loginForm.setValue("username", account.username);
  };

  const handleUseDifferentAccount = () => {
    setSelectedSavedUsername(null);
    setLoginEntryMode("manual");
    loginForm.setValue("username", "");
  };

  const handleUseSavedAccountPicker = () => {
    setSelectedSavedUsername(null);
    setLoginEntryMode("picker");
  };

  const isPending = api.auth.login.isPending || api.auth.register.isPending;

  return (
    <LoginSection
      state={{
        isAuth,
        setIsAuth,
        loginForm,
      
        savedAccounts,
        selectedSavedUsername,
        loginEntryMode,
        isSavedAccountsReady,
      }}
      service={{
        isPending,
        onLoginSubmit: loginForm.handleSubmit(handleLogin),
        onGuestSubmit: handleGuestLogin,
        onGoogleLogin: handleGoogleLogin,
        onSelectSavedAccount: handleSelectSavedAccount,
        onUseDifferentAccount: handleUseDifferentAccount,
        onUseSavedAccountPicker: handleUseSavedAccountPicker,
      }}
    />
  );
}
