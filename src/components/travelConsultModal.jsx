"use client";

import { ArrowUpRight, Calendar, MessageCircle, Users, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { postInqueriesData } from "@/apis/postInqueriesData";
const TravelConsultModal = ({
  country,
  trigger = "consult",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isBookTrigger = trigger === "book";

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
        type: "tour_package",
        additional_info: {
            destination: formData.get("destination"),
            number_of_travelers: formData.get("travelers"),
            preferred_travel_date: formData.get("date"),
            package_details: formData.get("package"),
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
      <button
        type="button"
        aria-label="Close consultation form"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
      />

      <div className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto scroll-none rounded-t-3xl border border-white/15 bg-white/20 p-4 text-left text-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl sm:p-5 md:p-8">
        <button
          type="button"
          aria-label="Close consultation form"
          onClick={closeModal}
          className="absolute right-3 top-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-brand-primary transition hover:bg-gray-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={20} />
        </button>

        <div className="pr-10 sm:pr-12">
          <p className="text-xs uppercase tracking-wide text-white/70 sm:text-sm">
            Travel Consultation
          </p>
          <h2 className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">
            {country.countryName} Tour Booking Details
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Share your travel details and our team will contact you with
            guidance, availability, and next steps.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold sm:text-xl">
              Request received
            </h3>
            <p className="mt-2 text-white/80">
              Thank you. PEC Edu Global will contact you soon about your{" "}
              {country.countryName} tour consultation.
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
            className="mt-5 grid grid-cols-1 gap-4 text-sm sm:gap-5 sm:text-base md:grid-cols-2"
          >
            <label htmlFor="travel-name" className="block">
              Full Name
              <input
                id="travel-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/45 focus:border-white sm:mt-3"
              />
            </label>

            <label htmlFor="travel-phone" className="block">
              Phone Number
              <input
                id="travel-phone"
                name="phone"
                type="tel"
                required
                placeholder="Your phone number"
                className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/45 focus:border-white sm:mt-3"
              />
            </label>

            <label htmlFor="travel-email" className="block">
              Email Address
              <input
                id="travel-email"
                name="email"
                type="email"
                placeholder="Your email address"
                className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/45 focus:border-white sm:mt-3"
              />
            </label>

            <label htmlFor="travel-destination" className="block">
              Destination
              <input
                id="travel-destination"
                name="destination"
                type="text"
                value={country.countryName}
                readOnly
                className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none sm:mt-3"
              />
            </label>

            <label htmlFor="travel-persons" className="block">
              Number of Travelers
              <div className="relative mt-2 sm:mt-3">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="travel-persons"
                  name="travelers"
                  type="number"
                  min="1"
                  required
                  placeholder="How many people?"
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-white/45 focus:border-white"
                />
              </div>
            </label>

            <label htmlFor="travel-date" className="block">
              Preferred Travel Date
              <div className="relative mt-2 sm:mt-3">
                <Calendar
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="travel-date"
                  name="date"
                  type="date"
                  required
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-white outline-none transition focus:border-white"
                />
              </div>
            </label>

            <label htmlFor="travel-package" className="block">
              Package
              <input
                id="travel-package"
                name="package"
                type="text"
                value={`${country.duration} - ${country.price}`}
                readOnly
                className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none sm:mt-3"
              />
            </label>

            <label htmlFor="travel-notes" className="md:col-span-2">
              Additional Details
              <textarea
                id="travel-notes"
                name="notes"
                placeholder="Tell us about hotel preference, special requests, children, or anything else."
                className="mt-2 min-h-24 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/45 focus:border-white sm:mt-3 sm:min-h-28"
              />
            </label>

            <p className="rounded-2xl border border-white/30 bg-white/10 p-3 text-xs leading-5 text-white/85 sm:p-4 sm:text-sm sm:leading-6 md:col-span-2">
              By submitting this form, you agree to be contacted by PEC Edu
              Global about your travel booking request.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-xl border border-white/30 bg-brand-accent py-3 text-base font-medium text-white transition hover:bg-brand-accent/80 sm:text-lg md:col-span-2 flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmitting ? "Submitting Request..." : "Submit Request"}
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
          "mt-6 flex items-center cursor-pointer gap-2 rounded-xl bg-brand-primary px-5 py-2 text-white transition hover:bg-brand-accent"
        }
      >
        Book Now
        <ArrowUpRight size={20} />
      </button>

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default TravelConsultModal;
