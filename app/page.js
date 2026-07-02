"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Dumbbell,
  Flower2,
  Mail,
  MapPin,
  Sparkles,
  Tv,
  Users,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";

const rooms = [
  {
    title: "Executive Double Room Package",
    price: "₹1,500",
    size: "35 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img4.jpg",
    description: "Our signature double room features a vibrant orange accent wall, patterned design accents, and blackout curtains for private comfort.",
    amenities: [
      "Climate Control",
      "Wireless Internet",
      "Concierge Support",
      "Daily Housekeeping"
    ]
  },
  {
    title: "Deluxe Sitting Area Room Package",
    price: "₹1,800",
    size: "45 m²",
    bed: "1 Double Bed",
    guests: "Up to 3 Guests",
    image: "/photos/img7.jpg",
    description: "Spacious layout showcasing premium double bedding, flat screen TV, closet dressing mirror, and a cozy private sitting lounge with sofa.",
    amenities: [
      "Sofa Sitting Lounge",
      "Wall-Mounted Smart TV",
      "Wardrobe with Full Mirror",
      "Complimentary Tea & Coffee"
    ]
  },
  {
    title: "Smart Workstation Twin Room Package",
    price: "₹1,200",
    size: "30 m²",
    bed: "2 Twin Beds",
    guests: "Up to 2 Guests",
    image: "/photos/img10.jpg",
    description: "Designed for shared corporate travel. Outfitted with twin single beds, modern workstations, fast charging outlets, and individual AC.",
    amenities: [
      "Dual Workstations",
      "Fast charging hubs",
      "Individual AC",
      "Premium linens"
    ]
  },
  {
    title: "Study Desk Double Room Package",
    price: "₹1,600",
    size: "40 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img13.jpg",
    description: "Optimized for corporate professionals. Includes a dedicated workspace desk paired with a modern green mesh chair and ceiling fan cooling.",
    amenities: [
      "Dedicated Study Desk",
      "Green Mesh Ergonomic Chair",
      "Wall-mounted Smart TV",
      "High-Speed corporate WiFi"
    ]
  },
  {
    title: "Premium Room with Sofa Lounge Package",
    price: "₹1,950",
    size: "48 m²",
    bed: "1 Double Bed",
    guests: "Up to 3 Guests",
    image: "/photos/img19.jpg",
    description: "An expansive suite-style double room highlighting a comfortable double bed, plush brown sofa lounge, coffee table, and tall closets.",
    amenities: [
      "Plush Brown Sofa Lounge",
      "Private Coffee Table",
      "Executive Wardrobes",
      "Welcome Refreshment Platter"
    ]
  },
  {
    title: "Lobby View Classic Room Package",
    price: "₹1,400",
    size: "38 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img34.jpg",
    description: "Conveniently located near the classic lobby sitting area, providing direct access to classical gold-patterned sofas and shared lounges.",
    amenities: [
      "Quick Lobby Access",
      "Gold-themed accents",
      "24/7 room service",
      "Complimentary water bottles"
    ]
  },
  {
    title: "Terrace View Double Room Package",
    price: "₹1,550",
    size: "36 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img37.jpg",
    description: "Located along the upper marble staircase terrace, this room offers quiet, secure double door access and scenic hallway views.",
    amenities: [
      "Terrace Entrance Access",
      "Enhanced security door locks",
      "Soundproofing panels",
      "In-room breakfast options"
    ]
  },
  {
    title: "Staircase Side Cozy Room Package",
    price: "₹1,100",
    size: "28 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img16.jpg",
    description: "A compact and cost-effective room package located near the main staircase lobby, ideal for short-stay corporate travelers.",
    amenities: [
      "Staircase side access",
      "Compact work table",
      "Fast wireless Internet",
      "Individual climate unit"
    ]
  },
  {
    title: "Front Desk Access Room Package",
    price: "₹1,300",
    size: "32 m²",
    bed: "1 Double Bed",
    guests: "Up to 2 Guests",
    image: "/photos/img31.jpg",
    description: "Ground-floor package with immediate access to the black marble reception desk and lobby waiting areas.",
    amenities: [
      "Ground floor access",
      "Quick check-in convenience",
      "Luggage assistance",
      "Morning newspaper delivery"
    ]
  }
];

const gallery = [
  "/photos/img4.jpg",
  "/photos/img10.jpg",
  "/photos/img16.jpg",
  "/photos/img22.jpg",
  "/photos/img25.jpg",
  "/photos/img31.jpg",
];

const facilities = [
  { title: "Executive Boardrooms", icon: Building2 },
  { title: "High-Speed Wi-Fi", icon: Wifi },
  { title: "Private Lounge", icon: Wine },
  { title: "Audiovisual Support", icon: Tv },
];

const testimonials = [
  {
    quote:
      "An extraordinary stay that felt effortless, luxurious, and deeply personal.",
    name: "Ava Chen",
    role: "Global Operations Director",
  },
  {
    quote:
      "The service, design, and quiet confidence of Corporate House are unmatched.",
    name: "Daniel Brooks",
    role: "Founder, Studio North",
  },
];

const packages = [
  {
    title: "Executive Retreat",
    description:
      "Three nights of suites, private transfers, and a curated business lounge experience.",
    price: "$1,850",
  },
  {
    title: "Weekend Wellness",
    description:
      "Spa rituals, pool access, and personalized dining for restorative getaways.",
    price: "$980",
  },
  {
    title: "Signature Celebration",
    description:
      "Weddings and milestone events with gourmet menus and premium venue styling.",
    price: "$2,400",
  },
];

const attractions = [
  "Harbor Gallery District",
  "The Meridian Business Center",
  "Riverside Wellness Spa",
  "Private Yacht Marina",
];

const faqs = [
  {
    question: "What are the standard check-in and check-out times?",
    answer:
      "Standard check-in begins at 2:00 PM, and check-out is required by 12:00 PM. Early check-in or late check-out can be requested and is subject to availability.",
  },
  {
    question: "Can you host corporate events?",
    answer:
      "Absolutely. We manage intimate meetings, board retreats, and grand business galas.",
  },
  {
    question: "Is high-speed Wi-Fi available at the hotel?",
    answer:
      "Yes, complimentary high-speed Wi-Fi is available in all guest rooms, suites, and public areas throughout the property.",
  },
];

export default function Home() {
  const scrollRef = useRef(null);
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("2026-07-14");
  const [checkOut, setCheckOut] = useState("2026-07-16");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("Executive Double Room Package");

  // Event Booking States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventPurpose, setEventPurpose] = useState("wedding");
  const [eventDate, setEventDate] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventPhone, setEventPhone] = useState("");
  const [eventDays, setEventDays] = useState(1);
  const [isEventSubmitting, setIsEventSubmitting] = useState(false);
  const [eventSuccessMessage, setEventSuccessMessage] = useState(false);

  const handleEventBookingSubmit = async (e) => {
    e.preventDefault();
    setIsEventSubmitting(true);

    const checkIn = new Date(eventDate);
    const checkOut = new Date(checkIn.getTime() + (eventDays - 1) * 24 * 60 * 60 * 1000);
    const checkOutDateStr = checkOut.toISOString().split('T')[0];

    const rate = eventPurpose === "wedding" ? 50000 : eventPurpose === "birthday" ? 20000 : 30000;
    const totalPrice = rate * eventDays;

    const payload = {
      roomId: `event-${eventPurpose}`,
      roomName: eventPurpose === 'wedding' ? 'Wedding Hall' : eventPurpose === 'birthday' ? 'Birthday Hall' : 'Events Space',
      guestName: eventName,
      phone: eventPhone,
      checkInDate: eventDate,
      checkInTime: "09:00",
      checkOutDate: checkOutDateStr,
      checkOutTime: "23:00",
      totalPrice: totalPrice,
      paymentMethod: "Cash Payment",
      status: "Pending"
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setEventSuccessMessage(true);
        // Clear fields
        setEventDate("");
        setEventCapacity("");
        setEventName("");
        setEventPhone("");
        setEventDays(1);
      } else {
        alert(data.error || "Failed to book event space. Please check details.");
      }
    } catch (err) {
      console.error(err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsEventSubmitting(false);
    }
  };

  const handleCheckAvailability = () => {
    router.push(`/booking?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&roomType=${encodeURIComponent(roomType)}`);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)]">
      <section
        id="home"
        className="relative isolate overflow-hidden bg-[var(--page-bg)]">
        <div className="absolute inset-0">
          <Image
            src="/hotel_background.png"
            alt="Luxury hotel lobby"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.82)_0%,rgba(17,17,17,0.38)_48%,rgba(17,17,17,0.16)_100%)]" />
        </div>
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-end gap-10 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
              <Sparkles size={16} className="text-[var(--accent)]" /> Where
              Luxury Meets Business Excellence
            </p>
            <div className="space-y-4">
              <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[var(--accent)] font-bold block mb-2">
                Experience
              </span>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light text-white leading-none tracking-tight">
                Timeless <span className="italic font-normal text-[var(--accent)] font-script capitalize block sm:inline my-2 sm:my-0 sm:mx-4 drop-shadow-md">Luxury</span>
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-[1px] w-12 bg-white/30 hidden sm:block"></div>
                <span className="text-base sm:text-lg md:text-xl font-light tracking-[0.1em] text-stone-300">
                  at <span className="font-semibold text-white border-b border-[var(--accent)] pb-1 transition-all duration-300 hover:border-white">ℍ𝕆𝕋𝔼𝕃 the corporate house</span>
                </span>
              </div>
            </div>
            
           
            
           
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:scale-[1.02]">
                Book Your Stay
              </Link>
              <Link
                href="#rooms"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Rooms
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="hidden lg:block rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  Instant Booking
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Reserve Your Escape
                </h2>
              </div>
              <CalendarDays className="text-[var(--accent)]" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 text-stone-900">
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block text-xs uppercase tracking-[0.3em] text-white/60 mb-2 font-medium">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent text-white text-lg font-medium outline-none border-none cursor-pointer [color-scheme:dark]"
                />
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block text-xs uppercase tracking-[0.3em] text-white/60 mb-2 font-medium">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-white text-lg font-medium outline-none border-none cursor-pointer [color-scheme:dark]"
                />
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block text-xs uppercase tracking-[0.3em] text-white/60 mb-2 font-medium">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-white text-lg font-medium outline-none border-none cursor-pointer [color-scheme:dark]"
                >
                  <option value="1" className="bg-stone-900 text-white">1 Guest</option>
                  <option value="2" className="bg-stone-900 text-white">2 Guests</option>
                  <option value="3" className="bg-stone-900 text-white">3 Guests</option>
                  <option value="4" className="bg-stone-900 text-white">4 Guests</option>
                </select>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block text-xs uppercase tracking-[0.3em] text-white/60 mb-2 font-medium">
                  Rooms
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-transparent text-white text-base font-medium outline-none border-none cursor-pointer [color-scheme:dark] truncate"
                >
                  {rooms.map((room) => (
                    <option key={room.title} value={room.title} className="bg-stone-900 text-white">
                      {room.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleCheckAvailability}
              className="mt-6 w-full rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white transition hover:scale-[1.01] hover:bg-[var(--light-accent)] cursor-pointer"
            >
              Check Availability
            </button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              About Corporate House
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
              A refined address for elevated living and exceptional business
              travel.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              Corporate House pairs the discretion of a private residence with
              the precision of a five-star hospitality experience. With bespoke
              suites, culinary artistry, and event-ready meeting spaces, every
              detail is designed for effortless comfort.
            </p>
            <p>
              From sunrise wellness rituals to after-hours strategy sessions,
              our team crafts memorable stays defined by warmth, privacy, and
              flawless execution.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="rooms" className="mx-auto max-w-7xl px-6 py-8 lg:px-8 overflow-hidden">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Luxury Rooms & Suites
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              Stay in beautifully appointed spaces crafted for comfort.
            </h2>
          </div>
          <div className="flex items-center">
            <Link
              href="/package"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--surface)] inline-flex">
              View All Rooms
            </Link>
          </div>
        </div>

        {/* Relative Slider wrapper for arrows */}
        <div className="relative group">
          {/* Scroll Navigation Arrows positioned on left & right ends */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border border-[#e4d8bf]/60 bg-[rgba(253,252,247,0.9)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white transition duration-300 cursor-pointer active:scale-95 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border border-[#e4d8bf]/60 bg-[rgba(253,252,247,0.9)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white transition duration-300 cursor-pointer active:scale-95 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {rooms.map((room, index) => (
              <motion.article
                key={room.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[360px] lg:w-[380px] snap-start overflow-hidden rounded-[2rem] border border-[#e4d8bf]/60 bg-gradient-to-br from-[#fdfcf7] via-[#faf8f2] to-[#f4eee1] shadow-sm hover:border-[var(--accent)] hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                <div className="relative h-72">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between h-[360px]">
                  <div className="space-y-3">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[var(--ink)] line-clamp-2 leading-snug">
                      {room.title}
                    </h3>
                    
                    {/* Price & Meta Details */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[var(--muted)]">
                        {room.size} • {room.bed}
                      </span>
                      <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-semibold text-[var(--accent)] whitespace-nowrap">
                        {room.price}/night
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-4">
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 h-7 overflow-hidden">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)] whitespace-nowrap">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    {/* Booking Footer */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[var(--muted)]">
                        {room.guests}
                      </div>
                      <Link
                        href="/booking"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent)] hover:scale-[1.02]">
                        Book Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="restaurant" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Signature Restaurant
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              Culinary experiences shaped by season, craft, and character.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              From intimate dinners to private chef’s tables, our restaurant
              offers refined menus designed around the finest local produce and
              global flavors.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Chef’s Tasting Menu",
                "Private Dining",
                "Sommelier Selection",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[var(--ink)]">
                  <CheckCircle2 className="text-[var(--accent)]" size={18} />{" "}
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image
              src="/photos/food_pasta.png"
              alt="Luxury dining"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Meetings & Events
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--ink)]">
              Premium venues for conferences, launches, and executive retreats.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Our halls feature modular layouts, immersive audiovisual support,
              and elegant catering tailored to every occasion.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {facilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[var(--border)] p-4">
                    <Icon className="text-[var(--accent)]" />
                    <p className="mt-3 font-medium text-[var(--ink)]">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                Welcome
              </p>
              <h2 className="text-3xl font-semibold text-[var(--ink)] leading-snug">
                Welcome to Corporate House
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                We are delighted to host you. Our guest relationship team is dedicated to providing you with a seamless, personalized experience, ensuring your business stays and leisure moments are executed with absolute precision and warmth.
              </p>
            </div>
            <div className="relative w-full md:w-[200px] h-[260px] overflow-hidden rounded-2xl flex-shrink-0 shadow-sm border border-[var(--border)]">
              <Image
                src="/photos/welcome_host.jpg"
                alt="Welcome Host"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="event-bookings" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)] font-semibold">
                Celebrations & Gatherings
              </p>
              <h2 className="text-3xl font-semibold text-[var(--ink)] sm:text-4xl leading-tight">
                Host Unforgettable Events at Corporate House
              </h2>
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                Whether you are planning a grand wedding ceremony, a lively birthday celebration, or a high-profile corporate conference, our boutique venues offer the perfect backdrop. We provide tailored catering, luxury decorations, and state-of-the-art facilities to host up to 500 guests.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setIsEventModalOpen(true)}
                  className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)] hover:scale-[1.02] cursor-pointer"
                >
                  Book Event Space
                </button>
                <Link
                  href="/contact"
                  className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--page-bg)]">
                  Inquire Now
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm">
                  <Image
                    src="/photos/wedding_couple.jpg"
                    alt="Wedding Couple"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur">
                    Weddings
                  </span>
                </div>
                <div className="relative h-44 rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm">
                  <Image
                    src="/photos/birthday_kids.jpg"
                    alt="Children Birthday Celebration"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur">
                    Birthdays
                  </span>
                </div>
                <div className="relative h-44 rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm">
                  <Image
                    src="/photos/party_event.jpg"
                    alt="Social Party Event"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur">
                    Events
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--page-bg)]/50 p-4 text-center">
                <p className="text-xs text-[var(--muted)]">
                  💼 Total capacity: <strong>100 - 500 Guests</strong> • 🍽️ In-house Catering Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Gallery
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            Moments of calm, craft, and contemporary luxury.
          </h2>
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="mb-4 overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
              <Image
                src={image}
                alt="Luxury hotel scene"
                width={800}
                height={1000}
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

     

    

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem]">
            <Image
              src="/photos/img34.jpg"
              alt="Virtual hotel tour preview"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Virtual Hotel Tour
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              Step inside the atmosphere of Corporate House before arrival.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Explore our lobby, suites, dining room, and wellness spaces
              through a cinematic virtual journey crafted for discerning guests.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
             
              <button
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--page-bg)]"
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Parking & Valet
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              Secured Parking & Complimentary Valet
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Enjoy peace of mind with our secure, round-the-clock parking solutions. Whether you drive an electric vehicle or require valet assistance, our hospitality team is here to manage your arrival.
            </p>
            
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <Building2 className="text-[var(--accent)]" />
                <strong className="block mt-3 text-[var(--ink)]">24/7 Gated Security</strong>
                <p className="mt-1 text-sm text-[var(--muted)]">Fully monitored private garage</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <Sparkles className="text-[var(--accent)]" />
                <strong className="block mt-3 text-[var(--ink)]">EV Charging</strong>
                <p className="mt-1 text-sm text-[var(--muted)]">High-speed charging stations</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <MapPin className="text-[var(--accent)]" />
                <strong className="block mt-3 text-[var(--ink)]">Covered Parking</strong>
                <p className="mt-1 text-sm text-[var(--muted)]">Sheltered from all elements</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <Users className="text-[var(--accent)]" />
                <strong className="block mt-3 text-[var(--ink)]">Valet Service</strong>
                <p className="mt-1 text-sm text-[var(--muted)]">Complimentary guest drop-off</p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem]">
            <Image
              src="/photos/img28.jpg"
              alt="Secured Parking Facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
            Everything you need to know before your arrival.
          </h2>
          <div className="mt-12 space-y-6 text-left">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:shadow-md hover:border-[var(--accent)]/50">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-[var(--ink)]">
                    {item.question}
                  </h3>
                  
                </div>
                <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0f1712] text-stone-400 pt-20 pb-10 border-t border-[#1a2b21]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-white leading-tight">
                HOTEL The Corporate House
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-bold">
                HOTEL & WORKSPACE
              </p>
              <p className="text-xs leading-relaxed text-stone-400 pt-2">
                Sophisticated rooms and premium business amenities designed for modern corporate travelers seeking productivity and premium relaxation.
              </p>
            </div>

            {/* Column 2: Navigations */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                NAVIGATIONS
              </h3>
              <ul className="space-y-3.5 text-xs text-stone-400">
                <li>
                  <Link href="#rooms" className="hover:text-white transition-colors duration-200">
                    Accommodations
                  </Link>
                </li>
                <li>
                  <a href="#rooms" className="hover:text-white transition-colors duration-200">
                    Amenities
                  </a>
                </li>
                <li>
                  <a href="#restaurant" className="hover:text-white transition-colors duration-200">
                    Dining
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                CONTACT
              </h3>
              <ul className="space-y-3.5 text-xs text-stone-400">
                <li>
                  <a href="mailto:bookings@thecorporatehouse.com" className="hover:text-white transition-colors duration-200 block truncate">
                    bookings@thecorporatehouse.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919304868696" className="hover:text-white transition-colors duration-200 block">
                    +91 9304868696
                  </a>
                </li>
                <li>
                  <span className="block">Argoda Chowk, Ranchi</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Boutique Standard */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                BOUTIQUE STANDARD
              </h3>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="border border-[#143321] bg-[#0c2417] text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded text-[#4ade80]">
                  5-Star Gold
                </span>
                <span className="border border-[#143321] bg-[#0c2417] text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded text-[#4ade80]">
                  EcoLuxury Certified
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Divider & Row */}
          <div className="border-t border-[#1a2b21] mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} HOTEL The Corporate House. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Event Booking Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsEventModalOpen(false);
                setEventSuccessMessage(false);
              }}
              className="absolute top-6 right-6 p-2 text-[var(--muted)] hover:bg-[var(--page-bg)] hover:text-[var(--ink)] rounded-full transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {!eventSuccessMessage ? (
              <form onSubmit={handleEventBookingSubmit} className="space-y-5">
                <div className="text-center space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">Venue Reservations</span>
                  <h3 className="text-3xl font-semibold text-[var(--ink)]">Book Event Space</h3>
                  <div className="w-12 h-0.5 bg-[var(--accent)] mx-auto"></div>
                </div>

                {/* Booking Purpose */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-[var(--muted)]">Booking Purpose</label>
                  <select
                    value={eventPurpose}
                    onChange={(e) => setEventPurpose(e.target.value)}
                    className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] appearance-none cursor-pointer"
                  >
                    <option value="wedding">Wedding Ceremony</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="events">Social / Business Events</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Booking Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[var(--muted)]">Booking Date</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  {/* No. of Days */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[var(--muted)]">No. of Days</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={eventDays}
                      onChange={(e) => setEventDays(parseInt(e.target.value) || 1)}
                      className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* People Quantity */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[var(--muted)]">People Quantity</label>
                    <input
                      type="number"
                      required
                      min={10}
                      placeholder="e.g. 150"
                      value={eventCapacity}
                      onChange={(e) => setEventCapacity(e.target.value)}
                      className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[var(--muted)]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={eventPhone}
                      onChange={(e) => setEventPhone(e.target.value)}
                      className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-[var(--muted)]">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter booking name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                {/* Payment Notice */}
                <div className="p-4 bg-amber-50/70 border border-amber-200/50 rounded-2xl text-xs text-amber-800 leading-relaxed">
                  📌 <strong>Payment Policy:</strong> For payment, you need to come to the hotel reception desk to confirm the booking fee in cash.
                </div>

                <button
                  type="submit"
                  disabled={isEventSubmitting}
                  className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[var(--ink)] hover:bg-[var(--accent)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isEventSubmitting ? "Reserving Venue..." : "Book Venue Space"}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-[var(--ink)]">Venue Reserved!</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs mx-auto">
                    Your request for the <strong>{eventPurpose === 'wedding' ? 'Wedding Hall' : eventPurpose === 'birthday' ? 'Birthday Hall' : 'Events Space'}</strong> has been registered. Please visit the front desk to complete verification.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsEventModalOpen(false);
                    setEventSuccessMessage(false);
                  }}
                  className="px-6 py-3 rounded-full bg-[var(--ink)] text-white hover:bg-[var(--accent)] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}