"use client";

import * as React from "react";

import MainLayout from "@/core/layouts/main.layout";
import PrivateProviders from "@/core/providers/private.provider";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProviders>
      <MainLayout>
        {children}
      </MainLayout>
    </PrivateProviders>
  );
}
