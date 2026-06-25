"use client";

import {
  ArrowRight,
  Calendar,
  MapPin,
  Plane,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { postInqueriesData } from "@/apis/postInqueriesData";
const inputClass =
  "mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base";

const AirTicketBookingModal = ({
  buttonLabel = "Book Ticket",
  className = "",
  packageDetails = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(event.target);
    const fullName = formData.get("name") || "";
    const nameParts = fullName.split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";
    
    const payload = {
        first_name: first_name,
        last_name: last_name,
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        type: "air_ticket",
        additional_info: {
            number_of_passengers: formData.get("passengers"),
            from_country: formData.get("fromCountry"),
            to_country: formData.get("toCountry"),
            journey_date: formData.get("journeyDate"),
            return_date: formData.get("returnDate"),
            trip_type: formData.get("tripType"),
            ticket_class: formData.get("ticketClass"),
            passenger_type: formData.get("passengerType"),
            estimated_budget: "",
            additional_notes: formData.get("notes")
        }
    };
    
    try {
        const response = await postInqueriesData("inquiry", payload);
        if (response && (response.success || response.status === "success" || response.id || response.data)) {
            setIsSubmitted(true);
        } else {
            setError(response?.message || "Something went wrong. Please try again.");
        }
    } catch (err) {
        console.error("Submission error:", err);
        setError("Failed to submit. Please check your connection.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setError(null);
  };

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/70 px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
      <button
        type="button"
        aria-label="Close air ticket booking form"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
      />

      <div className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden scroll-none rounded-t-3xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 text-left text-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl sm:p-5 md:p-8">
        <button
          type="button"
          aria-label="Close air ticket booking form"
          onClick={closeModal}
          className="absolute right-3 top-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-brand-primary transition hover:bg-gray-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={20} />
        </button>

        <div className="pr-10 sm:pr-12">
          <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-gray-200 sm:text-sm">
            <Ticket size={16} />
            Air Ticket Booking
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white leading-tight sm:text-2xl md:text-3xl">
            {packageDetails.name
              ? `Book ${packageDetails.name} Ticket`
              : "Share Your Flight Details"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
            Fill in the details below and our ticketing team will contact you
            with available fares, routes, and booking guidance.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold sm:text-xl">
              Booking request received
            </h3>
            <p className="mt-2 text-white/80">
              Thank you. PEC Edu Global will contact you soon with air ticket
              options.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-5 rounded-xl bg-brand-accent px-5 py-3 font-medium text-white transition hover:bg-brand-accent/80"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-5 grid min-w-0 grid-cols-1  gap-4 text-sm sm:gap-5 sm:text-base md:grid-cols-2"
          >
            <label htmlFor="ticket-name" className="block">
              Full Name
              <input
                id="ticket-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </label>

            <label htmlFor="ticket-phone" className="block">
              Phone Number
              <input
                id="ticket-phone"
                name="phone"
                type="tel"
                required
                placeholder="Your phone number"
                className={inputClass}
              />
            </label>

            <label htmlFor="ticket-email" className="block">
              Email Address
              <input
                id="ticket-email"
                name="email"
                type="email"
                placeholder="Your email address"
                className={inputClass}
              />
            </label>

            <label htmlFor="ticket-passengers" className="block">
              Number of Passengers
              <div className="relative mt-2">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="ticket-passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  required
                  placeholder="How many people?"
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="ticket-from" className="block">
              From Country
              <div className="relative mt-2">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="ticket-from"
                  name="fromCountry"
                  type="text"
                  required
                  placeholder="Example: Bangladesh"
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="ticket-to" className="block">
              To Country
              <div className="relative mt-2">
                <Plane
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="ticket-to"
                  name="toCountry"
                  type="text"
                  required
                  defaultValue={packageDetails.name || ""}
                  placeholder="Example: Canada"
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="ticket-date" className="block">
              Journey Date
              <div className="relative mt-2">
                <Calendar
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="ticket-date"
                  name="journeyDate"
                  type="date"
                  required
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="ticket-return-date" className="block">
              Return Date
              <input
                id="ticket-return-date"
                name="returnDate"
                type="date"
                className={inputClass}
              />
            </label>

            <label htmlFor="ticket-trip-type" className="block">
              Trip Type
              <select
                id="ticket-trip-type"
                name="tripType"
                required
                className={inputClass}
              >
                <option value="" className="text-slate-900">
                  Select trip type
                </option>
                <option className="text-slate-900">One Way</option>
                <option className="text-slate-900">Round Trip</option>
                <option className="text-slate-900">Multi City</option>
              </select>
            </label>

            <label htmlFor="ticket-class" className="block">
              Ticket Class
              <select
                id="ticket-class"
                name="ticketClass"
                className={inputClass}
              >
                <option className="text-slate-900">Economy</option>
                <option className="text-slate-900">Premium Economy</option>
                <option className="text-slate-900">Business</option>
                <option className="text-slate-900">First Class</option>
              </select>
            </label>

            <label htmlFor="ticket-type" className="block">
              Passenger Type
              <select
                id="ticket-type"
                name="passengerType"
                className={inputClass}
              >
                <option className="text-slate-900">Regular</option>
                <option className="text-slate-900">Student</option>
                <option className="text-slate-900">Family</option>
                <option className="text-slate-900">Group</option>
              </select>
            </label>

            <label htmlFor="ticket-notes" className="md:col-span-2">
              Additional Notes
              <textarea
                id="ticket-notes"
                name="notes"
                placeholder={`Preferred airline, baggage needs, transit preference, visa status, child/infant passengers, etc.${packageDetails.bestTime
                  ? ` Best time: ${packageDetails.bestTime}.`
                  : ""
                  }`}
                className="mt-2 min-h-24 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:min-h-28 sm:text-base"
              />
            </label>

            <p className="rounded-2xl border border-white/30 bg-white/10 p-3 text-xs leading-5 text-white/85 sm:p-4 sm:text-sm sm:leading-6 md:col-span-2">
              By submitting this form, you agree to be contacted by PEC Edu
              Global about your air ticket booking request.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex md:col-span-2 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-brand-primary py-3 text-base font-medium text-white transition hover:bg-brand-accent/80 sm:text-lg ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
            {error && (
              <p className="md:col-span-2 text-red-400 text-sm mt-1">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 cursor-pointer rounded-full bg-brand-accent px-7 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-primary"
        }
      >
        {buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </button>

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default AirTicketBookingModal;
