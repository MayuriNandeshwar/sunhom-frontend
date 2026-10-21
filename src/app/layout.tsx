// src/app/layout.tsx
import "./globals.css";
import ClientAnalyticsShell from "@/components/ClientAnalyticsShell";
import type { Metadata } from "next";

import NavigationLoadingListener from "@/components/common/NavigationLoadingListener";
import { LoadingProvider } from "@/context/LoadingContext";

export const metadata: Metadata = {
  title: {
    default: "SUNHOM",
    template: "%s | SUNHOM",
  },
  description:
    "Premium handcrafted soy wax candles that bring calm, warmth, and luxury into everyday life.",

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F5F2]">
        <ClientAnalyticsShell />
        <LoadingProvider>
          <NavigationLoadingListener />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}