"use client";
import { WidgetProvider } from "@/context/widgetContext";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
interface Props {
  children: React.ReactNode;
}
export default function Providers({ children }: Props) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WidgetProvider>
      <Toaster />
      {children}
    </WidgetProvider>
  );
}
