"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { ActionButton } from "@/components/wrapper";

interface GoogleSignInButtonProps {
  onSuccess: (credential?: string) => void;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  disabled,
}) => {
  return (
    <ActionButton
      type="button"
      variant="outline"
      size="lg"
      className="w-full font-semibold border-border/80 hover:bg-muted/50 rounded-xl"
      disabled={disabled}
      onClick={() => onSuccess("google-mock-credential")}
      iconLeft={<Icon icon="flat-color-icons:google" className="text-xl mr-2" />}
    >
      Masuk dengan Google
    </ActionButton>
  );
};

export default GoogleSignInButton;
