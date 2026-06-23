"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Check,
  Tv,
  Wind,
  Wifi,
  Coffee,
  MapPin,
  Calendar,
  Users,
  Compass,
  Briefcase
} from "lucide-react";
import Link from "next/link";

// 9 Rooms/Packages Mock Data
const PACKAGES = [
  {
    id: "executive-double",
    name: "Executive Double Room Package",
    price: 1500,
    size: "35 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img4.jpg",
    description: "Our signature double room features a vibrant orange accent wall, patterned design accents, and blackout curtains for private comfort.",
    services: [
      "Individual Climate Control",
      "High-speed Wireless Internet",
      "24/7 Concierge Support",
      "Daily Housekeeping"
    ]
  },
  {
    id: "deluxe-sitting",
    name: "Deluxe Sitting Area Room Package",
    price: 1800,
    size: "45 m²",
    bed: "1 Double Bed",
    guests: "Up to 3 Guests",
    image: "/photos/img7.jpg",
    description: "Spacious layout showcasing premium double bedding, flat screen TV, closet dressing mirror, and a cozy private sitting lounge with sofa.",
    services: [
      "Sofa Sitting Lounge",
      "Wall-Mounted Smart TV",
      "Wardrobe with Full Mirror",
      "Complimentary Tea & Coffee"
    ]
  },
  {
    id: "smart-twin",
    name: "Smart Workstation Twin Room Package",
    price: 1200,
    size: "30 m²",
    bed: "2 Twin Beds",
    image: "/photos/img10.jpg",
    description: "Designed for shared corporate travel. Outfitted with twin single beds, modern workstations, fast charging outlets, and individual AC.",
    services: [
      "Dual Workstations",
      "Fast charging hubs",
      "Individual AC",
      "Premium linens"
    ]
  },
  {
    id: "study-desk",
    name: "Study Desk Double Room Package",
    price: 1600,
    size: "40 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img13.jpg",
    description: "Optimized for corporate professionals. Includes a dedicated workspace desk paired with a modern green mesh chair and ceiling fan cooling.",
    services: [
      "Dedicated Study Desk",
      "Green Mesh Ergonomic Chair",
      "Wall-mounted Smart TV",
      "High-Speed corporate WiFi"
    ]
  },
  {
    id: "premium-lounge",
    name: "Premium Room with Sofa Lounge Package",
    price: 1950,
    size: "48 m²",
    bed: "1 Double Bed",
    guests: "Up to 3 Guests",
    image: "/photos/img19.jpg",
    description: "An expansive suite-style double room highlighting a comfortable double bed, plush brown sofa lounge, coffee table, and tall closets.",
    services: [
      "Plush Brown Sofa Lounge",
      "Private Coffee Table",
      "Executive Wardrobes",
      "Welcome Refreshment Platter"
    ]
  },
  {
    id: "lobby-classic",
    name: "Lobby View Classic Room Package",
    price: 1400,
    size: "38 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img34.jpg",
    description: "Conveniently located near the classic lobby sitting area, providing direct access to classical gold-patterned sofas and shared lounges.",
    services: [
      "Quick Lobby Access",
      "Gold-themed accents",
      "24/7 room service",
      "Complimentary water bottles"
    ]
  },
  {
    id: "terrace-double",
    name: "Terrace View Double Room Package",
    price: 1550,
    size: "36 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img37.jpg",
    description: "Located along the upper marble staircase terrace, this room offers quiet, secure double door access and scenic hallway views.",
    services: [
      "Terrace Entrance Access",
      "Enhanced security door locks",
      "Soundproofing panels",
      "In-room breakfast options"
    ]
  },
  {
    id: "staircase-cozy",
    name: "Staircase Side Cozy Room Package",
    price: 1100,
    size: "28 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img16.jpg",
    description: "A compact and cost-effective room package located near the main staircase lobby, ideal for short-stay corporate travelers.",
    services: [
      "Staircase side access",
      "Compact work table",
      "Fast wireless Internet",
      "Individual climate unit"
    ]
  },
  {
    id: "front-desk-access",
    name: "Front Desk Access Room Package",
    price: 1300,
    size: "32 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img31.jpg",
    description: "Ground-floor package with immediate access to the black marble reception desk and lobby waiting areas.",
    services: [
      "Ground floor access",
      "Quick check-in convenience",
      "Luggage assistance",
      "Morning newspaper delivery"
    ]
  }
];

function PackagePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-black min-h-screen font-sans py-12 px-6 md:px-8 max-w-7xl mx-auto space-y-16 selection:bg-brand-green selection:text-white `}>

      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="text-sm uppercase tracking-[0.25em] text-[#FFC72C] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-green-800" />
          The Corporate House Packages
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-black">
          Our Rooms & Services
        </h1>
        <div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
        <p className="text-black text-3xl font-normal font-script leading-relaxed max-w-xl mx-auto">
          Browse through our corporate residences, business workspaces, and shared lounge packages. Select the perfect package for your accommodation needs.
        </p>
      </section>

      {/* Packages Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="group bg-card-gradient border border-[#E5E2DA]/20 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 hover:border-brand-radishblack hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)]"
          >
            {/* Image Wrap */}
            <div className="relative h-60 overflow-hidden border-b border-[#E5E2DA]/10">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute bottom-4 right-4 text-sm font-serif font-bold px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-brand-green shadow-sm border border-[#E5E2DA]">
                ₹{pkg.price} <span className="text-[10px] text-stone-500 font-sans font-light">/ night</span>
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-6">

              <div className="space-y-4">
                {/* Title and Specs */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-white transition-colors leading-snug">
                    {pkg.name}
                  </h3>
                  <div className="flex items-center gap-2 text-stone-300 text-[10px] uppercase font-bold tracking-wider mt-1.5">
                    <span>{pkg.size}</span>
                    <span>•</span>
                    <span>{pkg.bed}</span>
                    <span>•</span>
                    <span>{pkg.guests}</span>
                  </div>
                </div>

                <p className="text-stone-200 text-xs font-normal leading-relaxed">
                  {pkg.description}
                </p>

                {/* Services / Features List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-stone-300">
                    Included Services
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {pkg.services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-stone-200 font-normal">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/booking"
                className="block w-full py-3 text-center rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-x-gold-green animate-gradient-x shadow-sm transition-all duration-200 hover:scale-[1.01]"
              >
                Book This Package
              </Link>

            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

export default PackagePage;
