"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Heading from "./heading";
import {
    X,
    User,
    Mail,
    Phone,
    Calendar,
    Clock,
    CheckCircle,
} from "lucide-react";
import { bookConsultation, getSlotByDate } from "@/apis/consultBookingApi";

function ConsultBookingModal({ isOpen, onClose }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        schedule_id: "",
    });
    const [time, setTime] = useState([]);

    useEffect(() => {
        const run = async () => {
            if (!formData.preferredDate) {
                setTime([]);
                return;
            }
            const res = await getSlotByDate(formData.preferredDate);
            if (Array.isArray(res)) {
                setTime(res);
            } else if (res && Array.isArray(res.data)) {
                setTime(res.data);
            } else {
                setTime([]);
            }
        };
        run();
    }, [formData.preferredDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "schedule_id") {
            const selected = time.find((t) => String(t.id) === String(value));
            const display = selected
                ? `${selected.start_time} - ${selected.end_time}`
                : "";
            setFormData((prev) => ({
                ...prev,
                schedule_id: value,
                preferredTime: display,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const nameParts = formData.fullName.split(" ");
        const first_name = nameParts[0] || "";
        const last_name = nameParts.slice(1).join(" ") || "";

        try {
            const bookingPayload = {
                name: formData.fullName,
                first_name: first_name,
                last_name: last_name,
                email: formData.email,
                phone: formData.phone,
                schedule_id: formData.schedule_id || null,
                meeting_type: "online",
                additional_info: {
                    preferred_date: formData.preferredDate,
                    preferred_time: formData.preferredTime,
                },
            };

            const response = await bookConsultation(bookingPayload);
            if (
                response &&
                (response.success ||
                    response.status === "success" ||
                    response.id ||
                    response.data)
            ) {
                setIsSubmitted(true);
            } else {
                setError(
                    response?.message ||
                        "Something went wrong. Please try again.",
                );
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError("Failed to submit. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsSubmitted(false);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity duration-300">
            <div
                className="absolute inset-0 cursor-pointer"
                onClick={handleClose}
            ></div>

            <div className="relative w-full max-w-2xl bg-white text-gray-900 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl z-10 transform scale-100 transition-all duration-300 max-h-[90vh] flex flex-col">
                <div className="relative p-6 border-b border-gray-200 bg-[rgb(22,37,86)] text-white flex justify-between items-center shrink-0">
                    <div>
                        <span className="text-2xl font-bold text-white">
                            PECEDU Global
                        </span>
                        <h2 className="text-lg font-medium">
                            Book Consultation
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

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-6 md:p-8 flex-1 bg-white text-gray-900">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="bg-emerald-50 p-4 rounded-full mb-6 animate-bounce">
                                <CheckCircle className="w-16 h-16 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Booking Successful!
                            </h3>
                            <p className="text-gray-600 max-w-md mb-8">
                                Thank you for choosing PECEDU Global,{" "}
                                <span className="font-semibold">
                                    {formData.fullName}
                                </span>
                                ! One of our expert consultants will contact you
                                shortly to confirm your slot.
                            </p>
                            <button
                                onClick={handleClose}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 shadow-md cursor-pointer"
                            >
                                Close Window
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium uppercase text-blue-600 mb-4">
                                    1. Personal Details
                                </h4>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                        Full Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="pl-9 pr-4 w-full py-2.5 outline-none border border-gray-300 bg-white rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                            Email Address{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john.doe@example.com"
                                                className="pl-9 pr-4 w-full py-2.5 outline-none border border-gray-300 bg-white rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                            Contact Number{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+880 17XX XXXXXX"
                                                className="pl-9 pr-4 w-full py-2.5 outline-none border border-gray-300 bg-white rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            <div>
                                <h4 className="text-sm font-medium uppercase text-blue-600 mb-4">
                                    2. Session Schedule
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                            Preferred Date{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="date"
                                                name="preferredDate"
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                className="pl-9 pr-4 w-full py-2.5 outline-none border border-gray-300 bg-white rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                            Preferred Time Slot{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <select
                                                name="schedule_id"
                                                value={formData.schedule_id}
                                                onChange={handleChange}
                                                className="pl-9 pr-4 w-full py-2.5 outline-none border border-gray-300 bg-white rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm text-gray-900"
                                                required
                                            >
                                                <option value="" disabled>
                                                    {time && time.length > 0
                                                        ? "Select a time slot"
                                                        : "No slots available"}
                                                </option>
                                                {(Array.isArray(time)
                                                    ? time
                                                    : []
                                                ).map((slot, idx) => (
                                                    <option
                                                        key={slot.id ?? idx}
                                                        value={slot.id}
                                                    >
                                                        {slot.start_time} -{" "}
                                                        {slot.end_time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-200 mt-6 uppercase tracking-wider flex justify-center items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Request"}
                            </button>
                            {error && (
                                <p className="text-red-600 text-sm mt-2 text-center">
                                    {error}
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

const StaticPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pageData = {
        title: "Help Me To Decide",
        description:
            "If you can't select your country or university, Discuss with our expert team to decide your destination.",
    };

    return (
        <section className="bg-gray-50 py-4 md:py-8 px-4 sm:px-3 lg:px-4">
            <div className="max-w-3xl mx-auto w-full text-gray-700 flex flex-col items-center text-center">
                <Heading
                    color={false}
                    title={pageData.title}
                    paragraph={pageData.description}
                />

                <div className="mt-2 md:mt-4 w-full sm:w-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-xl transition duration-200 shadow-md hover:shadow-lg text-sm md:text-base cursor-pointer"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

            <ConsultBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default StaticPage;
