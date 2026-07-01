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
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80",
    description: "House-made fettuccine tossed in a rich, creamy parmigiano-reggiano and butter emulsion, generously topped with freshly shaved Italian black winter truffles and micro-greens.",
    tags: ["Chef Recommended", "Vegetarian"]
  },
  {
    id: "royal-butter-chicken",
    name: "Royal Butter Chicken",
    category: "Signature Entrées",
    price: 1650,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Tender boneless chicken roasted in our clay tandoor, simmered in a rich, velvety tomato and cashew nut gravy, finished with fresh cream and dried fenugreek leaves.",
    tags: ["Palace Classic", "Gluten Free"]
  },
  {
    id: "wagyu-steak",
    name: "A5 Wagyu Ribeye",
    category: "Palace Specials",
    price: 6450,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    description: "Highly marbled Japanese A5 Wagyu ribeye seared on volcanic stones, served with roasted garlic puree, wild forest chanterelles, and a delicate 24-karat edible gold leaf garnish.",
    tags: ["Ultra Premium", "Best Seller"]
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    category: "Signature Entrées",
    price: 1450,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Fresh cubes of cottage cheese cooked in a smooth, mildly spiced creamy tomato gravy, delicately seasoned with cardamom and garnishing of fresh coriander.",
    tags: ["Vegetarian", "Best Seller"]
  },
  {
    id: "saffron-kulfi",
    name: "Imperial Saffron Kulfi",
    category: "Decadent Desserts",
    price: 1100,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    description: "Traditional slow-churned Indian milk dessert infused with finest Kashmiri saffron, pistachios, and green cardamom, adorned with delicate edible silver foil (varq).",
    tags: ["Royal Sweet"]
  },
  {
    id: "chocolate-souffle",
    name: "Warm Chocolate Soufflé",
    category: "Decadent Desserts",
    price: 950,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    description: "Classic French soufflé baked to light, airy perfection with a decadent molten dark chocolate core, dusted with powdered sugar and served alongside Madagascar vanilla bean ice cream.",
    tags: ["Classic French", "Baked Fresh"]
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
  const [selectedFoodCategory, setSelectedFoodCategory] = useState("All");
  const [roomsList, setRoomsList] = useState(ROOMS);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();
  const [showGallery, setShowGallery] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams, setSearchParams] = useState({
    checkIn: "2026-06-20",
    checkOut: "2026-06-25",
    guests: 2,
    roomType: "all"
  });

  // Fetch rooms from API
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
                ℍ𝕆𝕋𝔼𝕃 for <br />
                moments <span className="font-script text-brand-gold font-semibold text-4xl sm:text-5xl lg:text-6xl inline-block mx-1">Rich</span> <br />
                in emotions
              </h1>
              <p className="text-stone-200 text-2xl sm:text-3xl md:text-4xl tracking-wide mt-6 font-script">
                Book now and get the best prices at ℍ𝕆𝕋𝔼𝕃 The Corporate House
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

          
        </section>

        {/* INTRODUCTION SECTION */}
       

        {/* Gallery Section - Full-Width Carousel */}
        <section className="w-full py-2 bg-transparent bg-[#E8F2F7]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center mb-10">
            <span className="text-[#C5A880] text-sm md:text-base font-bold uppercase tracking-[0.25em]">Exquisite Collection</span>
            <h3 className="text-3xl md:text-5xl font-serif text-black mt-3">Artistry & Spaces</h3>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4"></div>
          </div>

          {/* Slider Container - Full bleed edge-to-edge */}
          <div className="relative mx-auto w-full max-w-[1580px] h-[320px] sm:h-[450px] md:h-[580px] overflow-hidden group bg-stone-900 shadow-2xl sm:rounded-2xl">
            {/* Slides */}
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  idx === activeSlideIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="object-cover w-full h-full transform transition-transform duration-[8000ms] ease-out group-hover:scale-105"
                />
                {/* Subtle vignette/shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                
                {/* Glassmorphic Caption Card */}
                <div className={`absolute bottom-4 left-4 right-4 md:bottom-12 md:left-16 md:right-auto md:max-w-md bg-black/50 backdrop-blur-md p-3 sm:p-5 md:p-6 rounded-lg sm:rounded-2xl border border-white/10 text-white transition-all duration-700 transform z-20 ${
                  idx === activeSlideIndex ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}>
                  <span className="text-[9px] sm:text-xs uppercase tracking-widest text-[#FFC72C] font-semibold">Slide {idx + 1} of {GALLERY_IMAGES.length}</span>
                  <h4 className="text-sm sm:text-lg md:text-2xl font-serif font-bold mt-0.5 sm:mt-1 text-[#FFC72C]">{img.title}</h4>
                  <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-sans font-light mt-0.5 sm:mt-2 leading-relaxed">{img.desc}</p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveSlideIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/15 transition-all duration-300 transform scale-75 sm:scale-100 hover:scale-105 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setActiveSlideIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/15 transition-all duration-300 transform scale-75 sm:scale-100 hover:scale-105 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators / Dots */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-12 md:right-16 z-30 flex items-center gap-2">
              {GALLERY_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeSlideIndex ? "w-6 bg-[#FFC72C]" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{ transitionProperty: "all" }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ROOMS CATALOG */}
        <section id="rooms" className="py-20 bg-[#E8F2F7] border-y border-[#E5E2DA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 ">

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
                  className="room-card group bg-card-gradient rounded-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)] hover:bg-wooden"
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
                    className="disable-shine group bg-card-gradient border border-[#E5E2DA]/20 p-8 rounded-xl hover:bg-wooden -translate-y-0 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)] cursor-pointer"
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
            <div className="text-center mb-12">
              <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C5A880] font-extrabold block">Gastronomic Artistry</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-black mt-3 italic">
                Signature Culinary Creations
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light mt-4 max-w-2xl mx-auto leading-relaxed">
                Indulge in award-winning dining curated by our master chefs, featuring the finest seasonal ingredients and artisanal presentation.
              </p>
              <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto mt-6"></div>
            </div>

            {/* Menu Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {["All", "Signature Entrées", "Decadent Desserts", "Palace Specials"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFoodCategory(cat)}
                  className={`px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-bold tracking-widest transition-all duration-300 border ${
                    selectedFoodCategory === cat
                      ? "bg-gradient-to-r from-[#9C8567] to-[#C5A880] text-white border-transparent shadow-lg shadow-brand-gold/20 scale-105"
                      : "bg-white text-brand-green border-brand-green/10 hover:bg-brand-green/5 hover:border-brand-green/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FOOD_ITEMS.filter(
                (item) => selectedFoodCategory === "All" || item.category === selectedFoodCategory
              ).map((item) => (
                <div
                  key={item.id}
                  className="disable-shine group bg-card-gradient border border-[#E5E2DA]/20 rounded-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)] hover:bg-wooden"
                >
                  {/* Image Wrap */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
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
                      <div className="flex justify-between items-baseline gap-2 mb-2">
                        <h3 className="text-lg font-bold font-serif text-white transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-base font-serif font-bold text-[#FFC72C] shrink-0">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      
                      <p className="text-white/85 text-xs font-normal leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Tag badges */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.tags.map((tag, i) => (
                            <span key={i} className="text-[9px] font-sans font-medium px-2 py-0.5 rounded bg-white/10 text-stone-200 border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[10px] text-[#FFC72C] uppercase tracking-widest font-sans font-bold">★ Freshly Prepared</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Reservation Callout */}
         

          </div>
        </section>

        {/* BANQUET & WEDDING SECTION */}
        <section id="events" className="py-24 bg-[#E8F2F7] border-t border-[#C5A880]/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

            {/* Centered Headers */}
            <div className="text-center mb-16">
              <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C5A880] font-extrabold block">Celebrations & Galas</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#1E1C1A] mt-3 italic">
                Grand Venues & Royal Occasions
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light mt-4 max-w-2xl mx-auto leading-relaxed">
                Host your monumental celebrations, weddings, milestone birthdays, or elite corporate gatherings in our beautifully styled palaces.
              </p>
              <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto mt-6"></div>
            </div>

            {/* Asymmetric 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

              {/* Card 1: Weddings */}
              <div className="disable-shine group relative rounded-2xl overflow-hidden shadow-2xl h-[420px] border border-[#C5A880]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#C5A880]/15">
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
              <div className="disable-shine group relative rounded-2xl overflow-hidden shadow-2xl h-[420px] border border-[#C5A880]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#C5A880]/15">
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
              <div className="disable-shine group relative rounded-2xl overflow-hidden shadow-2xl h-[420px] border border-[#C5A880]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#C5A880]/15">
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
            <div className="max-w-4xl mx-auto p-8 bg-card-gradient from-[#1F3A2E] to-[#12241C] border border-[#C5A880]/30 rounded-3xl shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              {!eventSubmitted ? (
                <form onSubmit={handleEventInquiry} className="space-y-8 relative z-10">
                  <div className="text-center pb-6 border-b border-[#C5A880]/20">
                    <h4 className="text-sm uppercase tracking-[0.2em] text-[#C5A880] font-bold">
                      Connect with our Palace Event Planner
                    </h4>
                    <p className="text-xs text-stone-300 mt-2 font-light">Custom tailor your catering, guest counts, and banquet settings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-end">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="bg-[#172D24] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="Phone number"
                        value={eventPhone}
                        onChange={(e) => setEventPhone(e.target.value)}
                        className="bg-[#172D24] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Event Date</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="bg-[#172D24] border border-[#C5A880]/30 rounded-xl px-4 py-2.5 text-xs text-stone-300 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 transition-all cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Event Type</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="bg-[#172D24] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-xs text-stone-300 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 transition-all cursor-pointer"
                      >
                        <option value="Wedding Reception">Wedding Ceremony</option>
                        <option value="Birthday & Family Function">Birthday Celebration</option>
                        <option value="Corporate Gala">Corporate Banquet</option>
                        <option value="Conferences & Seminars">Seminar/Conference</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Estimated Guests</label>
                      <select
                        value={eventGuests}
                        onChange={(e) => setEventGuests(e.target.value)}
                        className="bg-[#172D24] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-xs text-stone-300 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 transition-all cursor-pointer"
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
                    className="w-full py-4 bg-gradient-to-r from-[#9C8567] via-[#C5A880] to-[#9C8567] hover:brightness-110 text-[#1E1C1A] text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#C5A880]/20 active:scale-[0.99]"
                  >
                    Send Inquiries to Palace Concierge
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center mx-auto border border-[#C5A880]/30 shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-[#C5A880] tracking-wide">Inquiry Submitted Successfully!</h4>
                    <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-light">
                      Thank you, <span className="font-semibold text-white">{eventName}</span>. Your request for {eventType} ({eventGuests} guests) is registered. A coordinator will call you back shortly at <span className="font-semibold text-white">{eventPhone}</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => setEventSubmitted(false)}
                    className="text-xs uppercase font-bold tracking-widest text-[#C5A880] hover:text-[#e5ccaa] transition-colors hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* SECURE PARKING SECTION */}
        <section id="parking" className="py-24 bg-[#E8F2F7] border-t border-[#C5A880]/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center w-full gap-12 md:gap-16">

              {/* Left Column: Parking Image Card */}
              <div className="relative w-full lg:w-[55%] h-[300px] sm:h-[420px] lg:h-[500px] shadow-2xl group rounded-2xl overflow-hidden border border-[#C5A880]/30 cursor-pointer order-2 lg:order-1">
                {/* Thin golden outline border overlay for luxury aesthetic */}
                <div className="absolute inset-4 border border-[#C5A880]/25 rounded-lg pointer-events-none z-20 group-hover:border-[#C5A880]/50 transition-all duration-500"></div>
                
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/photos/img28.jpg"
                    alt="Secure Parking"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D10]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-1">Palace Transit</span>
                    <span className="text-xl font-serif text-white font-semibold tracking-wide">24/7 Monitored Parking</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="w-full lg:w-[40%] text-black order-1 lg:order-2">
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
        <section id="dining" className="py-24 bg-[#E8F2F7] border-t border-[#C5A880]/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center w-full gap-12 md:gap-16">
              
              {/* Left Column: Details */}
              <div className="w-full lg:w-[40%] text-black order-2 lg:order-1">
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

              {/* Right Column: Waiting Image Card */}
              <div className="relative w-full lg:w-[55%] h-[300px] sm:h-[420px] lg:h-[500px] shadow-2xl group rounded-2xl overflow-hidden border border-[#C5A880]/30 cursor-pointer order-1 lg:order-2">
                {/* Thin golden outline border overlay for luxury aesthetic */}
                <div className="absolute inset-4 border border-[#C5A880]/25 rounded-lg pointer-events-none z-20 group-hover:border-[#C5A880]/50 transition-all duration-500"></div>

                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/photos/img34.jpg"
                    alt="Executive Lounge"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D10]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-1">Palace Transit</span>
                    <span className="text-xl font-serif text-white font-semibold tracking-wide">Transit Seating & Lounge</span>
                  </div>
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
                ℍ𝕆𝕋𝔼𝕃 The Corporate House
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
            <span>© 2026 ℍ𝕆𝕋𝔼𝕃 The Corporate House. All rights reserved.</span>
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