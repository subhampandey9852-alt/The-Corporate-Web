"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
  ThumbsUp
} from "lucide-react";

function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit query. Please try again.");
      }
    } catch (err) {
      console.error("Query submit error:", err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/919304868696?text=Hello,%20I'm%20interested%20in%20booking%20a%20room%20at%20The%20Corporate%20House.", "_blank");
  };

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-black min-h-screen font-sans py-16 px-6 md:px-12 max-w-[90rem] mx-auto space-y-16 selection:bg-brand-green selection:text-white `}>

      {/* Page Header */}
      <section className="text-center max-w-4xl mx-auto space-y-5 pt-8">
        <span className="text-lg uppercase tracking-[0.25em] text-brand-green font-semibold flex items-center justify-center gap-2">
          <Clock className="w-5.5 h-5.5 text-brand-green" />
          Always Available For You
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-light text-black tracking-tight">
          Hotel Inquiries
        </h1>
        <div className="w-16 h-0.5 bg-brand-green mx-auto"></div>
        <p className="text-black text-3xl font-script leading-relaxed max-w-2xl mx-auto">
          Our guest relationship desk is staffed 24 hours a day, 7 days a week. Get in touch via WhatsApp, direct call, or submit a request directly below.
        </p>
      </section>

      {/* Trust & Satisfaction Banner */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-card-gradient border border-[#E5E2DA]/20 rounded-xl flex items-start gap-4 shadow-sm hover:border-brand-radishblack hover:bg-wooden -translate-y-0 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(26,13,16,0.18)] cursor-pointer group">
          <div className="w-12 h-12 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-brand-gold-dark group-hover:to-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors duration-300">24/7 Service Desk</h4>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              Day or night, our team of guest experience planners is always ready to accommodate your needs.
            </p>
          </div>
        </div>

        <div className="p-6 bg-card-gradient border border-[#E5E2DA]/20 rounded-xl flex items-start gap-4 shadow-sm hover:border-brand-radishblack hover:bg-wooden -translate-y-0 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(26,13,16,0.18)] cursor-pointer group">
          <div className="w-12 h-12 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-brand-gold-dark group-hover:to-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors duration-300">100% Satisfaction</h4>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              We guarantee pristine coastal rooms. If you are unsatisfied, we make it right instantly.
            </p>
          </div>
        </div>

        <div className="p-6 bg-card-gradient border border-[#E5E2DA]/20 rounded-xl flex items-start gap-4 shadow-sm hover:border-brand-radishblack hover:bg-wooden -translate-y-0 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(26,13,16,0.18)] cursor-pointer group">
          <div className="w-12 h-12 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-brand-gold-dark group-hover:to-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors duration-300">Secured Bookings</h4>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              All transactions and reservation logs are fully encrypted. Your guest and credit data is safe with us.
            </p>
          </div>
        </div>
      </section>

      {/* Main Connection Channels */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Contact info channels (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-[#E5E2DA] rounded-xl p-8 space-y-8 shadow-sm hover:border-brand-radishblack/40 hover:shadow-[0_20px_50px_rgba(26,13,16,0.1)] transition-all duration-500">
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider text-[#1C2A22] pb-3 border-b border-stone-100">
              Direct Channels
            </h3>

            <div className="space-y-5">

              {/* WhatsApp Redirection */}
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full flex items-center justify-between p-5 rounded-xl bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 text-left transition-all duration-300 group hover:shadow-[0_15px_30px_rgba(37,211,102,0.12)] hover:border-[#25D366] hover:-translate-y-1"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs text-[#25D366] uppercase font-bold tracking-wider block">Chat on WhatsApp</span>
                    <span className="text-stone-700 text-base font-medium">+91 9304868696</span>
                  </div>
                </div>
                <span className="text-sm text-[#25D366] font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {/* Direct Call */}
              <a
                href="tel:+919304868696"
                className="w-full flex items-center justify-between p-5 rounded-xl bg-[#2A4E3F]/5 hover:bg-[#2A4E3F]/10 border border-[#2A4E3F]/20 text-left transition-all duration-300 group hover:shadow-[0_15px_30px_rgba(42,78,63,0.12)] hover:border-brand-green hover:-translate-y-1"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-lg bg-[#2A4E3F]/10 text-brand-green flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-brand-green uppercase font-bold tracking-wider block">Call 24/7 Desk</span>
                    <span className="text-stone-700 text-base font-medium">+91 9304868696</span>
                  </div>
                </div>
                <span className="text-sm text-brand-green font-bold group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* Email Desk */}
              <div className="flex gap-4 items-start p-5 bg-stone-50/50 border border-[#E5E2DA] rounded-xl hover:border-brand-radishblack hover:bg-white hover:-translate-y-0.5 transition-all duration-500 hover:shadow-md group">
                <div className="w-11 h-11 rounded-lg bg-white border border-[#E5E2DA] text-stone-600 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-brand-gold-dark group-hover:to-brand-gold group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 uppercase font-semibold block">Email Support</span>
                  <span className="text-stone-700 text-base font-light">bookings@thecorporatehouse.com</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 items-start p-5 bg-stone-50/50 border border-[#E5E2DA] rounded-xl hover:border-brand-radishblack hover:bg-white hover:-translate-y-0.5 transition-all duration-500 hover:shadow-md group">
                <div className="w-11 h-11 rounded-lg bg-white border border-[#E5E2DA] text-stone-600 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-brand-gold-dark group-hover:to-brand-gold group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 uppercase font-semibold block">Address Location</span>
                  <span className="text-stone-700 text-base font-light">Argoda Chawk, Ranchi</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Query Form Section (7 cols) */}
        <div id="query-section" className="lg:col-span-7 bg-white border border-[#E5E2DA] rounded-xl p-8 md:p-12 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h3 className="text-3xl font-serif font-light text-[#1C2A22]">
                Submit A Query
              </h3>
              <p className="text-stone-500 text-sm font-light">
                Have a question about room packages, coastal excursions, or rates? Fill out the details below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-400">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@domain.com"
                    className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold tracking-wider text-stone-400">Query Category</label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-brand-green transition-colors appearance-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Booking/Reservation Issue">Booking/Reservation Issue</option>
                  <option value="Service Complaint / Feedback">Service Complaint / Feedback</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold tracking-wider text-stone-400">Message details</label>
                <textarea
                  rows="5"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Outline your check-in dates, guest counts, or special requirements..."
                  className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-brand-green transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-hover shadow-sm flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Submit Query"}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#2A4E3F]/10 text-brand-green flex items-center justify-center mx-auto border border-brand-green/20">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-light text-[#1C2A22]">Query Received</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-stone-850">{formState.name}</strong>. Your question about <span className="text-brand-green">"{formState.subject}"</span> has been submitted. One of our guest designers will email you shortly.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-stone-600 bg-white hover:bg-stone-50 border border-[#E5E2DA] transition-colors"
              >
                Submit Another Query
              </button>
            </div>
          )}
        </div>

      </section>

    </div>
  );
}

export default Contact;