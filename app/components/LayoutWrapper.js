"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname && (pathname === "/admin" || pathname.startsWith("/admin/"));

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      {!isAdmin && <Navbar />}
      <main className={`flex-grow w-full overflow-x-hidden ${isAdmin ? "" : "pt-16"}`}>
        {children}
      </main>
    </div>
  );
}
