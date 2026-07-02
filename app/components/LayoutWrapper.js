"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname && (pathname === "/admin" || pathname.startsWith("/admin/"));
  const isHome = pathname === "/";
  const noPadding = isAdmin || isHome;

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {!isAdmin && <Navbar />}
      <main className={`flex-grow w-full ${noPadding ? "" : "pt-24"}`}>
        {children}
      </main>
    </div>
  );
}
