"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle header background change on scroll
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

  // Close mobile menu when route changes
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-brand-charcoal/90 backdrop-blur-md border-b border-brand-green/30 py-3 shadow-lg shadow-brand-charcoal/10"
        : "bg-brand-charcoal/70 backdrop-blur-md border-b border-white/5 py-4"
        }`}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 h-full">
            <img
              src="/images/The Corporate House (15).png"
              alt="The Corporate House Logo"
              className="h-11 sm:h-16 md:h-24 w-auto object-contain brightness-150 contrast-125 drop-shadow-md transition-transform duration-500 hover:scale-105"
            />
            <span className="font-serif font-bold text-[10px] xs:text-xs sm:text-base md:text-xl text-white tracking-wider leading-none uppercase">
              ℍ𝕆𝕋𝔼𝕃 the <span className="text-[#FFC72C]">corporate</span> house
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-10 ">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm uppercase font-medium tracking-[0.15em] transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive ? "text-white after:scale-x-100" : "text-white/70 hover:text-white"
                    }`}
                >
                  <h4>{link.name}</h4>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            <Link
              href="/booking"
              className="px-6 py-2.5 border border-brand-gold/40 hover:bg-[#FFC72C] hover:text-black hover:border-brand-gold text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#FFC72C] rounded-sm transition-all duration-500 shadow-sm hover:shadow-brand-gold/25"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded text-stone-300 hover:text-white focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="px-6 pt-2 pb-6 space-y-3 bg-brand-charcoal/95 border-b border-brand-green/20 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-xs uppercase tracking-widest text-stone-300 hover:text-white font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-brand-green/25">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-charcoal text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;