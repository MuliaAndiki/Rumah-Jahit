"use client";

import * as React from "react";
import PrivateProviders from "@/core/providers/private.provider";
import MainLayout from "@/core/layouts/main.layout";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProviders>
      <MainLayout>
        {children}
      </MainLayout>
    </PrivateProviders>
  );
}
