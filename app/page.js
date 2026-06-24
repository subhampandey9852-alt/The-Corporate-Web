"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  Wifi,
  Tv,
  Coffee,
  Wind,
  Sparkles,
  Flame,
  Compass,
  Utensils,
  X,
  Check,
  Plus,
  Minus,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Heart,
  Anchor,
  ArrowRight,
  ArrowLeft,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Hotel Rooms Mock Data
const ROOMS = [
  {
    id: "executive-double",
    name: "Executive Double Room",
    category: "rooms",
    price: 1500,
    rating: 4.7,
    reviews: 142,
    image: "/photos/img4.jpg",
    description: "Bright and welcoming double room featuring a vibrant orange accent wall, patterned pillows and bed runner, individual air conditioning, and dark brown blackout curtains.",
    size: "35 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Individual Air Conditioning", "Vibrant Accent Wall", "Modern Wall Wardrobe", "Blackout Curtains"]
  },
  {
    id: "deluxe-sitting",
    name: "Deluxe Room with Sitting Area",
    category: "rooms",
    price: 1800,
    rating: 4.8,
    reviews: 215,
    image: "/photos/img7.jpg",
    description: "Spacious double room offering a comfortable bed, orange accent wall, wall-mounted television, wardrobe with a dressing mirror, and a cozy sitting area with a sofa chair and coffee table.",
    size: "45 m²",
    guests: "Up to 3 Guests",
    bed: "1 Double Bed",
    features: ["Wall-mounted TV", "Wardrobe with Mirror", "Cozy Sofa Seating", "Ceiling Fan & AC"]
  },
  {
    id: "study-desk-double",
    name: "Double Room with Study Desk",
    category: "rooms",
    price: 1600,
    rating: 4.6,
    reviews: 71,
    image: "/photos/img13.jpg",
    description: "Designed for business travelers needing a workspace, this room features a comfortable double bed, wall-mounted TV, individual climate controls, and a study desk with a modern green mesh chair.",
    size: "40 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Dedicated Work Desk", "Green Mesh Chair", "Wall-mounted TV", "Individual Climate Control"]
  },
  {
    id: "sofa-lounge-double",
    name: "Premium Room with Sofa Lounge",
    category: "rooms",
    price: 1950,
    rating: 4.9,
    reviews: 89,
    image: "/photos/img19.jpg",
    description: "An expansive premium room featuring a comfortable double bed, a dedicated seating area with a plush brown sofa and coffee table, individual air conditioning, and elegant wooden wardrobes.",
    size: "48 m²",
    guests: "Up to 3 Guests",
    bed: "1 Double Bed",
    features: ["Plush Sofa Seating", "Coffee Table", "Individual Air Conditioning", "Premium Wooden Wardrobe"]
  },
  {
    id: "hotel-exterior-balconies",
    name: "Hotel Exterior & Balconies",
    category: "rooms",
    price: 1100,
    rating: 4.4,
    reviews: 38,
    image: "/photos/img22.jpg",
    description: "The modern multi-story exterior of The Corporate House, featuring spacious private balconies, steel railings, and secure gated entry.",
    size: "Exterior view",
    guests: "All Guests",
    bed: "Modern Building",
    features: ["Private Balconies", "Steel Railings", "Secure Gated Entry", "Modern Facade"]
  },
  {
    id: "boutique-lobby-lounge",
    name: "Boutique Lobby & Lounge",
    category: "rooms",
    price: 1200,
    rating: 4.5,
    reviews: 54,
    image: "/photos/img34.jpg",
    description: "Our elegant, shared boutique lobby space featuring classical golden patterned sofas, wooden coffee tables, ornamental stands, and traditional wall art.",
    size: "Shared space",
    guests: "All Guests",
    bed: "Lounge Seating",
    features: ["Golden Patterned Sofas", "Wooden Coffee Tables", "Traditional Wall Art", "Ornamental Stands"]
  },

  {
    id: "modern-ensuite-bathroom",
    name: "Modern Ensuite Bathroom",
    category: "rooms",
    price: 1300,
    rating: 4.6,
    reviews: 104,
    image: "/photos/img25.jpg",
    description: "Clean and contemporary ensuite bathroom featuring patterned geometric tiling, a hot water geyser, modern toilet fixtures, and a glass-framed mirror.",
    size: "Private ensuite",
    guests: "Ensuite",
    bed: "Modern Fixtures",
    features: ["Geometric Pattern Tiling", "Hot Water Geyser", "Modern Toilet Fixtures", "Glass-framed Mirror"]
  },
  {
    id: "reception-desk-lobby",
    name: "Reception Desk & Lobby",
    category: "rooms",
    price: 1450,
    rating: 4.7,
    reviews: 62,
    image: "/photos/img31.jpg",
    description: "Our 24/7 reception desk featuring a black marble counter, warm lighting, and a comfortable lobby entrance to welcome you at any hour.",
    size: "Reception area",
    guests: "24/7 Service",
    bed: "Black Marble Counter",
    features: ["Black Marble Counter", "Warm Lighting", "24/7 Front Desk", "Comfortable Entrance"]
  }
];

// Amenities Data
const AMENITIES = [
  { icon: ShieldCheck, name: "Executive Business Center", desc: "Fully equipped boardrooms and high-speed document processing." },
  { icon: Anchor, name: "Luxury Shuttle Service", desc: "Private executive transfers and corporate travel convenience." },
  { icon: Utensils, name: "Michelin Dining", desc: "Three signature restaurants led by world-renowned chefs." },
  { icon: Compass, name: "Curated Experiences", desc: "Tailored networking events, local tours, and corporate gatherings." },
  { icon: Coffee, name: "Sip & Savor Lounge", desc: "High tea and premium single-origin coffee blends." },
  { icon: Wind, name: "Wellness Center", desc: "State-of-the-art gym, relaxation decks, and personal coaches." }
];

// Gourmet Food Items Data
const FOOD_ITEMS = [
  {
    id: "truffle-pasta",
    name: "Truffle Fettuccine",
    category: "Signature Entrées",
    price: 1850,
    rating: 4.9,
    image: "/photos/food_pasta.png",
    description: "House-made fettuccine tossed in a rich, creamy parmigiano-reggiano and butter emulsion, generously topped with freshly shaved Italian black winter truffles and micro-greens.",
  },
  {
    id: "pan-salmon",
    name: "Pan-Seared Salmon",
    category: "Signature Seafood",
    price: 2200,
    rating: 4.8,
    image: "/photos/food_salmon.png",
    description: "Crispy-skinned Atlantic salmon fillet resting on a bed of buttered asparagus spears, accompanied by a velvety citrus saffron reduction and fresh garden herbs.",
  },
  {
    id: "chocolate-souffle",
    name: "Warm Chocolate Soufflé",
    category: "Decadent Desserts",
    price: 950,
    rating: 4.9,
    image: "/photos/food_souffle.png",
    description: "Classic French soufflé baked to light, airy perfection with a decadent molten dark chocolate core, dusted with powdered sugar and served alongside Madagascar vanilla bean ice cream.",
  }
];

// Gallery Images Data
const GALLERY_IMAGES = [
  { src: "/photos/img19.jpg", title: "Luxury Penthouse Suite", desc: "Crafted by contemporary local designers for maximum comfort." },
  { src: "/photos/img34.jpg", title: "Boutique Lobby & Lounge", desc: "Classical gold-themed art, styling, and premium finishes." },
  { src: "/photos/img22.jpg", title: "Modern Exterior View", desc: "Stunning contemporary architecture and spacious private balconies." },
  { src: "/photos/img31.jpg", title: "Marble Reception Desk", desc: "Elegant reception lobby with signature premium black marble counters." },
  { src: "/photos/img25.jpg", title: "Ensuite Bathroom", desc: "Modern geometric tile designs with premium bathroom fixtures." },
  { src: "/photos/img7.jpg", title: "Deluxe Sitting Area", desc: "Relaxing layouts designed for business and corporate travelers." },
];

export default function HotelUI() {
  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isParkingHovered, setIsParkingHovered] = useState(false);
  const [isWaitingHovered, setIsWaitingHovered] = useState(false);
  const [roomsList, setRoomsList] = useState(ROOMS);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();
  const [showGallery, setShowGallery] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams, setSearchParams] = useState({
    checkIn: "2026-06-20",
    checkOut: "2026-06-25",
    guests: 2,
    roomType: "all"
  });

  // Fetch rooms from API
  React.useEffect(() => {
    setIsMounted(true);
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rooms && data.rooms.length > 0) {
          setRoomsList(data.rooms);
        }
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  // Drawer / Booking workflow states
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [extraServices, setExtraServices] = useState({
    airportTransfer: false,
    privateChef: false
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [drawerGuestName, setDrawerGuestName] = useState("");
  const [drawerPhone, setDrawerPhone] = useState("");
  const [isDrawerSubmitting, setIsDrawerSubmitting] = useState(false);

  // Event booking state
  const [eventSubmitted, setEventSubmitted] = useState(false);
  const [eventType, setEventType] = useState("Wedding Reception");
  const [eventGuests, setEventGuests] = useState("100-250");
  const [eventPhone, setEventPhone] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("2026-06-30");
  const [isEventSubmitting, setIsEventSubmitting] = useState(false);

  // Filtered rooms based on Category state
  const filteredRooms = roomsList.filter(room => {
    const matchesCategory = selectedCategory === "all" || room.category === selectedCategory;
    const matchesSearchType = searchParams.roomType === "all" || room.category === searchParams.roomType;
    return matchesCategory && matchesSearchType;
  });

  // right

  const handleRight = () => {
    setCurrentImage((prev) =>
      prev === roomsList.length - 1 ? 0 : prev + 1
    );
  };

  const handleLeft = () => {
    setCurrentImage((prev) =>
      prev === 0 ? roomsList.length - 1 : prev - 1
    );
  };

  // Toggle favorite rooms
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Check booking duration
  const date1 = new Date(searchParams.checkIn);
  const date2 = new Date(searchParams.checkOut);
  const diffTime = Math.abs(date2 - date1);
  const nightsCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Pricing math
  const calculateTotal = (room) => {
    if (!room) return 0;
    let base = room.price * nightsCount;
    if (extraServices.airportTransfer) base += 1000; // flat fee
    if (extraServices.privateChef) base += 2000 * nightsCount; // per night
    return base;
  };

  const handleStartBooking = (room) => {
    setSelectedRoom(room);
    setDrawerGuestName("");
    setDrawerPhone("");
    setExtraServices({
      airportTransfer: false,
      privateChef: false
    });
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!drawerGuestName.trim() || !drawerPhone.trim()) {
      alert("Please enter both guest name and phone number");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(drawerPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsDrawerSubmitting(true);

    const bookingPayload = {
      roomId: selectedRoom.id || selectedRoom._id,
      roomName: selectedRoom.name,
      guestName: drawerGuestName,
      phone: drawerPhone,
      checkInDate: searchParams.checkIn,
      checkInTime: "14:00",
      checkOutDate: searchParams.checkOut,
      checkOutTime: "11:00",
      totalPrice: calculateTotal(selectedRoom)
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setBookingConfirmed(true);
      } else {
        alert(data.error || "Failed to confirm booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsDrawerSubmitting(false);
    }
  };

  const handleEventInquiry = async (e) => {
    e.preventDefault();
    if (!eventPhone.trim() || !eventName.trim() || !eventDate) {
      alert("Please fill in all event inquiry details.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(eventPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsEventSubmitting(true);

    const bookingPayload = {
      roomId: `event-${eventType.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      roomName: `Event: ${eventType} (${eventGuests} Guests)`,
      guestName: eventName,
      phone: eventPhone,
      checkInDate: eventDate,
      checkInTime: "12:00",
      checkOutDate: eventDate,
      checkOutTime: "23:59",
      totalPrice: 0,
      paymentMethod: "Cash Payment"
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setEventSubmitted(true);
      } else {
        alert(data.error || "Failed to submit event inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Event inquiry submission error:", err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsEventSubmitting(false);
    }
  };

  return (
    <main>
      <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-black min-h-screen font-italic selection:bg-brand-green selection:text-white bg-[#E8F2F7] `}>

        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] md:h-[calc(100vh-4rem)] flex flex-col md:flex-row items-stretch overflow-hidden border-b border-[#E5E2DA] bg-stone-900">

          {/* Immersive Background Image with Readability Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hotel_background.png"
              alt="Luxury Hotel View"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:to-transparent"></div>
          </div>

          {/* Left Column: Text Content & Floating Form */}
          <div className="w-full md:w-[45%] bg-transparent px-6 py-12 md:py-0 sm:px-12 lg:px-16 flex flex-col justify-center relative z-10">
            <div className="max-w-md mx-auto md:mx-0 pt-8 md:pt-0">
              <span className="font-script text-brand-gold-dark text-4xl md:text-5xl block mb-2 font-semibold">
                Memorable
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.15] tracking-tight">
                Hotels for <br />
                moments <span className="font-script text-brand-gold font-semibold text-4xl sm:text-5xl lg:text-6xl inline-block mx-1">Rich</span> <br />
                in emotions
              </h1>
              <p className="text-stone-200 text-2xl sm:text-3xl md:text-4xl tracking-wide mt-6 font-script">
                Book now and get the best prices at The Corporate House
              </p>
            </div>

            {/* Floating Search Widget */}
            <div className="mt-8 md:mt-12 glass-panel rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-[180%] lg:w-[130%] max-w-full md:max-w-none mx-auto md:mx-0 relative z-20 border border-white/60 hover:border-brand-gold/30 transition-all duration-300">
              <div className="flex-1 flex flex-col gap-1 px-2">
                <span className="text-[12px] uppercase font-bold tracking-widest text-[#9C8567]">Arrival date</span>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
                  className="text-xs text-stone-700 focus:outline-none bg-transparent cursor-pointer font-medium focus:text-brand-green"
                />
              </div>

              <div className="hidden sm:block h-8 w-px bg-stone-200"></div>

              <div className="flex-1 flex flex-col gap-1 px-2">
                <span className="text-[12px] uppercase font-bold tracking-widest text-[#9C8567]">Departure date</span>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                  className="text-xs text-stone-700 focus:outline-none bg-transparent cursor-pointer font-medium focus:text-brand-green"
                />
              </div>

              <div className="hidden sm:block h-8 w-px bg-stone-200"></div>

              <div className="flex-1 flex flex-col gap-1 px-2">
                <span className="text-[12px] uppercase font-bold tracking-widest text-[#9C8567]">Number of people</span>
                <select
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                  className="text-xs text-stone-700 focus:outline-none bg-transparent cursor-pointer font-medium pr-4 focus:text-brand-green"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 People</option>
                  <option value={3}>3 People</option>
                  <option value={4}>4 People</option>
                </select>
              </div>

              <button
                onClick={() => router.push("/booking")}
                className="w-full sm:w-auto bg-gradient-x-gold-green animate-gradient-x text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-lg transition-all duration-300 whitespace-nowrap text-center shadow-lg hover:shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a Stay
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image as a Card */}
          {/* <div className="w-full md:w-[55%] flex items-center justify-center p-4 md:p-6 lg:p-8 bg-transparent relative z-10">
            <div className="w-full max-w-2xl h-[500px] md:h-[600px] relative rounded-2xl overflow-hidden border border-[#E5E2DA] shadow-2xl group"
              onMouseEnter={() => setShowGallery(true)}
              onMouseLeave={() => setShowGallery(false)}
            >
              <style>{`
              .gallery-item {
                position: absolute;
                width: 42%;
                height: 42%;
                object-fit: cover;
                border-radius: 0.75rem;
                border: 4px solid white;
                box-shadow: 0 12px 28px rgba(0,0,0,0.25);
                opacity: 0;
                z-index: 20;
                transition: opacity 1.2s ease,
                            transform 1.5s cubic-bezier(0.22, 1, 0.36, 1),
                            top 1.5s cubic-bezier(0.22, 1, 0.36, 1),
                            left 1.5s cubic-bezier(0.22, 1, 0.36, 1),
                            right 1.5s cubic-bezier(0.22, 1, 0.36, 1),
                            bottom 1.5s cubic-bezier(0.22, 1, 0.36, 1);
              }
              .gallery-0 {
                top: 30%;
                left: 30%;
                transform: rotate(0deg) scale(0.5);
              }
              .gallery-1 {
                top: 30%;
                right: 30%;
                transform: rotate(0deg) scale(0.5);
              }
              .gallery-2 {
                bottom: 30%;
                left: 30%;
                transform: rotate(0deg) scale(0.5);
              }
              .gallery-3 {
                bottom: 30%;
                right: 30%;
                transform: rotate(0deg) scale(0.5);
              }

              .group:hover .gallery-item {
                opacity: 1;
                
              }

              .group:hover .gallery-0 {
                top: 8%;
                left: 8%;
                transform: rotate(6deg) scale(1);
                  transition-delay: 120ms;
              }
              .group:hover .gallery-1 {
                top: 8%;
                right: 8%;
                transform: rotate(10deg) scale(1);
                  transition-delay: 120ms;
              }
              .group:hover .gallery-2 {
                bottom: 8%;
                left: 8%;
                transform: rotate(-6deg) scale(1);
              }
              .group:hover .gallery-3 {
                bottom: 8%;
                right: 8%;
                transform: rotate(8deg) scale(1);
              }

              .gallery-item:hover {
                transform: rotate(0deg) scale(1.18) !important;
                box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
                z-index: 50 !important;
                cursor: pointer;
                transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.8s cubic-bezier(0.25, 1, 0.5, 1);
              }
            `}</style>
              <img
                src="/photos/img19.jpg"
                alt="Hotel Corporate Room"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs transition-all duration-500 z-10 ${showGallery ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}>
                {roomsList.slice(0, 4).map((room, index) => (
                  <img
                    key={room.id || room._id}
                    src={room.image}
                    alt={room.name}
                    className={`gallery-item gallery-${index}`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div> */}
        </section>

        {/* INTRODUCTION SECTION */}
        <section className="py-16 md:py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-black leading-tight max-w-md">
                Here, local talents come together.
              </h2>
            </div>
            <div>
              <p className="text-black text-xl sm:text-2xl md:text-4xl font-script leading-relaxed mt-2 md:mt-0 max-w-lg">
                We let ourselves be inspired by the rich history as well as by contemporary artists of the city. For in the 21st century the city has so much more to offer than just medieval heritage.
              </p>
            </div>
          </div>

          {/* 3D Scroll Showcase Wrap for the dining image gallery */}
          <ContainerScroll
            titleComponent={
              <div className="mb-12">
                <span className="text-lg uppercase tracking-[0.25em] text-[#FFC72C] font-semibold">Exquisite Collection</span>
                <h3 className="text-3xl md:text-5xl font-serif text-black mt-2">Resort Artistry & Spaces</h3>
              </div>
            }
          >
            <div className="w-full h-full bg-[#8EA79A] p-4 md:p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl aspect-video md:aspect-auto md:h-44 cursor-pointer border border-[#E5E2DA]/15 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h4 className="text-[#FFC72C] text-[10px] md:text-xs font-serif font-bold tracking-wide uppercase">{img.title}</h4>
                    <p className="text-white/85 text-[8px] md:text-[10px] font-sans font-light mt-1 leading-relaxed">{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ContainerScroll>
        </section>

        {/* ROOMS CATALOG */}
        <section id="rooms" className="py-20 color-brand-cream border-y border-[#E5E2DA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

            <div className="text-center mb-16">
              <span className="text-2xl uppercase tracking-[0.25em] text-brand-green font-bold">Perfect Sanctuaries</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#1C2A22] mt-3">
                Executive Rooms & Workspaces
              </h2>
              <div className="w-12 h-0.5 bg-brand-green mx-auto mt-4"></div>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRooms.map((room) => (
                <div
                  key={room.id || room._id}
                  className="group bg-card-gradient border border-[#E5E2DA]/20 rounded-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)] hover:border-brand-radishblack hover:bg-wooden"
                >
                  {/* Image Wrap */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent opacity-85"></div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(room.id || room._id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorites.includes(room.id || room._id) ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div className="flex items-center gap-1 text-white text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold">{room.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold font-serif text-white transition-colors mb-2">
                        {room.name}
                      </h3>
                      <p className="text-stone-200 text-xs font-normal mb-4 line-clamp-2 leading-relaxed transition-colors duration-300">
                        {room.description}
                      </p>

                      {/* Room Info tags */}
                      <div className="flex items-center gap-2 text-stone-300 text-[10px] mb-2 pb-3 border-b border-white/10 font-semibold transition-colors duration-300">
                        <span>{room.size}</span>
                        <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                        <span>{room.guests}</span>
                        <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                        <span>{room.bed}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push("/package")}
                      className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-x-gold-green animate-gradient-x hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300 text-center"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* AMENITIES SECTION */}
        <section className="py-20 relative overflow-hidden">
          {/* Radial Glow Background Effect */}
          <div className="absolute inset-0 bg-radial-glow-radishblack pointer-events-none z-0"></div>

          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-[0.25em] text-brand-radishblack font-bold block">The Luxury Experience</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-black mt-3">
                Unrivaled Amenities
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {AMENITIES.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-card-gradient border border-[#E5E2DA]/20 p-8 rounded-xl hover:border-brand-radishblack hover:bg-wooden -translate-y-0 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)] cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/10 text-white flex items-center justify-center mb-5 group-hover:bg-gradient-to-r group-hover:from-brand-gold-dark group-hover:to-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-brand-gold/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-serif text-white mb-2 transition-colors duration-300">
                      {amenity.name}
                    </h3>
                    <p className="text-white/80 text-xs font-normal leading-relaxed transition-colors duration-300">
                      {amenity.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GOURMET FOOD SECTION */}
        <section id="gourmet-food" className="py-20 color-brand-cream border-t border-[#E5E2DA] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-green font-bold block">Gastronomic Artistry</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-black mt-3">
                Signature Culinary Creations
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FOOD_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card-gradient border border-[#E5E2DA]/20 rounded-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)] hover:border-brand-radishblack hover:bg-wooden"
                >
                  {/* Image Wrap */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85"></div>
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-brand-green shadow-sm">
                      {item.category}
                    </span>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-850 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-white transition-colors mb-2">
                        {item.name}
                      </h3>
                      <p className="text-white/85 text-xs font-normal leading-relaxed transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANQUET & WEDDING SECTION */}
        <section id="events" className="py-24 bg-[#E8F2F7] border-t border-[#C5A880]/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

            {/* Centered Headers */}
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#5C1A24] font-bold block">Celebrations & Galas</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1E1C1A] mt-3">
                Grand Venues & Royal Occasions
              </h2>
              <p className="text-brand-green text-sm font-light mt-2 max-w-2xl mx-auto">
                Host your monumental celebrations, weddings, milestone birthdays, or elite corporate gatherings in our beautifully styled palaces.
              </p>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto mt-4"></div>
            </div>

            {/* Asymmetric 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

              {/* Card 1: Weddings */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl h-[420px] border border-[#C5A880]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#C5A880]/15">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                  alt="Royal Weddings"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D10]/90 via-[#1A0D10]/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block mb-1">Tailored Receptions</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Royal Weddings</h3>
                  <p className="text-stone-300 text-xs font-light mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Bespoke floral design, grand entrance settings, and customized layouts for your memorable union.
                  </p>
                </div>
              </div>

              {/* Card 2: Birthdays */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl h-[420px] border border-[#C5A880]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#C5A880]/15">
                <img
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80"
                  alt="Milestone Birthdays"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D10]/90 via-[#1A0D10]/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block mb-1">Bespoke Galas</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Milestone Birthdays</h3>
                  <p className="text-stone-300 text-xs font-light mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Host memorable private birthday celebrations with elegant table setups, live music, and palace catering.
                  </p>
                </div>
              </div>

              {/* Card 3: Corporate Banquets */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl h-[420px] border border-[#C5A880]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#C5A880]/15">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
                  alt="Palace Banquets"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D10]/90 via-[#1A0D10]/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block mb-1">Executive Meets</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Palace Banquets</h3>
                  <p className="text-stone-300 text-xs font-light mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Sophisticated convention centers, premium catering, and high-speed tech setups for corporate summits.
                  </p>
                </div>
              </div>

            </div>

            {/* Event Inquiry Form Desk */}
            <div className="max-w-4xl mx-auto p-8 bg-[#1A0D10] border border-[#C5A880]/30 rounded-2xl shadow-2xl text-white">
              {!eventSubmitted ? (
                <form onSubmit={handleEventInquiry} className="space-y-6">
                  <div className="text-center pb-4 border-b border-[#C5A880]/20">
                    <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">
                      Connect with our Palace Event Planner
                    </h4>
                    <p className="text-[10px] text-stone-400 mt-1 font-light">Custom tailor your catering, guest counts, and banquet settings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="bg-[#241A1C] border border-[#C5A880]/25 rounded-md px-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="Phone number"
                        value={eventPhone}
                        onChange={(e) => setEventPhone(e.target.value)}
                        className="bg-[#241A1C] border border-[#C5A880]/25 rounded-md px-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Event Date</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="bg-[#241A1C] border border-[#C5A880]/25 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer text-stone-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Event Type</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="bg-[#241A1C] border border-[#C5A880]/25 rounded-md px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer text-stone-300"
                      >
                        <option value="Wedding Reception">Wedding Ceremony</option>
                        <option value="Birthday & Family Function">Birthday Celebration</option>
                        <option value="Corporate Gala">Corporate Banquet</option>
                        <option value="Conferences & Seminars">Seminar/Conference</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Estimated Guests</label>
                      <select
                        value={eventGuests}
                        onChange={(e) => setEventGuests(e.target.value)}
                        className="bg-[#241A1C] border border-[#C5A880]/25 rounded-md px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer text-stone-300"
                      >
                        <option value="0-50">0 - 50 Guests</option>
                        <option value="50-100">50 - 100 Guests</option>
                        <option value="100-250">100 - 250 Guests</option>
                        <option value="250-500">250 - 500 Guests</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C5A880] hover:bg-[#B59870] text-[#1E1C1A] text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 shadow-md hover:shadow-[#C5A880]/25"
                  >
                    Send Inquiries to Palace Concierge
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center mx-auto border border-[#C5A880]/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-[#C5A880] text-base font-semibold">Inquiry Submitted Successfully!</h4>
                    <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                      Thank you, {eventName}. Your request for {eventType} ({eventGuests} guests) is registered. A coordinator will call you back shortly at {eventPhone}.
                    </p>
                  </div>
                  <button
                    onClick={() => setEventSubmitted(false)}
                    className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* SECURE PARKING SECTION */}
        <section id="parking" className="py-24 bg-gradient-to-b from-[#FAF8F5] to-[#F5EFEB] border-t border-[#C5A880]/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className={`flex flex-col lg:flex-row items-center w-full lg:h-[550px] transition-all duration-700 ease-in-out ${isParkingHovered ? "gap-0" : "gap-16"}`}>

              {/* Left Column: Parking Image */}
              <div
                onMouseEnter={() => setIsParkingHovered(true)}
                onMouseLeave={() => setIsParkingHovered(false)}
                className={`relative h-[280px] sm:h-[400px] lg:h-[550px] p-[6px] bg-[#1A0D10] border border-[#C5A880]/40 shadow-2xl shadow-black/60 order-2 lg:order-1 transition-all duration-700 ease-in-out cursor-pointer ${isParkingHovered ? "w-full lg:w-full rounded-[40px]" : "w-full lg:w-[58%] rounded-2xl"
                  }`}
              >
                <div className={`relative w-full h-full overflow-hidden transition-all duration-700 ease-in-out ${isParkingHovered ? "rounded-[36px]" : "rounded-xl"}`}>
                  <img
                    src="/photos/img28.jpg"
                    alt="Secure Parking"
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isParkingHovered ? "rounded-[36px]" : "rounded-xl"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D10]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-1">Palace Transit</span>
                    <span className="text-xl font-serif text-white font-semibold tracking-wide">24/7 Monitored Parking</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className={`order-1 lg:order-2 text-black transition-all duration-700 ease-in-out ${isParkingHovered ? "lg:w-0 lg:opacity-0 lg:scale-95 lg:overflow-hidden lg:pointer-events-none" : "w-full lg:w-[38%] opacity-100"
                }`}>
                <span className="text-xs uppercase tracking-[0.25em] text-[#5C1A24] font-bold block">Seamless Access</span>
                <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#1E1C1A] mt-2 tracking-tight">
                  Secure & Spacious Parking
                </h2>
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#C5A880] to-transparent mt-4 mb-6"></div>
                <p className="text-stone-650 text-sm leading-relaxed mb-8 font-bold">
                  Enjoy peace of mind with our secure, multi-level underground parking and open-air valet areas. Specially designed for corporate events and long-term executive stays, our facilities feature round-the-clock security surveillance and EV charging ports.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C1A24] to-[#1A0D10] text-[#C5A880] flex items-center justify-center flex-shrink-0 border border-[#C5A880]/30 shadow-md mt-1">
                      <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-serif text-[#1E1C1A]">CCTV & Valet Service</h4>
                      <p className="text-stone-600 text-xs font-semibold mt-1 leading-relaxed">Round-the-clock monitoring and professional valet services to ensure your vehicle is safe and accessible.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C1A24] to-[#1A0D10] text-[#C5A880] flex items-center justify-center flex-shrink-0 border border-[#C5A880]/30 shadow-md mt-1">
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-serif text-[#1E1C1A]">EV Charging Stations</h4>
                      <p className="text-stone-600 text-xs font-semibold mt-1 leading-relaxed">High-speed charging bays compatible with all major electric vehicle models for eco-conscious travelers.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SIGNATURE DINING SECTION */}
        <section id="dining" className="py-24 bg-gradient-to-b from-[#FAF8F5] to-[#F5EFEB] border-t border-[#C5A880]/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className={`flex flex-col lg:flex-row items-center w-full lg:h-[550px] transition-all duration-700 ease-in-out ${isWaitingHovered ? "gap-0" : "gap-16"}`}>
              {/* Left Column: Details */}
              <div className={`text-black transition-all duration-700 ease-in-out ${isWaitingHovered ? "lg:w-0 lg:opacity-0 lg:scale-95 lg:overflow-hidden lg:pointer-events-none" : "w-full lg:w-[46%] opacity-100"}`}>
                <span className="text-xs uppercase tracking-[0.25em] text-[#5C1A24] font-bold block">Sophisticated Comfort</span>
                <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#1E1C1A] mt-2 tracking-tight">
                  Executive Waiting Room & Lounge
                </h2>
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#C5A880] to-transparent mt-4 mb-6"></div>
                <p className="text-stone-650 text-sm leading-relaxed mb-8 font-bold">
                  Relax or remain productive in our signature corporate waiting rooms and transit lounges. Designed for incoming executives and busy travelers, our lounges offer private workstations, high-speed connectivity, and curated refreshments.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C1A24] to-[#1A0D10] text-[#C5A880] flex items-center justify-center flex-shrink-0 border border-[#C5A880]/30 shadow-md mt-1">
                      <Star className="w-4 h-4 text-[#C5A880] fill-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-serif text-[#1E1C1A]">Luxe Transit - Transit Seating</h4>
                      <p className="text-stone-600 text-xs font-semibold mt-1 leading-relaxed">Plush leather armchairs, quiet alcoves, and presentation screens for pre-check-in meetings.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C1A24] to-[#1A0D10] text-[#C5A880] flex items-center justify-center flex-shrink-0 border border-[#C5A880]/30 shadow-md mt-1">
                      <Flame className="w-4 h-4 text-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-serif text-[#1E1C1A]">Bespoke Refreshments - Sip & Connect</h4>
                      <p className="text-stone-600 text-xs font-semibold mt-1 leading-relaxed">Complimentary single-origin coffees, fresh botanical teas, and light pastries served daily.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Waiting Image */}
              <div
                onMouseEnter={() => setIsWaitingHovered(true)}
                onMouseLeave={() => setIsWaitingHovered(false)}
                className={`relative h-[280px] sm:h-[400px] lg:h-[550px] p-[6px] bg-[#1A0D10] border border-[#C5A880]/40 shadow-2xl shadow-black/60 order-2 lg:order-1 transition-all duration-700 ease-in-out cursor-pointer perspective-[1000px] hover:scale-[1.03] hover:[transform:rotateY(-6deg)_rotateX(4deg)] hover:shadow-black/75 will-change-transform isolation-isolate ${isWaitingHovered ? "w-full lg:w-full rounded-[40px]" : "w-full lg:w-[50%] rounded-2xl"
                  }`}
              >
                <div className={`relative w-full h-full overflow-hidden transition-all duration-700 ease-in-out ${isWaitingHovered ? "rounded-[36px]" : "rounded-xl"}`}>
                  <img
                    src="/photos/img34.jpg"
                    alt="Executive Lounge"
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isWaitingHovered ? "rounded-[36px]" : "rounded-xl"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#1C2A22] text-[#EFECE6] py-16 border-t border-[#2A4E3F]/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <span className="text-2xl font-serif font-bold tracking-wide text-white">
                The Corporate House
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A5B3AC] block mt-1">
                HOTEL & WORKSPACE
              </span>
              <p className="text-[#A5B3AC] text-xs font-light mt-4 leading-relaxed max-w-xs">
                Sophisticated rooms and premium business amenities designed for modern corporate travelers seeking productivity and premium relaxation.
              </p>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Navigations</h5>
              <ul className="space-y-2 text-[#A5B3AC] text-xs font-light">
                <li><a href="#rooms" className="hover:text-white transition-colors">Accommodations</a></li>
                <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
                <li><a href="#dining" className="hover:text-white transition-colors">Dining</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Contact</h5>
              <ul className="space-y-2 text-[#A5B3AC] text-xs font-light">
                <li>bookings@thecorporatehouse.com</li>
                <li>+91 9304868696</li>
                <li>Argoda Chawk, Ranchi</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Boutique Standard</h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded bg-[#2A4E3F]/40 border border-[#2A4E3F]/30 text-white text-[10px] font-bold">5-Star Gold</span>
                <span className="px-3 py-1 rounded bg-[#2A4E3F]/40 border border-[#2A4E3F]/30 text-white text-[10px] font-bold">EcoLuxury Certified</span>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-8 border-t border-[#2A4E3F]/20 flex flex-col md:flex-row justify-between text-[#A5B3AC] text-xs font-light">
            <span>© 2026 The Corporate House. All rights reserved.</span>
            <span className="hover:text-white cursor-pointer transition-colors mt-2 md:mt-0">Privacy Policy • Terms of Service</span>
          </div>
        </footer>

        {/* INTERACTIVE BOOKING DRAWER (SLIDE-OVER PANEL) */}
        {selectedRoom && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <div
              onClick={() => setSelectedRoom(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-lg">
                <div className="flex h-full flex-col overflow-y-scroll bg-white border-l border-[#E5E2DA] shadow-2xl">

                  {/* Header */}
                  <div className="px-6 py-6 bg-[#F9F6F0] border-b border-[#E5E2DA] sticky top-0 z-10 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-[#1C2A22] uppercase tracking-wide">
                        Booking Request
                      </h2>
                      <p className="text-stone-500 text-xs font-light">Customize your stay at The Corporate House</p>
                    </div>
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="rounded-full w-8 h-8 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className="flex-1 px-6 py-6 space-y-6">

                    {/* Booking details card */}
                    <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E5E2DA] flex gap-4">
                      <img
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-[#1C2A22] font-serif font-bold text-sm">{selectedRoom.name}</h4>
                        <p className="text-[10px] text-stone-500 uppercase mt-1">{selectedRoom.size} • {selectedRoom.bed}</p>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-brand-green font-bold text-base font-serif">₹{selectedRoom.price}</span>
                          <span className="text-[10px] text-stone-500">/ night</span>
                        </div>
                      </div>
                    </div>

                    {!bookingConfirmed ? (
                      <form onSubmit={handleConfirmBooking} className="space-y-6">

                        {/* Guest Name */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Guest Name</label>
                          <input
                            type="text"
                            required
                            value={drawerGuestName}
                            onChange={(e) => setDrawerGuestName(e.target.value)}
                            placeholder="Enter your full name"
                            className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-3 py-2.5 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Phone Number</label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                            title="Please enter a valid 10-digit phone number"
                            value={drawerPhone}
                            onChange={(e) => setDrawerPhone(e.target.value)}
                            placeholder="Enter 10-digit phone number"
                            className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-3 py-2.5 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
                          />
                        </div>

                        {/* Dates Selector */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Arrival</label>
                            <input
                              type="date"
                              value={searchParams.checkIn}
                              onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
                              className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Departure</label>
                            <input
                              type="date"
                              value={searchParams.checkOut}
                              onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                              className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
                              required
                            />
                          </div>
                        </div>

                        {/* Nights and Guest Tally */}
                        <div className="p-3 bg-[#F9F6F0] rounded-lg border border-[#E5E2DA] flex items-center justify-between text-xs text-stone-600">
                          <span>Staying for <strong className="text-brand-green">{nightsCount} night{nightsCount > 1 ? "s" : ""}</strong></span>
                          <div className="flex items-center gap-2">
                            <span>Guests:</span>
                            <div className="flex items-center gap-1 bg-white rounded-md p-1 border border-[#E5E2DA]">
                              <button
                                type="button"
                                onClick={() => setSearchParams(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                                className="w-5 h-5 text-stone-500 hover:text-stone-800 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="w-4 text-center font-bold text-brand-green text-xs">{searchParams.guests}</span>
                              <button
                                type="button"
                                onClick={() => setSearchParams(prev => ({ ...prev, guests: Math.min(6, prev.guests + 1) }))}
                                className="w-5 h-5 text-stone-500 hover:text-stone-800 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Bespoke Add-ons */}
                        <div className="space-y-3">
                          <h5 className="text-xs uppercase font-bold tracking-wider text-stone-400">Bespoke Add-ons</h5>

                          {/* Airport Transfer */}
                          <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${extraServices.airportTransfer
                            ? "bg-brand-green/5 border-brand-green/40"
                            : "bg-stone-50 border-[#E5E2DA] hover:bg-stone-100"
                            }`}>
                            <input
                              type="checkbox"
                              checked={extraServices.airportTransfer}
                              onChange={(e) => setExtraServices(prev => ({ ...prev, airportTransfer: e.target.checked }))}
                              className="mt-1 accent-brand-green"
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-stone-800">Luxury Airport Chauffeur</span>
                                <span className="text-xs font-bold text-brand-green">+₹1,000</span>
                              </div>
                              <p className="text-[10px] text-stone-500 font-light mt-0.5">Private Mercedes S-Class pickup directly from tarmac.</p>
                            </div>
                          </label>

                          {/* Private Chef */}
                          <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${extraServices.privateChef
                            ? "bg-brand-green/5 border-brand-green/40"
                            : "bg-stone-50 border-[#E5E2DA] hover:bg-stone-100"
                            }`}>
                            <input
                              type="checkbox"
                              checked={extraServices.privateChef}
                              onChange={(e) => setExtraServices(prev => ({ ...prev, privateChef: e.target.checked }))}
                              className="mt-1 accent-brand-green"
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-stone-800">In-villa Private Chef Service</span>
                                <span className="text-xs font-bold text-brand-green">+₹2,000 / night</span>
                              </div>
                              <p className="text-[10px] text-stone-500 font-light mt-0.5">Michelin-star chef preparing bespoke gourmet menus in your villa.</p>
                            </div>
                          </label>
                        </div>

                        {/* Summary & Price Math */}
                        <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E5E2DA] space-y-2 text-xs">
                          <h5 className="font-bold text-stone-700 border-b border-[#E5E2DA] pb-2 mb-2 uppercase tracking-wide text-[10px]">
                            Price Breakdown
                          </h5>
                          <div className="flex justify-between text-stone-500">
                            <span>Base Stay (₹{selectedRoom.price} × {nightsCount} nights)</span>
                            <span>₹{selectedRoom.price * nightsCount}</span>
                          </div>
                          {extraServices.airportTransfer && (
                            <div className="flex justify-between text-stone-500">
                              <span>Airport Transfer</span>
                              <span>₹1,000</span>
                            </div>
                          )}

                          {extraServices.privateChef && (
                            <div className="flex justify-between text-stone-500">
                              <span>Private Chef Service (₹2,000 × {nightsCount} nights)</span>
                              <span>₹{2000 * nightsCount}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-brand-green text-sm border-t border-[#E5E2DA] pt-2 mt-2">
                            <span>Total Amount Due</span>
                            <span>₹{calculateTotal(selectedRoom)}</span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-hover transition-colors duration-200"
                        >
                          Confirm Booking Request
                        </button>

                      </form>
                    ) : (
                      // Booking Confirmed Success UI
                      <div className="text-center py-12 space-y-6">
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/20">
                          <Clock className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-serif font-bold text-[#1C2A22]">Request Submitted!</h3>
                          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                            Your reservation request for the {selectedRoom.name} is pending admin verification. You will be notified once the request has been reviewed.
                          </p>
                        </div>

                        <div className="p-4 bg-[#F9F6F0] border border-[#E5E2DA] rounded-xl max-w-sm mx-auto text-left space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-stone-500">Status:</span>
                            <span className="text-amber-600 font-bold uppercase tracking-wider text-[10px]">Pending Verification</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Guest Phone:</span>
                            <span className="text-stone-850 font-bold">{drawerPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Accommodation:</span>
                            <span className="text-stone-850 font-bold">{selectedRoom.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Dates:</span>
                            <span className="text-stone-850 font-bold">{searchParams.checkIn} to {searchParams.checkOut}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Total Price:</span>
                            <span className="text-brand-green font-bold">₹{calculateTotal(selectedRoom)}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedRoom(null)}
                          className="w-full max-w-xs py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-stone-600 bg-white hover:bg-stone-50 border border-[#E5E2DA] transition-colors"
                        >
                          Back to Resort Homepage
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );

}