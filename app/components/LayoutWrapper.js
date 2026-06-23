"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname && (pathname === "/admin" || pathname.startsWith("/admin/"));

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={`flex-grow w-full ${isAdmin ? "" : "pt-16"}`}>
        {children}
      </main>
    </>
  );
}
