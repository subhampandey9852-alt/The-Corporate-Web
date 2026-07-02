"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/about" },
    { name: "Packages", href: "/package" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/40 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(247,245,242,0.85)] shadow-sm backdrop-blur-xl"
          : "bg-[rgba(247,245,242,0.78)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-0 lg:px-8">
        <div className="flex items-center justify-between py-1.5">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/images/The Corporate House (15).png"
              alt="The Corporate House Logo"
              className="h-20 sm:h-24 w-auto object-contain brightness-110 contrast-110 saturate-150 drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
            />
            <span className="text-base sm:text-lg font-semibold tracking-[0.2em] uppercase text-[var(--ink)] leading-none">
              ℍ𝕆𝕋𝔼𝕃 the corporate house
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    isActive ? "text-[var(--accent)] font-semibold" : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            <Link
              href="/booking"
              className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:scale-[1.02] hover:bg-[var(--accent)]"
            >
              Book Stay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded text-[var(--ink)] focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 pt-2 pb-6 space-y-3 bg-[var(--page-bg)] border-t border-[var(--border)] shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[var(--border)]">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-[var(--ink)] text-white text-sm font-medium rounded-full transition-all hover:bg-[var(--accent)]"
            >
              Book Stay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;