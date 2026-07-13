import * as React from "react";
import { Icon } from "@iconify/react";
import type { AdminUser } from "@/services/props.service";

interface SettingsSectionProps {
  state: {
    user: AdminUser | null;
    isLoading: boolean;
    isPending: boolean;
    // Profile form
    formName: string;
    setFormName: (v: string) => void;
    formEmail: string;
    setFormEmail: (v: string) => void;
    // Password form
    currentPassword: string;
    setCurrentPassword: (v: string) => void;
    newPassword: string;
    setNewPassword: (v: string) => void;
    confirmNewPassword: string;
    setConfirmNewPassword: (v: string) => void;
    passwordError: string | null;
  };
  service: {
    onUpdateProfile: (e: React.FormEvent) => void;
    onUpdatePassword: (e: React.FormEvent) => void;
    onLogout: () => void;
  };
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ state, service }) => {
  if (state.isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-muted-foreground">
        <Icon icon="mdi:loading" className="animate-spin text-4xl text-primary" />
        <p className="font-serif text-lg">Memuat pengaturan akun...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10">
      {/* Page Title */}
      <div className="border-b border-border/80 pb-6 flex items-end justify-between">
        <div className="space-y-1">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-muted-foreground">
            Admin Settings
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
            Pengaturan Akun Admin
          </h1>
        </div>
        <button
          type="button"
          onClick={service.onLogout}
          className="px-5 py-2.5 border border-destructive text-destructive font-serif text-sm hover:bg-destructive hover:text-white transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:logout" className="text-lg" />
          <span>Keluar</span>
        </button>
      </div>

      {/* Profile Info Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="font-serif text-xl font-normal text-foreground">
            Informasi Profil
          </h2>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed">
            Perbarui nama tampilan dan alamat email yang terkait dengan akun administrator studio.
          </p>
        </div>

        <form
          onSubmit={service.onUpdateProfile}
          className="lg:col-span-2 border border-border/80 p-8 space-y-6 bg-card"
        >
          <div className="space-y-2">
            <label className="font-serif text-sm uppercase tracking-wider text-muted-foreground block">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={state.formName}
              onChange={(e) => state.setFormName(e.target.value)}
              placeholder="Nama admin studio"
              className="w-full px-4 py-3 bg-muted/40 border border-border/80 font-serif text-base text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-serif text-sm uppercase tracking-wider text-muted-foreground block">
              Email
            </label>
            <input
              type="email"
              value={state.formEmail}
              onChange={(e) => state.setFormEmail(e.target.value)}
              placeholder="admin@rumahjahit.com"
              className="w-full px-4 py-3 bg-muted/40 border border-border/80 font-serif text-base text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-colors"
            />
          </div>

          {state.user?.createdAt && (
            <p className="font-serif text-xs text-muted-foreground italic">
              Akun dibuat sejak: {new Date(state.user.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={state.isPending}
              className="px-8 py-3 bg-primary text-primary-foreground font-serif text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {state.isPending ? (
                <Icon icon="mdi:loading" className="animate-spin text-lg" />
              ) : (
                <Icon icon="mdi:content-save-outline" className="text-lg" />
              )}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4 border-t border-border/60">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="font-serif text-xl font-normal text-foreground">
            Perbarui Kata Sandi
          </h2>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed">
            Untuk keamanan studio, masukkan kata sandi saat ini sebelum menetapkan kata sandi baru. Panjang minimal 6 karakter.
          </p>
        </div>

        <form
          onSubmit={service.onUpdatePassword}
          className="lg:col-span-2 border border-border/80 p-8 space-y-6 bg-card"
        >
          <div className="space-y-2">
            <label className="font-serif text-sm uppercase tracking-wider text-muted-foreground block">
              Kata Sandi Saat Ini
            </label>
            <input
              type="password"
              value={state.currentPassword}
              onChange={(e) => state.setCurrentPassword(e.target.value)}
              placeholder="Masukkan kata sandi lama"
              className="w-full px-4 py-3 bg-muted/40 border border-border/80 font-serif text-base text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-serif text-sm uppercase tracking-wider text-muted-foreground block">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              value={state.newPassword}
              onChange={(e) => state.setNewPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-3 bg-muted/40 border border-border/80 font-serif text-base text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-serif text-sm uppercase tracking-wider text-muted-foreground block">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              value={state.confirmNewPassword}
              onChange={(e) => state.setConfirmNewPassword(e.target.value)}
              placeholder="Ketik ulang kata sandi baru"
              className="w-full px-4 py-3 bg-muted/40 border border-border/80 font-serif text-base text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-colors"
            />
          </div>

          {state.passwordError && (
            <p className="font-serif text-sm text-destructive flex items-center gap-2">
              <Icon icon="mdi:alert-circle-outline" className="text-lg" />
              {state.passwordError}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={state.isPending || !state.currentPassword || !state.newPassword}
              className="px-8 py-3 bg-primary text-primary-foreground font-serif text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {state.isPending ? (
                <Icon icon="mdi:loading" className="animate-spin text-lg" />
              ) : (
                <Icon icon="mdi:lock-reset" className="text-lg" />
              )}
              <span>Perbarui Kata Sandi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsSection;
