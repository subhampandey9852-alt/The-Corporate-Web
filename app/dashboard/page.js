"use client";

import React, { useState } from "react";
import { 
  User, 
  Award, 
  Key, 
  MapPin, 
  Coffee, 
  Compass, 
  ChevronRight, 
  CheckCircle2, 
  Lock,
  Unlock,
  QrCode
} from "lucide-react";

function Dashboard() {
  const [digitalKeyUnlocked, setDigitalKeyUnlocked] = useState(false);

  // Mock Active Booking Details
  const currentBooking = {
    room: "Presidential Business Suite (Room 402)",
    arrival: "June 20, 2026",
    departure: "June 25, 2026",
    conciergeName: "Sophia Dubois"
  };

  // Mock Loyalty Club Perks
  const perks = [
    { name: "Complimentary Airport Chauffeur", status: "Active" },
    { name: "Michelin Welcome Dinner Pairing", status: "Claimed" },
    { name: "Late Checkout (2:00 PM)", status: "Active" },
    { name: "Daily organic juice basket", status: "Delivered" }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-12 selection:bg-amber-400 selection:text-zinc-950">
      
      {/* Header Profile Summary */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 pb-4 border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold font-serif text-zinc-950">MS</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-zinc-100">
                Marcus Sterling
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
                Elite Gold
              </span>
            </div>
            <p className="text-zinc-500 text-xs font-light mt-1">Corporate House Club Member since 2023</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-2xl text-center min-w-[120px]">
            <span className="text-2xl font-serif font-bold text-amber-400">42,500</span>
            <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider mt-1">Club Points</span>
          </div>
          <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-2xl text-center min-w-[120px]">
            <span className="text-2xl font-serif font-bold text-amber-400">12</span>
            <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider mt-1">Nights Stayed</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Reservation Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-zinc-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Active Reservation
            </h3>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 grid grid-cols-2 gap-4 text-xs font-light">
              <div>
                <span className="text-zinc-500 block mb-1">Accommodation</span>
                <strong className="text-zinc-200 block text-sm">{currentBooking.room}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Private Concierge</span>
                <strong className="text-zinc-200 block text-sm">{currentBooking.conciergeName}</strong>
              </div>
              <div className="pt-2 border-t border-zinc-900">
                <span className="text-zinc-500 block mb-1">Arrival Date</span>
                <strong className="text-zinc-200 block text-sm">{currentBooking.arrival}</strong>
              </div>
              <div className="pt-2 border-t border-zinc-900">
                <span className="text-zinc-500 block mb-1">Departure Date</span>
                <strong className="text-zinc-200 block text-sm">{currentBooking.departure}</strong>
              </div>
            </div>

            {/* Perks Listing */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400">Complimentary Club Privileges</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-xs">
                    <span className="text-zinc-300 font-light">{perk.name}</span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-current text-zinc-950" />
                      {perk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Digital Room Key (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-zinc-100">
                Digital Room Key
              </h3>
              <p className="text-zinc-500 text-[10px] font-light">Hold near the smart lock panel of Room 402</p>
            </div>

            <div className="py-6 flex justify-center">
              <button 
                onClick={() => setDigitalKeyUnlocked(!digitalKeyUnlocked)}
                className={`w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center gap-2 transition-all duration-500 shadow-xl ${
                  digitalKeyUnlocked 
                    ? "bg-amber-400/10 border-amber-400 text-amber-400 shadow-amber-400/10" 
                    : "bg-zinc-950 border-zinc-800 text-zinc-500"
                }`}
              >
                {digitalKeyUnlocked ? (
                  <>
                    <Unlock className="w-8 h-8 animate-bounce" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Unlocked</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-8 h-8" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Tap to unlock</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-amber-500" />
                Show QR for Yacht boarding
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;