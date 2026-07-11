"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import LoginSection from "../_section/LoginSection";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
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

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
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
        onSuccess: (res) => {
          saveAccountToStorage({
            username: values.username,
            name: res.data?.user?.name || values.username,
          });
          router.push("/dashboard");
        },
      }
    );
  };

  const handleRegister = (values: RegisterFormValues) => {
    api.auth.register.mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setIsAuth("login");
          loginForm.setValue("username", values.email);
        },
      }
    );
  };

  const handleGuestLogin = () => {
    // Navigate straight to dashboard for preview/guest testing
    router.push("/dashboard");
  };

  const handleGoogleLogin = async (credential: string) => {
    // Fallback google mock action
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
        registerForm,
        savedAccounts,
        selectedSavedUsername,
        loginEntryMode,
        isSavedAccountsReady,
      }}
      service={{
        isPending,
        onLoginSubmit: loginForm.handleSubmit(handleLogin),
        onRegisterSubmit: registerForm.handleSubmit(handleRegister),
        onGuestSubmit: handleGuestLogin,
        onGoogleLogin: handleGoogleLogin,
        onSelectSavedAccount: handleSelectSavedAccount,
        onUseDifferentAccount: handleUseDifferentAccount,
        onUseSavedAccountPicker: handleUseSavedAccountPicker,
      }}
    />
  );
}
