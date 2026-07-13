"use client";

import { useEffect, useState } from "react";
import { PWAUpdatePrompt } from "./PWAUpdatePrompt";

export function PushNotificationPromptClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <PWAUpdatePrompt />
    </>
  );
}
