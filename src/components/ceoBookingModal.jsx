"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User, Mail, Phone, CheckCircle, Clock, Calendar, MessageSquare, Video, MapPin } from "lucide-react";
import { getCeoAvailability, bookCeoAppointment } from "@/apis/consultBookingApi";

export default function CeoBookingModal({ isOpen, onClose }) {
  // ── Data state ──────────────────────────────────────────────────────────
  const [ceoData, setCeoData] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  // ── Selection state ──────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    meeting_type: "online",
    student_notes: "",
  });

  // ── Submission state ──────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // ── Fetch availability when modal opens ───────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setLoadingSlots(true);
    setSlotsError(null);
    getCeoAvailability()
      .then((res) => {
        if (res?.success && res?.data) {
          setCeoData(res.data);
          if (res.data.available_dates?.length > 0) {
            setSelectedDate(res.data.available_dates[0]);
          }
        } else {
          setSlotsError("Could not load available slots. Please try again.");
        }
      })
      .catch(() => setSlotsError("Network error. Please check your connection."))
      .finally(() => setLoadingSlots(false));
  }, [isOpen]);

  // ── Derived: slots for the selected date ─────────────────────────────────
  const activeSlots =
    ceoData?.slots?.filter((s) => s.slot_date === selectedDate) || [];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlotId(null);
    setValidationErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setValidationErrors({});

    if (!selectedSlotId) {
      setSubmitError("Please select a time slot before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        schedule_id: selectedSlotId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        meeting_type: form.meeting_type,
        student_notes: form.student_notes,
      };

      const res = await bookCeoAppointment(payload);

      if (res?.success) {
        setIsSubmitted(true);
      } else if (res?.errors) {
        // Map 422 validation errors to field-level display
        setValidationErrors(res.errors);
        setSubmitError("Please correct the errors below.");
      } else {
        setSubmitError(res?.message || "Booking failed. Please try a different slot.");
      }
    } catch {
      setSubmitError("Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset all state on close
    setCeoData(null);
    setSelectedDate("");
    setSelectedSlotId(null);
    setForm({ name: "", email: "", phone: "", meeting_type: "online", student_notes: "" });
    setIsSubmitted(false);
    setSubmitError(null);
    setValidationErrors({});
    onClose();
  };

  if (!isOpen) return null;

  // ── Format time helper ────────────────────────────────────────────────────
  const fmt = (t) => t?.substring(0, 5) ?? "";

  // ── Format date for display ───────────────────────────────────────────────
  const fmtDate = (d) => {
    if (!d) return "";
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const selectedSlot = ceoData?.slots?.find((s) => s.id === selectedSlotId);

  // ── Modal markup ──────────────────────────────────────────────────────────
  const modalContent = (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="relative p-5 border-b border-brand-primary/20 bg-(--nav-background) text-white flex justify-between items-center shrink-0">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              CEO &amp; Founder Counseling
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Book a Session with&nbsp;
              {ceoData?.official?.full_name ?? "Md. Rafiqul Islam"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable body ──────────────────────────────────────────────── */}
        <div className="overflow-y-auto scroll-none flex-1 p-6 md:p-8 bg-white">
          {/* ── Success state ─────────────────────────────────────────────── */}
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-emerald-50 p-4 rounded-full mb-6 animate-bounce">
                <CheckCircle className="w-16 h-16 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Booked!
              </h3>
              <p className="text-gray-600 max-w-md mb-2">
                Thank you,{" "}
                <span className="font-semibold">{form.name}</span>! Your
                counseling session with{" "}
                <span className="font-semibold">
                  {ceoData?.official?.full_name ?? "the CEO"}
                </span>{" "}
                has been confirmed.
              </p>
              {selectedSlot && (
                <p className="text-sm text-gray-500 mb-8">
                  📅 {fmtDate(selectedSlot.slot_date)} &nbsp;·&nbsp; 🕐{" "}
                  {fmt(selectedSlot.start_time)} – {fmt(selectedSlot.end_time)}
                </p>
              )}
              <p className="text-xs text-gray-400 mb-8 max-w-xs">
                We will contact you at <strong>{form.email}</strong> soon to confirm details.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-brand-primary hover:bg-brand-accent text-white font-semibold rounded-xl transition duration-300 shadow-md cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* ── Loading / Error for slots ──────────────────────────── */}
              {loadingSlots ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
                  <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm">Loading available slots…</p>
                </div>
              ) : slotsError ? (
                <div className="py-12 text-center">
                  <p className="text-red-500 text-sm mb-4">{slotsError}</p>
                  <button
                    className="px-6 py-2 bg-brand-primary text-white rounded-xl text-sm font-semibold cursor-pointer"
                    onClick={() => {
                      setSlotsError(null);
                      setLoadingSlots(true);
                      getCeoAvailability()
                        .then((res) => {
                          if (res?.success) {
                            setCeoData(res.data);
                            if (res.data.available_dates?.length) setSelectedDate(res.data.available_dates[0]);
                          } else setSlotsError("Could not load slots.");
                        })
                        .catch(() => setSlotsError("Network error."))
                        .finally(() => setLoadingSlots(false));
                    }}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ── Section 1: Pick a date ───────────────────────── */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3 flex items-center gap-1.5">
                      <Calendar size={14} /> Select a Date
                    </h4>
                    {ceoData?.available_dates?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {ceoData.available_dates.map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => handleDateSelect(date)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              selectedDate === date
                                ? "bg-brand-primary border-brand-primary text-white shadow-sm"
                                : "border-gray-300 text-gray-600 hover:border-brand-primary hover:text-brand-primary bg-white"
                            }`}
                          >
                            {fmtDate(date)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                        No available dates at the moment. Please check back later.
                      </p>
                    )}
                  </div>

                  {/* ── Section 2: Pick a time slot ─────────────────── */}
                  {selectedDate && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3 flex items-center gap-1.5">
                        <Clock size={14} /> Select a Time Slot
                      </h4>
                      {activeSlots.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {activeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setSelectedSlotId(slot.id)}
                              className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                selectedSlotId === slot.id
                                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                                  : "border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary bg-white"
                              }`}
                            >
                              {fmt(slot.start_time)} – {fmt(slot.end_time)}
                              <span className="block text-[10px] font-normal text-gray-400 mt-0.5">
                                {slot.day_of_week}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                          No available slots for this date.
                        </p>
                      )}
                    </div>
                  )}

                  <hr className="border-gray-100" />

                  {/* ── Section 3: Meeting type ──────────────────────── */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">
                      Meeting Preference
                    </h4>
                    <div className="flex gap-3">
                      {[
                        { value: "online", label: "Online", Icon: Video },
                        { value: "physical", label: "In-Person", Icon: MapPin },
                      ].map(({ value, label, Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, meeting_type: value }))}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                            form.meeting_type === value
                              ? "bg-brand-primary border-brand-primary text-white"
                              : "border-gray-300 text-gray-600 hover:border-brand-primary bg-white"
                          }`}
                        >
                          <Icon size={15} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* ── Section 4: Personal details ──────────────────── */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-4 flex items-center gap-1.5">
                      <User size={14} /> Your Details
                    </h4>
                    <div className="space-y-4">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            placeholder="Your full name"
                            required
                            className={`pl-9 pr-4 w-full py-2.5 outline-none border rounded-xl focus:ring-2 transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white ${
                              validationErrors.name
                                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                            }`}
                          />
                        </div>
                        {validationErrors.name && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.name[0]}</p>
                        )}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleFormChange}
                              placeholder="your@email.com"
                              required
                              className={`pl-9 pr-4 w-full py-2.5 outline-none border rounded-xl focus:ring-2 transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white ${
                                validationErrors.email
                                  ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                  : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                              }`}
                            />
                          </div>
                          {validationErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.email[0]}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-gray-700">
                            Phone / WhatsApp
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleFormChange}
                              placeholder="+880 17XX XXXXXX"
                              className={`pl-9 pr-4 w-full py-2.5 outline-none border rounded-xl focus:ring-2 transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white ${
                                validationErrors.phone
                                  ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                  : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                              }`}
                            />
                          </div>
                          {validationErrors.phone && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.phone[0]}</p>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          <MessageSquare size={13} /> Notes for the CEO{" "}
                          <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          name="student_notes"
                          value={form.student_notes}
                          onChange={handleFormChange}
                          placeholder="Share your inquiry or consultation topic (e.g. scholarship options, visa guidance…)"
                          rows={3}
                          className="w-full px-4 py-2.5 outline-none border border-gray-300 bg-white rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm text-gray-900 placeholder:text-gray-400 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Global error ─────────────────────────────────── */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                      {submitError}
                    </div>
                  )}

                  {/* ── Submit ───────────────────────────────────────── */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedSlotId}
                    className={`w-full py-4 bg-brand-primary hover:bg-brand-accent text-white font-bold rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider flex justify-center items-center gap-2 ${
                      isSubmitting || !selectedSlotId
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Confirming…
                      </>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

