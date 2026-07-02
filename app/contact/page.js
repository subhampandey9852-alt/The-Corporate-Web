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
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} text-[var(--ink)] min-h-screen font-sans pt-[30px] pb-16 px-6 md:px-12 max-w-[90rem] mx-auto space-y-16 selection:bg-[var(--accent)] selection:text-white`}>

      {/* Page Header */}
      <section className="text-center max-w-4xl mx-auto space-y-5 pt-0">
        <span className="text-sm uppercase tracking-[0.3em] text-[var(--accent)] font-semibold flex items-center justify-center gap-2">
          <Clock className="w-5.5 h-5.5 text-[var(--accent)]" />
          Always Available
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)] tracking-tight">
          Hotel Inquiries & Support
        </h1>
        <div className="w-16 h-0.5 bg-[var(--accent)] mx-auto"></div>
        <p className="text-[var(--muted)] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Our guest relationship desk is staffed 24 hours a day, 7 days a week. Get in touch via WhatsApp, direct call, or submit a request directly below.
        </p>
      </section>

      {/* Trust & Satisfaction Banner */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-gradient-to-br from-[#fcfaf7] to-[#f5ebd7] border border-[#eadaa6]/50 rounded-[2rem] flex items-start gap-4 shadow-sm hover:border-[var(--accent)] hover:shadow-md hover:shadow-[var(--accent)]/5 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:scale-105 transition-all duration-300">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300">24/7 Service Desk</h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Day or night, our team of guest experience planners is always ready to accommodate your needs.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-[#f8faf8] to-[#e4eedf] border border-[#c5d8be]/50 rounded-[2rem] flex items-start gap-4 shadow-sm hover:border-emerald-600/60 hover:shadow-md hover:shadow-emerald-600/5 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700/10 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 group-hover:text-white group-hover:scale-105 transition-all duration-300">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-[var(--ink)] group-hover:text-emerald-700 transition-colors duration-300">100% Satisfaction</h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              We guarantee pristine coastal rooms. If you are unsatisfied, we make it right instantly.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-[#f7f8fa] to-[#e0e8f0] border border-[#c1d0df]/50 rounded-[2rem] flex items-start gap-4 shadow-sm hover:border-blue-600/60 hover:shadow-md hover:shadow-blue-600/5 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-blue-700/10 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 group-hover:text-white group-hover:scale-105 transition-all duration-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-[var(--ink)] group-hover:text-blue-700 transition-colors duration-300">Secured Bookings</h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              All transactions and reservation logs are fully encrypted. Your guest and credit data is safe with us.
            </p>
          </div>
        </div>
      </section>

      {/* Main Connection Channels */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Contact info channels (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[var(--ink)] pb-3 border-b border-[var(--border)]">
              Direct Channels
            </h3>

            <div className="space-y-4">

              {/* WhatsApp Redirection */}
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full flex items-center justify-between p-5 rounded-3xl bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 text-left transition-all duration-300 group hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#25D366] uppercase font-bold tracking-wider block">Chat on WhatsApp</span>
                    <span className="text-[var(--ink)] text-base font-semibold">+91 9304868696</span>
                  </div>
                </div>
                <span className="text-sm text-[#25D366] font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {/* Direct Call */}
              <a
                href="tel:+919304868696"
                className="w-full flex items-center justify-between p-5 rounded-3xl bg-[var(--accent)]/5 hover:bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-left transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--accent)] uppercase font-bold tracking-wider block">Call 24/7 Desk</span>
                    <span className="text-[var(--ink)] text-base font-semibold">+91 9304868696</span>
                  </div>
                </div>
                <span className="text-sm text-[var(--accent)] font-bold group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* Email Desk */}
              <div className="flex gap-4 items-start p-5 bg-[var(--page-bg)]/40 border border-[var(--border)] rounded-3xl hover:bg-[var(--surface)] hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[var(--muted)] uppercase font-semibold block">Email Support</span>
                  <span className="text-[var(--ink)] text-base font-medium">bookings@thecorporatehouse.com</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 items-start p-5 bg-[var(--page-bg)]/40 border border-[var(--border)] rounded-3xl hover:bg-[var(--surface)] hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[var(--muted)] uppercase font-semibold block">Address Location</span>
                  <span className="text-[var(--ink)] text-base font-medium">Argoda Chowk, Ranchi</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Query Form Section (7 cols) */}
        <div id="query-section" className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] p-8 md:p-12 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-3xl font-semibold text-[var(--ink)]">
                Submit A Query
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Have a question about room packages, coastal excursions, or rates? Fill out the details below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-semibold tracking-wider text-[var(--muted)]/80">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-semibold tracking-wider text-[var(--muted)]/80">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@domain.com"
                    className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-semibold tracking-wider text-[var(--muted)]/80">Query Category</label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Booking/Reservation Issue">Booking/Reservation Issue</option>
                  <option value="Service Complaint / Feedback">Service Complaint / Feedback</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-semibold tracking-wider text-[var(--muted)]/80">Message Details</label>
                <textarea
                  rows="5"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Outline your check-in dates, guest counts, or special requirements..."
                  className="bg-[var(--page-bg)] border border-[var(--border)] rounded-2xl px-5 py-4 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-[var(--ink)] hover:bg-[var(--accent)] shadow-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Submit Query"}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-55/10 text-[var(--success)] flex items-center justify-center mx-auto border border-emerald-55/20">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[var(--ink)]">Query Received</h3>
                <p className="text-sm text-[var(--muted)] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[var(--ink)]">{formState.name}</strong>. Your question about <span className="text-[var(--accent)]">"{formState.subject}"</span> has been submitted. One of our guest designers will email you shortly.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--page-bg)] border border-[var(--border)] transition-all cursor-pointer"
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