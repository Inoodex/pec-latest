"use client";
import { useState, useEffect } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { postInqueriesData } from "../../apis/postInqueriesData";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postInqueriesData("contact", {
        ...formData,
        type: "contact",
      });

      if (response && response.message === "Message sent successfully!") {
        setToast({
          type: "success",
          message: response.message,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setToast({
          type: "error",
          message:
            response?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setToast({
        type: "error",
        message: "An error occurred while sending the message.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            Name
          </label>
          <div className="flex items-center bg-white gap-3 ring ring-gray-300 focus-within:ring-1 rounded-xl px-4 py-3">
            <User size={20} className="text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-transparent text-sm outline-none md:text-base"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center gap-3 rounded-xl ring ring-gray-300 focus-within:ring-1 px-4 py-3 bg-white">
            <Mail size={20} className="text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-transparent text-sm outline-none md:text-base"
              required
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            Subject
          </label>
          <div className="flex items-center bg-white gap-3 ring ring-gray-300 focus-within:ring-1 rounded-xl px-4 py-3">
            <MessageSquare size={20} className="text-gray-500" />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full bg-transparent text-sm outline-none md:text-base"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            Message
          </label>
          <div className="flex gap-3 rounded-xl px-4 py-3 ring ring-gray-300 focus-within:ring-1 bg-white">
            <MessageSquare size={20} className="mt-1 text-gray-500" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write your message..."
              className="w-full resize-none bg-transparent text-sm outline-none md:text-base"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-accent cursor-pointer px-6 py-3 text-sm font-medium text-white transition-all md:text-base disabled:bg-gray-400"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 text-white border transition-all duration-300 transform translate-y-0 ${
            toast.type === "success"
              ? "bg-emerald-600 border-emerald-500"
              : "bg-red-600 border-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <svg
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          <div>
            <p className="font-semibold text-sm">{toast.message}</p>
          </div>
        </div>
      )}
    </>
  );
}
