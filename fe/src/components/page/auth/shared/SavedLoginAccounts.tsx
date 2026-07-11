"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import type { SavedLoginAccount } from "@/utils/saved-login.storage";

interface SavedLoginAccountsProps {
  accounts: SavedLoginAccount[];
  selectedUsername?: string | null;
  onSelect: (account: SavedLoginAccount) => void;
  onUseDifferentAccount?: () => void;
  disabled?: boolean;
}

const SavedLoginAccounts: React.FC<SavedLoginAccountsProps> = ({
  accounts,
  selectedUsername,
  onSelect,
  disabled,
}) => {
  const displayAccounts = selectedUsername
    ? accounts.filter((a) => a.username === selectedUsername)
    : accounts;

  return (
    <div className="space-y-2 w-full">
      {displayAccounts.map((account) => (
        <button
          key={account.username}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(account)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-border/80 bg-muted/20 hover:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {account.name ? account.name.charAt(0).toUpperCase() : account.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{account.name || account.username}</p>
              <p className="text-xs text-muted-foreground">{account.username}</p>
            </div>
          </div>
          <Icon icon="mdi:chevron-right" className="text-xl text-muted-foreground" />
        </button>
      ))}
    </div>
  );
};

export default SavedLoginAccounts;
