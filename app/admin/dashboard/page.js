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
    fetchData();
    document.body.style.backgroundColor = "#020617";
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400 font-light tracking-widest animate-pulse">Redirecting to admin login...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-slate-400 text-xs tracking-widest uppercase font-light animate-pulse">Loading Admin Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-100 min-h-screen bg-slate-950 font-sans pb-20 relative overflow-x-hidden">

      {/* Background Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute top-2/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-serif font-black text-xl bg-gradient-to-r from-white via-slate-200 to-amber-400 bg-clip-text text-transparent tracking-wider uppercase">
                The Corporate House
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                Admin Portal
              </span>
            </div>

            {/* Navigation Tabs in Header */}
            <nav className="flex flex-wrap items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "dashboard" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "bookings" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Manage Bookings
              </button>
              <button
                onClick={() => setActiveTab("rooms")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "rooms" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Manage Rooms
              </button>
              <button
                onClick={() => setActiveTab("queries")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative ${
                  activeTab === "queries" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                User Queries
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  activeTab === "queries" ? "bg-slate-900 text-amber-400" : "bg-slate-800 text-slate-400"
                }`}>
                  {queries.length}
                </span>
              </button>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg self-end lg:self-auto"
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
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 min-h-[220px]">
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-25 md:opacity-40 pointer-events-none">
                <img
                  src="/photos/img4.jpg"
                  alt="Luxury Hotel Lobby"
                  className="w-full h-full object-cover object-right"
                  style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))" }}
                />
              </div>
              <div className="relative z-10 space-y-3 max-w-xl">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider">
                  System Administrator
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-wide">
                  Welcome back to Console.
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Manage rooms, inspect guest reservations, and check live business insights. Your operations are currently running smoothly.
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3 self-start md:self-auto">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer"
                >
                  View Bookings
                </button>
                <button
                  onClick={() => handleOpenRoomModal("add")}
                  className="px-5 py-3 bg-slate-850 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs rounded-xl border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer"
                >
                  Add New Suite
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-slate-700/80"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Revenue</span>
                  <h3 className="text-4xl font-serif font-bold text-emerald-400 mt-2">₹{totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <DollarSign className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-slate-700/80"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Bookings</span>
                  <h3 className="text-4xl font-serif font-bold text-sky-400 mt-2">{totalBookings}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Calendar className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-slate-700/80"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Pending Actions</span>
                  <h3 className="text-4xl font-serif font-bold text-amber-400 mt-2">{pendingBookings}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Clock className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div
                whileHover={hasHover ? { y: -5, scale: 1.01 } : undefined}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:border-slate-700/80"
              >
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Listed Rooms</span>
                  <h3 className="text-4xl font-serif font-bold text-indigo-400 mt-2">{activeRoomsCount}</h3>
                </div>
                <div className="w-16 h-16 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Bed className="w-8 h-8" />
                </div>
              </motion.div>

            </section>

            {/* Charts & Interactive Visualizations */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
              {/* Revenue by Category - Bar Chart */}
              <motion.div
                whileHover={hasHover ? { rotateX: 12, rotateY: -12, scale: 1.06, z: 80, boxShadow: "0 25px 55px -12px rgba(0,0,0,0.8)" } : undefined}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 flex flex-col justify-between"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base uppercase font-bold tracking-wider text-slate-300 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-400" />
                        Revenue By Room
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Click bars to inspect exact values</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase font-semibold text-slate-500 block">Total Checked Room revenue</span>
                      <span className="text-sm font-bold text-emerald-400">₹{revenueByCategory.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Bar Graph Design */}
                  <div
                    className="h-80 w-full flex items-end justify-around pt-6 pb-2 relative gap-2"
                    style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                  >
                    {revenueByCategory.map((item, idx) => {
                      const maxVal = Math.max(...revenueByCategory.map(i => i.value)) || 1;
                      const heightPercent = Math.max(10, (item.value / maxVal) * 80); // Min 10% to show bar

                      return (
                        <div key={idx} className="flex flex-col items-center group/bar flex-1 min-w-0 max-w-[100px] relative cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
                          {/* Tooltip on hover or click */}
                          <div className="absolute -top-12 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 pointer-events-none bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1 text-xs font-mono shadow-xl z-20 whitespace-nowrap">
                            ₹{item.value.toLocaleString()}
                          </div>

                          {/* Bar body with 3D Hover tilt */}
                          <motion.div
                            onClick={() => setSelectedBar(item)}
                            whileHover={hasHover ? {
                              scale: 1.15,
                              rotateY: 25,
                              rotateX: -15,
                              z: 200,
                              boxShadow: "0 0 30px rgba(52,211,153,0.6)"
                            } : undefined}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-full h-full max-h-full bg-gradient-to-t from-emerald-600/20 to-emerald-400/90 rounded-t-lg relative origin-bottom"
                            style={{ height: `${heightPercent}%`, transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-t-lg"></div>
                          </motion.div>

                          {/* Labels */}
                          <span className="text-[10px] font-semibold text-slate-400 mt-3 text-center truncate w-full" title={item.fullName}>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedBar && (
                  <div className="mt-4 p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-slate-400">Inspecting <strong className="text-white">{selectedBar.name}</strong>:</span>
                    <span className="font-mono font-bold text-emerald-400">₹{selectedBar.value.toLocaleString()}</span>
                  </div>
                )}
              </motion.div>

              {/* Booking Trends - Area Line Chart */}
              <motion.div
                whileHover={hasHover ? { rotateX: -12, rotateY: 12, scale: 1.06, z: 80, boxShadow: "0 25px 55px -12px rgba(0,0,0,0.8)" } : undefined}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 flex flex-col justify-between"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base uppercase font-bold tracking-wider text-slate-300 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-sky-400" />
                        Booking Frequency Trend
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Timeline distribution of last 7 room bookings</p>
                    </div>
                    <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Last 7 Dates
                    </span>
                  </div>

                  {/* Area SVG Line Graph */}
                  {bookingTrend.length === 0 ? (
                    <div className="h-80 flex items-center justify-center text-slate-500 text-xs">
                      Insufficient booking timeline data to plot trend.
                    </div>
                  ) : (
                    <div className="h-80 w-full relative pt-6">
                      {/* SVG Chart */}
                      <svg className="w-full h-64 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />

                        {/* Area path */}
                        <path
                          d={`
                            M 0,100
                            ${bookingTrend.map((t, idx) => {
                            const x = (idx / (bookingTrend.length - 1)) * 100;
                            const maxCount = Math.max(...bookingTrend.map(i => i.count)) || 1;
                            const y = 90 - (t.count / maxCount) * 70;
                            return `L ${x},${y}`;
                          }).join(" ")}
                            L 100,100 Z
                          `}
                          fill="url(#areaGrad)"
                        />

                        {/* Line path */}
                        <path
                          d={bookingTrend.map((t, idx) => {
                            const x = (idx / (bookingTrend.length - 1)) * 100;
                            const maxCount = Math.max(...bookingTrend.map(i => i.count)) || 1;
                            const y = 90 - (t.count / maxCount) * 70;
                            return `${idx === 0 ? "M" : "L"} ${x},${y}`;
                          }).join(" ")}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        {/* Data Points */}
                        {bookingTrend.map((t, idx) => {
                          const x = (idx / (bookingTrend.length - 1)) * 100;
                          const maxCount = Math.max(...bookingTrend.map(i => i.count)) || 1;
                          const y = 90 - (t.count / maxCount) * 70;
                          return (
                            <circle
                              key={idx}
                              cx={x}
                              cy={y}
                              r="2.5"
                              className="fill-sky-400 stroke-slate-900 stroke-2 hover:r-3.5 transition-all duration-300 cursor-pointer"
                            />
                          );
                        })}
                      </svg>

                      {/* SVG Labels */}
                      <div className="w-full flex justify-between px-1 absolute bottom-4 left-0 right-0 text-[10px] text-slate-400 font-mono">
                        {bookingTrend.map((t, idx) => (
                          <span key={idx} className="block w-8 text-center truncate">{t.date}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-4 mt-2">
                  <span className="text-slate-400">Peak Volume:</span>
                  <span className="font-mono text-sky-400 font-bold">
                    {Math.max(...bookingTrend.map(i => i.count), 0)} Bookings/Day
                  </span>
                </div>
              </motion.div>

            </section>

            {/* Live Suites Status Overview */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                    Suites Live Operations Status
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Real-time status overview of listed hotel accommodations.</p>
                </div>
                <button
                  onClick={() => setActiveTab("rooms")}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
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
                      className="group border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/40 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="h-36 relative overflow-hidden bg-slate-900">
                        {room.image ? (
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute top-2.5 right-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            isBooked
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                            {isBooked ? "Booked" : "Available"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">{room.category}</span>
                        <h4 className="font-serif font-bold text-white text-sm truncate">{room.name}</h4>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-slate-400 font-mono">{room.size}</span>
                          <span className="text-xs font-bold text-amber-400">₹{room.price}/N</span>
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
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden">

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
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wider">
                    Guest Reservation Log
                  </h3>

                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search guest, room, phone..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400 placeholder:text-slate-600 w-56 sm:w-72"
                    />

                    <select
                      value={bookingStatusFilter}
                      onChange={(e) => setBookingStatusFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {filteredBookings.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-20 font-light">No reservations match search criteria.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800/80 text-xs uppercase font-bold text-slate-300 tracking-wider">
                          <th className="py-4 px-6">Guest Name</th>
                          <th className="py-4 px-6">Room Category / Name</th>
                          <th className="py-4 px-6">Check-In / Out</th>
                          <th className="py-4 px-6">Total Amount</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {filteredBookings.map((booking) => {
                          const bid = booking.id || booking._id;
                          return (
                            <tr key={bid} className="hover:bg-slate-900/30 transition-colors">
                              <td className="py-6 px-6">
                                <span className="block font-bold text-white text-base">{booking.guestName}</span>
                                <span className="block text-xs text-slate-400 font-mono mt-1">{booking.phone || "N/A"}</span>
                              </td>
                              <td className="py-6 px-6">
                                <span className="font-serif font-medium text-amber-400 text-base block">{booking.roomName}</span>
                                <span className="text-xs text-slate-500 block mt-1">ID: {booking.roomId}</span>
                              </td>
                              <td className="py-6 px-6 text-slate-300 font-light">
                                <span className="block text-sm font-semibold">{booking.checkInDate} ({booking.checkInTime})</span>
                                <span className="block text-xs text-slate-400 mt-0.5">to {booking.checkOutDate} ({booking.checkOutTime})</span>
                              </td>
                              <td className="py-6 px-6">
                                <span className="font-bold text-white text-base block">₹{booking.totalPrice?.toLocaleString()}</span>
                                <span className="block text-[11px] text-emerald-400 font-semibold uppercase tracking-wider mt-1">{booking.paymentMethod || "Cash Payment"}</span>
                              </td>
                              <td className="py-6 px-6">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${booking.status === "Confirmed"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : booking.status === "Cancelled"
                                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
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
                                      className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors cursor-pointer"
                                      title="Confirm Booking"
                                    >
                                      <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(bid, "Cancelled")}
                                      className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer"
                                      title="Cancel Booking"
                                    >
                                      <XCircle className="w-5 h-5" />
                                    </button>
                                  </>
                                )}
                                {booking.status === "Confirmed" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(bid, "Cancelled")}
                                    className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer"
                                    title="Cancel Booking"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                )}
                                {booking.status === "Cancelled" && (
                                  <span className="text-xs text-slate-500 italic">No actions</span>
                                )}
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
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wider">
                    Listed Rooms Inventory
                  </h3>
                  <button
                    onClick={() => handleOpenRoomModal("add")}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold uppercase tracking-wider py-3 px-5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-slate-950" />
                    Add New Room
                  </button>
                </div>

                {rooms.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-20 font-light">No rooms listed in inventory.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {rooms.map((room) => {
                      const rid = room.id || room._id;
                      return (
                        <div
                          key={rid}
                          className="group border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/30 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300"
                        >
                          <div>
                            <div className="h-60 relative bg-slate-950 overflow-hidden">
                              {room.image ? (
                                <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                  <ImageIcon className="w-10 h-10" />
                                </div>
                              )}
                              <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider rounded border border-slate-700/50">
                                {room.category}
                              </div>
                            </div>

                            <div className="p-6 space-y-4">
                              <h4 className="text-xl font-bold font-serif text-white group-hover:text-amber-400 transition-colors duration-300">{room.name}</h4>
                              <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed font-light">{room.description}</p>

                              <div className="flex flex-wrap gap-2 pt-1">
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 font-mono">{room.size}</span>
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 font-mono">{room.guests}</span>
                                <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 font-mono">{room.bed}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/20">
                            <span className="text-base font-serif font-bold text-amber-400">₹{room.price} / night</span>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenRoomModal("edit", room)}
                                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                                title="Edit Room"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRoom(rid)}
                                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer"
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
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wider">
                    Guest Inquiries & Messages
                  </h3>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search queries name, email, msg..."
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400 placeholder:text-slate-600 w-56 sm:w-72"
                  />
                </div>

                {filteredQueries.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-20 font-light">No guest queries match search criteria.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800/80 text-xs uppercase font-bold text-slate-300 tracking-wider">
                          <th className="py-4 px-6 w-1/4">Sender Details</th>
                          <th className="py-4 px-6 w-1/4">Subject / Category</th>
                          <th className="py-4 px-6 w-1/2">Message Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {filteredQueries.map((q) => {
                          const qid = q.id || q._id;
                          return (
                            <tr key={qid} className="hover:bg-slate-900/30 transition-colors">
                              <td className="py-6 px-6 align-top">
                                <span className="block font-bold text-white text-base">{q.name}</span>
                                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1.5">
                                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                                  {q.email}
                                </span>
                              </td>
                              <td className="py-6 px-6 align-top">
                                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                                  {q.subject}
                                </span>
                                <span className="block text-[10px] text-slate-500 mt-2 font-mono">
                                  {q.createdAt ? new Date(q.createdAt).toLocaleString() : ""}
                                </span>
                              </td>
                              <td className="py-6 px-6 align-top">
                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm font-light leading-relaxed max-w-2xl break-words">
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
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          ></div>

          <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-base font-serif font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {modalMode === "edit" ? "Edit Room Details" : "List New Suite"}
              </h4>
              <button
                onClick={() => setShowRoomModal(false)}
                className="text-slate-400 hover:text-slate-200 text-xs uppercase font-bold tracking-wider"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleRoomSubmit} className="space-y-4 text-xs">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Room Name</label>
                  <input
                    type="text"
                    required
                    value={roomForm.name}
                    onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                    placeholder="e.g. Presidential Suite"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Price per night (₹)</label>
                  <input
                    type="number"
                    required
                    value={roomForm.price}
                    onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                    placeholder="e.g. 2500"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Size</label>
                  <input
                    type="text"
                    required
                    value={roomForm.size}
                    onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })}
                    placeholder="e.g. 45 m²"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Guests Capacity</label>
                  <input
                    type="text"
                    required
                    value={roomForm.guests}
                    onChange={(e) => setRoomForm({ ...roomForm, guests: e.target.value })}
                    placeholder="e.g. Up to 3 Guests"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Bed Type</label>
                  <input
                    type="text"
                    required
                    value={roomForm.bed}
                    onChange={(e) => setRoomForm({ ...roomForm, bed: e.target.value })}
                    placeholder="e.g. 1 King Bed"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Image Asset URL</label>
                  <input
                    type="text"
                    required
                    value={roomForm.image}
                    onChange={(e) => setRoomForm({ ...roomForm, image: e.target.value })}
                    placeholder="/photos/img4.jpg"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-bold tracking-wider text-slate-400">Category</label>
                  <select
                    value={roomForm.category}
                    onChange={(e) => setRoomForm({ ...roomForm, category: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="rooms">Rooms</option>
                    <option value="suites">Suites</option>
                    <option value="villas">Villas</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-bold tracking-wider text-slate-400">Features (comma separated)</label>
                <input
                  type="text"
                  value={roomForm.features}
                  onChange={(e) => setRoomForm({ ...roomForm, features: e.target.value })}
                  placeholder="AC, Cozy Sofa, Minibar, Smart TV"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-bold tracking-wider text-slate-400">Description</label>
                <textarea
                  required
                  rows="3"
                  value={roomForm.description}
                  onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                  placeholder="Describe the rooms unique amenities and theme..."
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 uppercase font-bold tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 py-2 px-6 rounded-lg uppercase font-bold tracking-wider transition-all"
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
