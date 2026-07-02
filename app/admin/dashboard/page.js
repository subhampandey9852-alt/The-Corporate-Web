"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Calendar,
  Users,
  Bed,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Image as ImageIcon,
  Sparkles,
  MessageSquare,
  Mail,
  BarChart3,
  TrendingDown,
  ChevronRight,
  Filter
} from "lucide-react";


export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard', 'bookings', 'rooms', or 'queries'
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Forms states
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [roomForm, setRoomForm] = useState({
    name: "",
    category: "rooms",
    price: "",
    image: "",
    description: "",
    size: "",
    guests: "",
    bed: "",
    features: ""
  });

  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    document.body.style.backgroundColor = "#E8F2F7";
    setHasHover(window.matchMedia("(hover: hover)").matches);
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch bookings first (this acts as the auth check)
      const resBookings = await fetch("/api/booking");
      if (!resBookings.ok) {
        setAuthError(true);
        router.push("/admin");
        return;
      }
      const dataBookings = await resBookings.json();
      if (dataBookings.success) {
        setBookings(dataBookings.bookings);
      }

      // Fetch rooms
      const resRooms = await fetch("/api/rooms");
      const dataRooms = await resRooms.json();
      if (dataRooms.success) {
        setRooms(dataRooms.rooms);
      }

      // Fetch queries
      const resQueries = await fetch("/api/queries");
      const dataQueries = await resQueries.json();
      if (dataQueries.success) {
        setQueries(dataQueries.queries);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setAuthError(true);
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      window.location.href = "/admin";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Booking action handlers
  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      const response = await fetch("/api/booking", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        // Update state
        setBookings(prev => prev.map(b => (b.id === id || b._id === id) ? { ...b, status: newStatus } : b));
      }
    } catch (err) {
      console.error("Failed to update booking status:", err);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this booking record?")) return;

    try {
      const response = await fetch(`/api/booking?id=${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        // Remove from bookings list
        setBookings(prev => prev.filter(b => (b.id !== id && b._id !== id)));
      } else {
        alert(data.error || "Failed to delete booking.");
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  // Room action handlers
  const handleOpenRoomModal = (mode, room = null) => {
    setModalMode(mode);
    if (mode === "edit" && room) {
      setCurrentRoomId(room.id || room._id);
      setRoomForm({
        name: room.name,
        category: room.category,
        price: room.price,
        image: room.image,
        description: room.description,
        size: room.size,
        guests: room.guests,
        bed: room.bed,
        features: Array.isArray(room.features) ? room.features.join(", ") : room.features
      });
    } else {
      setCurrentRoomId(null);
      setRoomForm({
        name: "",
        category: "rooms",
        price: "",
        image: "/photos/img4.jpg",
        description: "",
        size: "35 m²",
        guests: "Up to 2 Guests",
        bed: "1 Double Bed",
        features: "Individual Air Conditioning, Modern Wardrobe, Wi-Fi"
      });
    }
    setShowRoomModal(true);
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...roomForm,
      features: roomForm.features.split(",").map(f => f.trim()).filter(Boolean)
    };

    try {
      let url = "/api/rooms";
      let method = "POST";

      if (modalMode === "edit") {
        formattedData.id = currentRoomId;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData)
      });
      const data = await res.json();

      if (data.success) {
        setShowRoomModal(false);
        fetchData();
      } else {
        alert(data.error || "Failed to save room details.");
      }
    } catch (err) {
      console.error("Room submit error:", err);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      const res = await fetch(`/api/rooms?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.error || "Failed to delete room.");
      }
    } catch (err) {
      console.error("Delete room error:", err);
    }
  };

  // Stats calculation
  const totalRevenue = bookings
    .filter(b => b.status === "Confirmed")
    .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === "Pending").length;
  const activeRoomsCount = rooms.length;

  // Chart 1: Revenue by Room Name (only for 'rooms' category, removing suites and villas)
  const roomsCategoryRoomNames = rooms
    .filter(r => r.category?.toLowerCase() === "rooms")
    .map(r => r.name);

  const uniqueRoomsNames = Array.from(new Set(roomsCategoryRoomNames));

  const revenueByCategoryRaw = uniqueRoomsNames.map(name => {
    const rev = bookings
      .filter(b => b.status === "Confirmed" && b.roomName === name)
      .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
    return { name, value: rev };
  });

  // Filter to show only rooms with positive revenue (or show all if no revenue exists yet)
  const roomsWithRevenue = revenueByCategoryRaw.filter(r => r.value > 0);
  const revenueByCategory = (roomsWithRevenue.length > 0 ? roomsWithRevenue : revenueByCategoryRaw)
    .map(item => ({
      name: item.name.length > 15 ? item.name.substring(0, 12) + "..." : item.name,
      fullName: item.name,
      value: item.value
    }));

  // Chart 2: Booking Trends (Last 7 dates with bookings)
  const bookingsByDate = {};
  bookings.forEach(b => {
    const d = b.checkInDate || "Unknown";
    bookingsByDate[d] = (bookingsByDate[d] || 0) + 1;
  });
  const sortedDates = Object.keys(bookingsByDate).sort().slice(-7);
  const bookingTrend = sortedDates.map(date => ({
    date: date.substring(5) || date, // MM-DD
    count: bookingsByDate[date]
  }));

  // Selected chart state
  const [selectedBar, setSelectedBar] = useState(null);

  // Search and Filter states
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("All");
  const [querySearch, setQuerySearch] = useState("");

  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      (b.guestName || "").toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.phone || "").toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.roomName || "").toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = bookingStatusFilter === "All" || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredQueries = queries.filter(q => {
    return (
      (q.name || "").toLowerCase().includes(querySearch.toLowerCase()) ||
      (q.email || "").toLowerCase().includes(querySearch.toLowerCase()) ||
      (q.message || "").toLowerCase().includes(querySearch.toLowerCase()) ||
      (q.subject || "").toLowerCase().includes(querySearch.toLowerCase())
    );
  });

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8F2F7] text-stone-800">
        <p className="text-stone-500 font-semibold tracking-widest animate-pulse">Redirecting to admin login...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8F2F7] text-stone-800">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-stone-500 text-xs tracking-widest uppercase font-bold animate-pulse">Loading Admin Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-stone-800 min-h-screen bg-[#E8F2F7] font-sans pb-20 relative overflow-x-hidden`}>

      {/* Background Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute top-2/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#C5A880]/30 px-6 py-4">
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-serif font-black text-xl bg-gradient-to-r from-stone-900 via-stone-750 to-[#C5A880] bg-clip-text text-transparent tracking-wider uppercase">
                The Corporate House
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase tracking-wider">
                Admin Portal
              </span>
            </div>

            {/* Navigation Tabs in Header */}
            <nav className="flex flex-wrap items-center gap-1 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "dashboard" ? "bg-[#5C1A24] text-white shadow-md" : "text-stone-600 hover:text-stone-850"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "bookings" ? "bg-[#5C1A24] text-white shadow-md" : "text-stone-600 hover:text-stone-850"
                }`}
              >
                Manage Bookings
              </button>
              <button
                onClick={() => setActiveTab("rooms")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "rooms" ? "bg-[#5C1A24] text-white shadow-md" : "text-stone-600 hover:text-stone-850"
                }`}
              >
                Manage Rooms
              </button>
              <button
                onClick={() => setActiveTab("queries")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative ${
                  activeTab === "queries" ? "bg-[#5C1A24] text-white shadow-md" : "text-stone-600 hover:text-stone-850"
                }`}
              >
                User Queries
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  activeTab === "queries" ? "bg-white text-[#5C1A24]" : "bg-stone-200 text-stone-600"
                }`}>
                  {queries.length}
                </span>
              </button>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md self-end lg:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-[90%] mx-auto px-6 lg:px-8 mt-10 space-y-10 relative z-10">

        {activeTab === "dashboard" && (
          <div className="space-y-10">
            {/* Premium Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-stone-100 to-stone-200/50 border border-[#C5A880]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 min-h-[220px]">
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-25 md:opacity-40 pointer-events-none">
                <img
                  src="/photos/img4.jpg"
                  alt="Luxury Hotel Lobby"
                  className="w-full h-full object-cover object-right"
                  style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))" }}
                />
              </div>
              <div className="relative z-10 space-y-3 max-w-xl">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#5C1A24]/10 text-[#5C1A24] border border-[#5C1A24]/20 font-bold uppercase tracking-wider">
                  System Administrator
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-wide">
                  Welcome back to Console.
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Manage rooms, inspect guest reservations, and check live business insights. Your operations are currently running smoothly.
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3 self-start md:self-auto">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="px-5 py-3 bg-[#5C1A24] hover:bg-[#4A141C] text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:shadow-[#5C1A24]/10 transition-all cursor-pointer"
                >
                  View Bookings
                </button>
                <button
                  onClick={() => handleOpenRoomModal("add")}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-850 font-bold uppercase tracking-wider text-xs rounded-xl border border-stone-300 transition-all cursor-pointer"
                >
                  Add New Suite
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-50/10 hover:from-emerald-200 hover:to-emerald-100/50 border border-emerald-250 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-emerald-350 shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500">Total Revenue</span>
                  <h3 className="text-4xl font-serif font-bold text-emerald-700 mt-2">₹{totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <DollarSign className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-gradient-to-br from-sky-100 via-sky-55 to-sky-50/10 hover:from-sky-200 hover:to-sky-100/50 border border-sky-250 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-sky-350 shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500">Total Bookings</span>
                  <h3 className="text-4xl font-serif font-bold text-sky-700 mt-2">{totalBookings}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-sky-55 text-sky-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Calendar className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-50/10 hover:from-amber-200 hover:to-amber-100/50 border border-[#C5A880]/30 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-[#C5A880]/50 shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500">Pending Actions</span>
                  <h3 className="text-4xl font-serif font-bold text-[#C5A880] mt-2">{pendingBookings}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Clock className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-50/10 hover:from-indigo-200 hover:to-indigo-100/50 border border-indigo-250 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-indigo-350 shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500">Listed Rooms</span>
                  <h3 className="text-4xl font-serif font-bold text-indigo-700 mt-2">{activeRoomsCount}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-indigo-55 text-indigo-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Bed className="w-8 h-8" />
                </div>
              </motion.div>

            </section>

            {/* Charts & Interactive Visualizations */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue by Category - Bar Chart */}
              <motion.div
                whileHover={hasHover ? { scale: 1.02, y: -4, boxShadow: "0 20px 45px -12px rgba(0,0,0,0.12)" } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-stone-100/60 border border-[#C5A880]/30 rounded-2xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base uppercase font-bold tracking-wider text-stone-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Revenue By Room
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">Click bars to inspect exact values</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase font-semibold text-stone-500 block">Total Checked Room revenue</span>
                      <span className="text-sm font-bold text-emerald-700">₹{revenueByCategory.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Bar Graph Design */}
                  <div
                    className="h-80 w-full flex items-end justify-around pt-6 pb-2 relative gap-2"
                  >
                    {revenueByCategory.map((item, idx) => {
                      const maxVal = Math.max(...revenueByCategory.map(i => i.value)) || 1;
                      const heightPercent = Math.max(10, (item.value / maxVal) * 80); // Min 10% to show bar

                      return (
                        <div key={idx} className="flex flex-col items-center justify-end group/bar flex-1 h-full min-w-0 max-w-[100px] relative cursor-pointer">
                          {/* Tooltip on hover or click */}
                          <div className="absolute -top-12 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 pointer-events-none bg-stone-900 border border-stone-850 text-white rounded-lg px-2.5 py-1 text-xs font-mono shadow-xl z-20 whitespace-nowrap">
                            ₹{item.value.toLocaleString()}
                          </div>

                          {/* Bar body with Hover effect */}
                          <motion.div
                            onClick={() => setSelectedBar(item)}
                            whileHover={hasHover ? {
                              scale: 1.08,
                              y: -4,
                              boxShadow: "0 10px 25px rgba(42,78,63,0.25)"
                            } : undefined}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-full max-h-full bg-gradient-to-t from-[#C5A880] via-[#3A6B56] to-[#2A4E3F] rounded-t-lg relative origin-bottom"
                            style={{ height: `${heightPercent}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-t-lg"></div>
                          </motion.div>

                          {/* Labels */}
                          <span className="text-[10px] font-semibold text-stone-500 mt-3 text-center truncate w-full" title={item.fullName}>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedBar && (
                  <div className="mt-4 p-3 bg-stone-50 border border-[#C5A880]/30 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-stone-600">Inspecting <strong className="text-stone-900">{selectedBar.name}</strong>:</span>
                    <span className="font-mono font-bold text-[#2A4E3F]">₹{selectedBar.value.toLocaleString()}</span>
                  </div>
                )}
              </motion.div>

              {/* Booking Trends - Area Line Chart */}
              <motion.div
                whileHover={hasHover ? { scale: 1.02, y: -4, boxShadow: "0 20px 45px -12px rgba(0,0,0,0.12)" } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-stone-100/60 border border-[#C5A880]/30 rounded-2xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base uppercase font-bold tracking-wider text-stone-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#2A4E3F]" />
                        Booking Frequency Trend
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">Timeline distribution of last 7 room bookings</p>
                    </div>
                    <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded bg-amber-50 text-[#C5A880] border border-[#C5A880]/20">
                      Last 7 Dates
                    </span>
                  </div>

                  {/* Area SVG Line Graph */}
                  {bookingTrend.length === 0 ? (
                    <div className="h-80 flex items-center justify-center text-stone-550 text-xs">
                      Insufficient booking timeline data to plot trend.
                    </div>
                  ) : (() => {
                    const points = bookingTrend.map((t, idx) => {
                      const x = (idx / (bookingTrend.length - 1)) * 100;
                      const maxCount = Math.max(...bookingTrend.map(i => i.count)) || 1;
                      const y = 90 - (t.count / maxCount) * 70;
                      return { x, y };
                    });

                    // Build bezier curve path points
                    let areaPath = "M 0,100 L 0," + points[0].y;
                    let linePath = "M 0," + points[0].y;

                    for (let i = 0; i < points.length - 1; i++) {
                      const p = points[i];
                      const next = points[i + 1];
                      const cpX1 = p.x + (next.x - p.x) / 3;
                      const cpY1 = p.y;
                      const cpX2 = p.x + 2 * (next.x - p.x) / 3;
                      const cpY2 = next.y;
                      const segment = ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${next.x},${next.y}`;
                      areaPath += segment;
                      linePath += segment;
                    }

                    areaPath += " L 100,100 Z";

                    return (
                      <div className="h-80 w-full relative pt-6">
                        {/* SVG Chart */}
                        <svg className="w-full h-64 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2A4E3F" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#C5A880" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>

                          {/* Grid lines */}
                          <line x1="0" y1="20" x2="100" y2="20" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3" />
                          <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3" />
                          <line x1="0" y1="80" x2="100" y2="80" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3" />

                          {/* Area path */}
                          <path d={areaPath} fill="url(#areaGrad)" />

                          {/* Line path */}
                          <path d={linePath} fill="none" stroke="#2A4E3F" strokeWidth="2.2" strokeLinecap="round" />

                          {/* Data Points */}
                          {points.map((pt, idx) => (
                            <circle
                              key={idx}
                              cx={pt.x}
                              cy={pt.y}
                              r="3"
                              className="fill-[#2A4E3F] stroke-white stroke-2 hover:r-4 transition-all duration-300 cursor-pointer"
                            />
                          ))}
                        </svg>

                        {/* SVG Labels */}
                        <div className="w-full flex justify-between px-1 absolute bottom-4 left-0 right-0 text-[10px] text-stone-500 font-mono">
                          {bookingTrend.map((t, idx) => (
                            <span key={idx} className="block w-8 text-center truncate">{t.date}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex items-center justify-between text-xs border-t border-stone-200 pt-4 mt-2">
                  <span className="text-stone-550">Peak Volume:</span>
                  <span className="font-mono text-sky-700 font-bold">
                    {Math.max(...bookingTrend.map(i => i.count), 0)} Bookings/Day
                  </span>
                </div>
              </motion.div>

            </section>

            {/* Live Suites Status Overview */}
            <div className="bg-stone-100/60 border border-[#C5A880]/25 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 uppercase tracking-wider">
                    Suites Live Operations Status
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">Real-time status overview of listed hotel accommodations.</p>
                </div>
                <button
                  onClick={() => setActiveTab("rooms")}
                  className="text-xs text-[#5C1A24] hover:underline font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Configure Suites <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.slice(0, 4).map((room, index) => {
                  const isBooked = index % 3 === 0;
                  return (
                    <div
                      key={room.id || room._id || index}
                      className="group border border-stone-200 rounded-2xl overflow-hidden bg-stone-50 hover:border-[#C5A880]/30 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="h-36 relative overflow-hidden bg-stone-100">
                        {room.image ? (
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute top-2.5 right-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            isBooked
                              ? "bg-amber-50 text-amber-700 border-amber-250"
                              : "bg-emerald-50 text-emerald-700 border-emerald-250"
                          }`}>
                            {isBooked ? "Booked" : "Available"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-1">
                        <span className="text-[9px] uppercase font-bold text-stone-550 tracking-wider block">{room.category}</span>
                        <h4 className="font-serif font-bold text-stone-900 text-sm truncate">{room.name}</h4>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-stone-500 font-mono">{room.size}</span>
                          <span className="text-xs font-bold text-[#5C1A24]">₹{room.price}/N</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {activeTab !== "dashboard" && (
          <div className="bg-stone-50 border border-[#C5A880]/25 rounded-2xl overflow-hidden shadow-xl">

          <AnimatePresence mode="wait">
            {activeTab === "bookings" && (
              <motion.div
                key="bookings-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 uppercase tracking-wider">
                    Guest Reservation Log
                  </h3>

                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search guest, room, phone..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-850 focus:outline-none focus:border-[#C5A880] placeholder:text-stone-400 w-56 sm:w-72"
                    />

                    <select
                      value={bookingStatusFilter}
                      onChange={(e) => setBookingStatusFilter(e.target.value)}
                      className="bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-850 focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {filteredBookings.length === 0 ? (
                  <p className="text-center text-stone-500 text-sm py-20 font-light">No reservations match search criteria.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-xs uppercase font-bold text-stone-600 tracking-wider">
                          <th className="py-4 px-6">Guest Name</th>
                          <th className="py-4 px-6">Room Category / Name</th>
                          <th className="py-4 px-6">Check-In / Out</th>
                          <th className="py-4 px-6">Total Amount</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredBookings.map((booking) => {
                          const bid = booking.id || booking._id;
                          return (
                            <tr key={bid} className="hover:bg-[#DCEBF2]/40 hover:translate-x-1 hover:shadow-sm transition-all duration-300 transform">
                              <td className="py-6 px-6">
                                <span className="block font-bold text-stone-900 text-base">{booking.guestName}</span>
                                <span className="block text-xs text-stone-500 font-mono mt-1">{booking.phone || "N/A"}</span>
                                {booking.createdAt && (
                                  <span className="block text-[11px] text-stone-400 font-mono mt-1">
                                    Booked on: {new Date(booking.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                              </td>
                              <td className="py-6 px-6">
                                <span className="font-serif font-medium text-[#5C1A24] text-base block">{booking.roomName}</span>
                                <span className="text-xs text-stone-500 block mt-1">ID: {booking.roomId}</span>
                              </td>
                              <td className="py-6 px-6 text-stone-700 font-light">
                                <span className="block text-sm font-semibold text-stone-850">{booking.checkInDate} ({booking.checkInTime})</span>
                                <span className="block text-xs text-stone-500 mt-0.5">to {booking.checkOutDate} ({booking.checkOutTime})</span>
                              </td>
                              <td className="py-6 px-6">
                                <span className="font-bold text-stone-900 text-base block">₹{booking.totalPrice?.toLocaleString()}</span>
                                <span className={`block text-[11px] font-semibold uppercase tracking-wider mt-1 ${booking.roomId?.startsWith("event-") ? "text-amber-600" : "text-emerald-600"}`}>
                                  {booking.roomId?.startsWith("event-") ? "Collect at Desk (Cash)" : (booking.paymentMethod || "Cash Payment")}
                                </span>
                              </td>
                              <td className="py-6 px-6">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${booking.status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                                    : booking.status === "Cancelled"
                                      ? "bg-rose-50 text-rose-700 border-rose-250"
                                      : "bg-amber-50 text-amber-700 border-amber-250"
                                    }`}
                                >
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-6 px-6 text-right flex justify-end gap-2">
                                {booking.status === "Pending" && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(bid, "Confirmed")}
                                      className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                                      title="Confirm Booking"
                                    >
                                      <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(bid, "Cancelled")}
                                      className="p-2 bg-rose-50 text-rose-750 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                                      title="Cancel Booking"
                                    >
                                      <XCircle className="w-5 h-5" />
                                    </button>
                                  </>
                                )}
                                {booking.status === "Confirmed" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(bid, "Cancelled")}
                                    className="p-2 bg-rose-50 text-rose-750 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                                    title="Cancel Booking"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteBooking(bid)}
                                  className="p-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "rooms" && (
              <motion.div
                key="rooms-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 uppercase tracking-wider">
                    Listed Rooms Inventory
                  </h3>
                  <button
                    onClick={() => handleOpenRoomModal("add")}
                    className="bg-[#5C1A24] hover:bg-[#4A141C] text-white text-sm font-bold uppercase tracking-wider py-3 px-5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg hover:shadow-red-950/20 cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-white" />
                    Add New Room
                  </button>
                </div>

                {rooms.length === 0 ? (
                  <p className="text-center text-stone-500 text-sm py-20 font-light">No rooms listed in inventory.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {rooms.map((room) => {
                      const rid = room.id || room._id;
                      return (
                        <div
                          key={rid}
                          className="group border border-stone-250 rounded-2xl overflow-hidden bg-stone-50 hover:bg-stone-100/90 hover:-translate-y-1 flex flex-col justify-between hover:border-[#C5A880] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <div>
                            <div className="h-60 relative bg-stone-100 overflow-hidden">
                              {room.image ? (
                                <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                  <ImageIcon className="w-10 h-10" />
                                </div>
                              )}
                              <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-stone-900 text-[10px] uppercase font-bold tracking-wider rounded border border-[#C5A880]/30 shadow-sm">
                                {room.category}
                              </div>
                            </div>

                            <div className="p-6 space-y-4">
                              <h4 className="text-xl font-bold font-serif text-stone-900 group-hover:text-[#5C1A24] transition-colors duration-300">{room.name}</h4>
                              <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed font-light">{room.description}</p>

                              <div className="flex flex-wrap gap-2 pt-1">
                                <span className="px-2.5 py-1 bg-stone-50 border border-stone-200 rounded text-xs text-stone-550 font-mono">{room.size}</span>
                                <span className="px-2.5 py-1 bg-stone-50 border border-stone-200 rounded text-xs text-stone-550 font-mono">{room.guests}</span>
                                <span className="px-2.5 py-1 bg-stone-50 border border-stone-200 rounded text-xs text-stone-550 font-mono">{room.bed}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 border-t border-stone-100 flex items-center justify-between bg-stone-50/50">
                            <span className="text-base font-serif font-bold text-[#5C1A24]">₹{room.price} / night</span>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenRoomModal("edit", room)}
                                className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg border border-stone-250 hover:border-stone-300 transition-all cursor-pointer"
                                title="Edit Room"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRoom(rid)}
                                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200 hover:border-rose-350 transition-all cursor-pointer"
                                title="Delete Room"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "queries" && (
              <motion.div
                key="queries-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 uppercase tracking-wider">
                    Guest Inquiries & Messages
                  </h3>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search queries name, email, msg..."
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                    className="bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-850 focus:outline-none focus:border-[#C5A880] placeholder:text-stone-400 w-56 sm:w-72"
                  />
                </div>

                {filteredQueries.length === 0 ? (
                  <p className="text-center text-stone-500 text-sm py-20 font-light">No guest queries match search criteria.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-xs uppercase font-bold text-stone-600 tracking-wider">
                          <th className="py-4 px-6 w-1/4">Sender Details</th>
                          <th className="py-4 px-6 w-1/4">Subject / Category</th>
                          <th className="py-4 px-6 w-1/2">Message Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredQueries.map((q) => {
                          const qid = q.id || q._id;
                          return (
                            <tr key={qid} className="hover:bg-stone-50 transition-colors">
                              <td className="py-6 px-6 align-top">
                                <span className="block font-bold text-stone-900 text-base">{q.name}</span>
                                <span className="flex items-center gap-1.5 text-xs text-stone-500 font-mono mt-1.5">
                                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                                  {q.email}
                                </span>
                              </td>
                              <td className="py-6 px-6 align-top">
                                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                                  {q.subject}
                                </span>
                                <span className="block text-[10px] text-stone-500 mt-2 font-mono">
                                  {q.createdAt ? new Date(q.createdAt).toLocaleString() : ""}
                                </span>
                              </td>
                              <td className="py-6 px-6 align-top">
                                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm font-light leading-relaxed max-w-2xl break-words">
                                  {q.message}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        )}
      </main>

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans px-4">
          <div
            onClick={() => setShowRoomModal(false)}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          ></div>

          <div className="relative z-10 bg-white border border-[#C5A880]/30 p-6 rounded-2xl w-full max-w-xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h4 className="text-base font-serif font-bold text-[#5C1A24] uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                {modalMode === "edit" ? "Edit Room Details" : "List New Suite"}
              </h4>
              <button
                onClick={() => setShowRoomModal(false)}
                className="text-stone-500 hover:text-stone-750 text-xs uppercase font-bold tracking-wider"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleRoomSubmit} className="space-y-4 text-xs">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Room Name</label>
                  <input
                    type="text"
                    required
                    value={roomForm.name}
                    onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                    placeholder="e.g. Presidential Suite"
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Price per night (₹)</label>
                  <input
                    type="number"
                    required
                    value={roomForm.price}
                    onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                    placeholder="e.g. 2500"
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Size</label>
                  <input
                    type="text"
                    required
                    value={roomForm.size}
                    onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })}
                    placeholder="e.g. 45 m²"
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Guests Capacity</label>
                  <input
                    type="text"
                    required
                    value={roomForm.guests}
                    onChange={(e) => setRoomForm({ ...roomForm, guests: e.target.value })}
                    placeholder="e.g. Up to 3 Guests"
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Bed Type</label>
                  <input
                    type="text"
                    required
                    value={roomForm.bed}
                    onChange={(e) => setRoomForm({ ...roomForm, bed: e.target.value })}
                    placeholder="e.g. 1 King Bed"
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Image Asset URL</label>
                  <input
                    type="text"
                    required
                    value={roomForm.image}
                    onChange={(e) => setRoomForm({ ...roomForm, image: e.target.value })}
                    placeholder="/photos/img4.jpg"
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-stone-500">Category</label>
                  <select
                    value={roomForm.category}
                    onChange={(e) => setRoomForm({ ...roomForm, category: e.target.value })}
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880] cursor-pointer"
                  >
                    <option value="rooms">Rooms</option>
                    <option value="suites">Suites</option>
                    <option value="villas">Villas</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-bold tracking-wider text-stone-500">Features (comma separated)</label>
                <input
                  type="text"
                  value={roomForm.features}
                  onChange={(e) => setRoomForm({ ...roomForm, features: e.target.value })}
                  placeholder="AC, Cozy Sofa, Minibar, Smart TV"
                  className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-bold tracking-wider text-stone-500">Description</label>
                <textarea
                  required
                  rows="3"
                  value={roomForm.description}
                  onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                  placeholder="Describe the rooms unique amenities and theme..."
                  className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-850 focus:outline-none focus:border-[#C5A880]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-750 uppercase font-bold tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5C1A24] hover:bg-[#4A141C] text-white py-2 px-6 rounded-lg uppercase font-bold tracking-wider transition-all cursor-pointer"
                >
                  Save Room
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
