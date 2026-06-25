"use client";

import {
  ArrowRight,
  Calendar,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { postInqueriesData } from "@/apis/postInqueriesData";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base";

const InsuranceProtectionModal = ({
  buttonLabel = "Get Protected Now",
  className = "",
  defaultInsuranceType = "Health Insurance",
  hideTrigger = false,
  onOpenChange,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isControlled = open !== undefined;
  const modalIsOpen = isControlled ? open : isOpen;

  const openModal = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenChange?.(true);
  };

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
        type: "health_insurance",
        additional_info: {
            insurance_type: formData.get("insuranceType"),
            insured_persons: formData.get("insuredPersons"),
            date_of_birth: formData.get("dateOfBirth"),
            passport_number: formData.get("passport"),
            nationality: formData.get("nationality"),
            current_country: formData.get("currentCountry"),
            destination_country: formData.get("destination"),
            coverage_start_date: formData.get("startDate"),
            coverage_end_date: formData.get("endDate"),
            travel_purpose: formData.get("purpose"),
            medical_condition: formData.get("medicalCondition")
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
    if (!isControlled) {
      setIsOpen(false);
    }
    setIsSubmitted(false);
    setError(null);
    onOpenChange?.(false);
  };

  const modalContent = modalIsOpen ? (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/70 px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
      <button
        type="button"
        aria-label="Close insurance request form"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
      />

      <div className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden scroll-none rounded-t-3xl border border-white/15 bg-white/20 backdrop-blur-md p-4 text-left text-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl sm:p-5 md:p-8">
        <button
          type="button"
          aria-label="Close insurance request form"
          onClick={closeModal}
          className="absolute right-3 top-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-brand-primary transition hover:bg-gray-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={20} />
        </button>

        <div className="pr-10 sm:pr-12">
          <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/70 sm:text-sm">
            <ShieldCheck size={16} />
            Insurance Request
          </p>
          <h2 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
            Health & Travel Insurance Details
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Share your personal, travel, and coverage information. Our team will
            suggest a suitable health, student, or travel insurance plan.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold sm:text-xl">
              Request received
            </h3>
            <p className="mt-2 text-white/80">
              Thank you. PEC Edu Global will contact you soon with insurance
              plan options.
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
            className="mt-5 grid min-w-0 grid-cols-1 gap-4 text-sm sm:gap-5 sm:text-base md:grid-cols-2"
          >
            <label htmlFor="insurance-type" className="block">
              Insurance Type
              <select
                id="insurance-type"
                name="insuranceType"
                defaultValue={defaultInsuranceType}
                required
                className={inputClass}
              >
                <option className="text-slate-900">Health Insurance</option>
                <option className="text-slate-900">
                  Student Health Insurance
                </option>
                <option className="text-slate-900">
                  Travel Health Insurance
                </option>
                <option className="text-slate-900">Tourist Insurance</option>
              </select>
            </label>

            <label htmlFor="insured-persons" className="block">
              Number of People
              <div className="relative mt-2">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="insured-persons"
                  name="insuredPersons"
                  type="number"
                  min="1"
                  required
                  placeholder="How many people?"
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="insurance-name" className="block">
              Full Name
              <input
                id="insurance-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-phone" className="block">
              Phone Number
              <input
                id="insurance-phone"
                name="phone"
                type="tel"
                required
                placeholder="Your phone number"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-email" className="block">
              Email Address
              <input
                id="insurance-email"
                name="email"
                type="email"
                placeholder="Your email address"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-dob" className="block">
              Date of Birth
              <input
                id="insurance-dob"
                name="dateOfBirth"
                type="date"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-passport" className="block">
              Passport Number
              <input
                id="insurance-passport"
                name="passport"
                type="text"
                placeholder="Passport number"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-nationality" className="block">
              Nationality
              <input
                id="insurance-nationality"
                name="nationality"
                type="text"
                placeholder="Example: Bangladeshi"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-current-country" className="block">
              Current Country
              <div className="relative mt-2">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="insurance-current-country"
                  name="currentCountry"
                  type="text"
                  placeholder="Example: Bangladesh"
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="insurance-destination" className="block">
              Destination Country
              <input
                id="insurance-destination"
                name="destination"
                type="text"
                required
                placeholder="Example: Canada"
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-start-date" className="block">
              Coverage Start Date
              <div className="relative mt-2">
                <Calendar
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  id="insurance-start-date"
                  name="startDate"
                  type="date"
                  required
                  className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white sm:text-base"
                />
              </div>
            </label>

            <label htmlFor="insurance-end-date" className="block">
              Coverage End Date
              <input
                id="insurance-end-date"
                name="endDate"
                type="date"
                required
                className={inputClass}
              />
            </label>

            <label htmlFor="insurance-purpose" className="block">
              Travel Purpose
              <select
                id="insurance-purpose"
                name="purpose"
                required
                className={inputClass}
              >
                <option value="" className="text-slate-900">
                  Select purpose
                </option>
                <option className="text-slate-900">Study Abroad</option>
                <option className="text-slate-900">Tourism</option>
                <option className="text-slate-900">Medical Treatment</option>
                <option className="text-slate-900">Business Travel</option>
              </select>
            </label>

            <label
              htmlFor="insurance-medical-condition"
              className="md:col-span-2"
            >
              Medical Condition / Special Requirement
              <textarea
                id="insurance-medical-condition"
                name="medicalCondition"
                placeholder="Mention existing medical conditions, visa insurance requirements, etc..."
                className="mt-2 min-h-24 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white sm:min-h-28 sm:text-base"
              />
            </label>

            <p className="rounded-2xl border border-white/30 bg-white/10 p-3 text-xs leading-5 text-white/85 sm:p-4 sm:text-sm sm:leading-6 md:col-span-2">
              By submitting this form, you agree to be contacted by PEC Edu
              Global about health, student, or travel insurance options.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex md:col-span-2 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-brand-accent py-3 text-base font-medium text-white transition hover:bg-brand-accent/80 sm:text-lg ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmitting ? "Submitting..." : "Submit Insurance Request"}
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
      {!hideTrigger && (
        <button
          type="button"
          onClick={openModal}
          className={
            className ||
            "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-primary px-8 py-3 font-medium text-white transition-colors hover:bg-brand-accent"
          }
        >
          <HeartPulse size={18} />
          {buttonLabel}
        </button>
      )}

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default InsuranceProtectionModal;
