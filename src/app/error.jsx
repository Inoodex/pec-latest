"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Route error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] p-6 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <svg
          className="w-12 h-12 text-red-500"
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
      </div>
      <h2 className="text-2xl font-extrabold text-brand-primary mb-2">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        {error?.message || "An unexpected route error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-brand-accent hover:bg-brand-primary text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
