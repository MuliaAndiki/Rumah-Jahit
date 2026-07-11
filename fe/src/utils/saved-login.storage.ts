export interface SavedLoginAccount {
  username: string;
  name?: string;
  avatar?: string;
  lastLogin?: string;
}

const STORAGE_KEY = "rumahjahit_saved_accounts";

export function getSavedAccounts(): SavedLoginAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAccountToStorage(account: SavedLoginAccount): void {
  if (typeof window === "undefined") return;
  try {
    const accounts = getSavedAccounts().filter((a) => a.username !== account.username);
    accounts.unshift({
      ...account,
      lastLogin: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.slice(0, 5)));
  } catch {}
}

export function removeSavedAccount(username: string): void {
  if (typeof window === "undefined") return;
  try {
    const accounts = getSavedAccounts().filter((a) => a.username !== username);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {}
}
