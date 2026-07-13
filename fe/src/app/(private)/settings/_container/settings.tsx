"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import SettingsSection from "@/components/page/settings/SettingsSection";

export default function SettingsContainer() {
  const router = useRouter();
  const api = useApi({ enabledGetMe: true });

  const { data: meRes, isLoading } = api.auth.getMe;
  const user = meRes?.data || null;

  const [formName, setFormName] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  const updateProfileMutation = api.auth.updateProfile;
  const isPending = updateProfileMutation.isPending;

  React.useEffect(() => {
    if (user) {
      setFormName(user.name || "");
      setFormEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      name: formName,
      email: formEmail,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Kata sandi baru dan konfirmasi tidak sama.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Kata sandi baru minimal 6 karakter.");
      return;
    }

    updateProfileMutation.mutate(
      {
        currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        },
      }
    );
  };

  const handleLogout = () => {
    api.auth.mutate.logout.mutate();
  };

  return (
    <SettingsSection
      state={{
        user,
        isLoading,
        isPending,
        formName,
        setFormName,
        formEmail,
        setFormEmail,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        passwordError,
      }}
      service={{
        onUpdateProfile: handleUpdateProfile,
        onUpdatePassword: handleUpdatePassword,
        onLogout: handleLogout,
      }}
    />
  );
}
