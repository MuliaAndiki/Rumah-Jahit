import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/atoms";
import { ActionButton } from "@/components/wrapper";
import { DecoratedInput } from "@/components/wrapper";
import { LoginSectionMotion } from "@/components/wrapper/LoginSectionMotion";
import { Brid, Cloud, Sun } from "@/components/molecules";
import AuthField from "@/components/page/auth/shared/AuthField";
import GoogleSignInButton from "@/components/page/auth/shared/GoogleSignInButton";
import SavedLoginAccounts from "@/components/page/auth/shared/SavedLoginAccounts";
import type {
  LoginFormValues,
} from "@/schemas/auth.schema";
import type { AuthMode } from "@/types";
import type { SavedLoginAccount } from "@/utils/saved-login.storage";

const inputClassName =
  "rounded-xl border-border/60 h-12 focus-visible:ring-primary/30 focus-visible:border-primary";

const PersonOutlineRoundedIcon = ({
  className = "",
  height = "1em",
}: {
  className?: string;
  height?: string | number;
}) => (
  <Icon
    icon="material-symbols:person-outline-rounded"
    className={className}
    height={height}
  />
);

interface LoginSectionProps {
  state: {
    isAuth: AuthMode;
    setIsAuth: React.Dispatch<React.SetStateAction<AuthMode>>;
    loginForm: UseFormReturn<LoginFormValues>;

    savedAccounts: SavedLoginAccount[];
    selectedSavedUsername: string | null;
    loginEntryMode: "picker" | "selected" | "manual";
    isSavedAccountsReady: boolean;
  };
  service: {
    isPending: boolean;
    onLoginSubmit: () => void;
    onGuestSubmit?: () => void | Promise<void>;
    onGoogleLogin: (credential: string) => void | Promise<void>;
    onSelectSavedAccount: (account: SavedLoginAccount) => void;
    onUseDifferentAccount: () => void;
    onUseSavedAccountPicker: () => void;
  };
}

const LoginSection: React.FC<LoginSectionProps> = ({ state, service }) => {
  const isLogin = state.isAuth === "login";
  const showSavedAccountPicker =
    isLogin &&
    state.isSavedAccountsReady &&
    state.loginEntryMode === "picker" &&
    state.savedAccounts.length > 0;
  const hasSelectedSavedAccount =
    isLogin && state.loginEntryMode === "selected";
  const showManualLoginForm =
    !isLogin || state.loginEntryMode === "manual" || hasSelectedSavedAccount;

  const handleGuestSubmit = () => {
    if (!service.onGuestSubmit) return;
    void service.onGuestSubmit();
  };

  const handleGoogleSuccess = (credential?: string) => {
    if (!credential || service.isPending) {
      return;
    }

    void service.onGoogleLogin(credential);
  };

  const loginErrors = state.loginForm.formState.errors;

  return (
    <section className="w-full relative min-h-screen bg-linear-to-b from-primary to-primary/10 flex justify-center items-center ">
      <div className="w-full grid grid-cols-1 grid-row-1 lg:grid-cols-2 z-1">
        <div className="absolute top-90 left-40 hidden lg:block ">
          <Brid />
        </div>
        <div className="absolute top-0">
          <Cloud />
        </div>
        <div className="absolute lg:top-0 lg:right-0 md:block right-0 translate-x-20 top-0 ">
          <Sun />
        </div>
        <div className="absolute top-60 right-[-10] z-[-1]">
          <Cloud />
        </div>
        <div className="absolute top-40 right-210">
          <Brid />
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          <Image
            alt="icon"
            src={"/maskot/hero.webp"}
            width={370}
            height={370}
            className="w-58 md:w-120 h-auto z-0"
          />
          <div className="w-full max-w-lg hidden lg:block flex-col space-y-2 mt-2 items-center">
            <GoogleSignInButton
              onSuccess={handleGoogleSuccess}
              disabled={service.isPending}
            />
            <ActionButton
              iconLeft={<PersonOutlineRoundedIcon height="1em" />}
              size={"lg"}
              className="w-full"
              variant={"outline"}
              onClick={handleGuestSubmit}
              disabled={service.isPending}
            >
              Masuk Sebagai Tamu
            </ActionButton>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full p-10 rounded-lg bg-background lg:max-w-3xl max-w-sm space-y-4">
            <LoginSectionMotion authMode={state.isAuth}>
              {({ switchRef, formRef }) => (
                <>
                  <div
                    ref={switchRef}
                    className="w-full flex bg-foreground/10 justify-between items-center flex-row gap-2 lg:gap-4 border border-foreground/50 p-2 rounded-lg"
                  >
                    <Button
                      variant={
                        state.isAuth === "login" ? "activate" : "noActivate"
                      }
                      onClick={() => state.setIsAuth("login")}
                      className="flex-1 rounded-full"
                      type="button"
                    >
                      Masuk
                    </Button>
                  
                  </div>
                  <div className="w-full md:hidden space-y-2 items-center">
                    <GoogleSignInButton
                      onSuccess={handleGoogleSuccess}
                      disabled={service.isPending}
                    />
                    <ActionButton
                      iconLeft={<PersonOutlineRoundedIcon height="1em" />}
                      size={"lg"}
                      className="w-full"
                      variant={"outline"}
                      onClick={handleGuestSubmit}
                      disabled={service.isPending}
                    >
                      Masuk Sebagai Tamu
                    </ActionButton>
                  </div>
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/60" />
                    </div>
                    <div className="relative flex justify-center text-xs font-bold text-muted-foreground">
                      <span className="bg-background px-4">
                        atau ID Pelajar / Admin
                      </span>
                    </div>
                  </div>

                  {showSavedAccountPicker ? (
                    <div className="space-y-3">
                      <SavedLoginAccounts
                        accounts={state.savedAccounts}
                        onSelect={service.onSelectSavedAccount}
                        disabled={service.isPending}
                      />
                      <button
                        type="button"
                        onClick={service.onUseDifferentAccount}
                        disabled={service.isPending}
                        className="w-full text-center text-xs font-semibold text-primary hover:underline disabled:opacity-60"
                      >
                        Masuk dengan username lain
                      </button>
                    </div>
                  ) : null}

                  {hasSelectedSavedAccount ? (
                    <SavedLoginAccounts
                      accounts={state.savedAccounts}
                      selectedUsername={state.selectedSavedUsername}
                      onSelect={service.onSelectSavedAccount}
                      onUseDifferentAccount={service.onUseDifferentAccount}
                      disabled={service.isPending}
                    />
                  ) : null}

                  {showManualLoginForm ? (
                    <form
                      ref={formRef}
                      className="space-y-4"
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (isLogin) {
                          service.onLoginSubmit();
                          return;
                        }
                      }}
                      noValidate
                    >
                      {isLogin ? (
                        hasSelectedSavedAccount ? null : (
                          <AuthField
                            label="Username / Email"
                            htmlFor="login-username"
                            error={loginErrors.username?.message}
                          >
                            <DecoratedInput
                              id="login-username"
                              type="text"
                              placeholder="admin@rumahjahit.com"
                              className={inputClassName}
                              autoComplete="username"
                              error={loginErrors.username?.message}
                              {...state.loginForm.register("username")}
                              iconLeft={
                                <PersonOutlineRoundedIcon
                                  className="text-muted-foreground"
                                  height="1.2em"
                                />
                              }
                            />
                          </AuthField>
                        )
                      ) : 
                       null}

                      <AuthField
                        label={
                          isLogin && hasSelectedSavedAccount
                            ? "Masukkan kata sandi"
                            : "Kata Sandi"
                        }
                        htmlFor={
                          isLogin ? "login-password" : "register-password"
                        }
                        error={
                          loginErrors.password?.message 
                        }
                      >
                        {isLogin ? (
                          <DecoratedInput
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            className={inputClassName}
                            autoComplete="current-password"
                            showPasswordToggle
                            error={loginErrors.password?.message}
                            {...state.loginForm.register("password")}
                            iconLeft={
                              <Icon
                                icon="mdi:lock-outline"
                                className="text-muted-foreground"
                                height="1.2em"
                              />
                            }
                          />
                        ) : null}
                      </AuthField>

                      <ActionButton
                        size="lg"
                        className="w-full rounded-full bg-primary hover:bg-primary/90 text-background font-bold h-12 text-base mt-2 shadow-sm"
                        iconRight={
                          <Icon
                            icon="mdi:rocket-launch-outline"
                            height="1.2em"
                          />
                        }
                        type="submit"
                        disabled={service.isPending}
                        data-auth-animate="field"
                      >
                        {isLogin ? "Masuk" : "Daftar"}
                      </ActionButton>
                    </form>
                  ) : null}

                  {isLogin &&
                  state.loginEntryMode === "manual" &&
                  state.savedAccounts.length > 0 ? (
                    <button
                      type="button"
                      onClick={service.onUseSavedAccountPicker}
                      disabled={service.isPending}
                      className="w-full text-center text-xs font-semibold text-primary hover:underline disabled:opacity-60"
                    >
                      Pilih akun tersimpan
                    </button>
                  ) : null}
                </>
              )}
            </LoginSectionMotion>

            {isLogin ? (
              <div className="flex items-center justify-end gap-3 text-sm">
                <Link
                  href="/forgotPassword"
                  className="font-semibold text-primary hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
            ) : null}

            <h1 className="text-lg font-light text-center">
              Dengan bergabung, kamu setuju dengan{" "}
              <Link href={""}>
                <span className="font-semibold text-primary">
                  Aturan Komunitas
                </span>
              </Link>{" "}
              <br />
              kami.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
