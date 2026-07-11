"use client";

import * as React from "react";
import type { AuthMode } from "@/types";

interface LoginSectionMotionProps {
  authMode: AuthMode;
  children: (props: {
    switchRef: React.RefObject<HTMLDivElement | null>;
    formRef: React.RefObject<HTMLFormElement | null>;
  }) => React.ReactNode;
}

export const LoginSectionMotion: React.FC<LoginSectionMotionProps> = ({
  authMode,
  children,
}) => {
  const switchRef = React.useRef<HTMLDivElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      {children({ switchRef, formRef })}
    </div>
  );
};
