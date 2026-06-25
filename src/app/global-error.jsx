"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error boundary caught an error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex flex-col justify-center items-center min-h-screen p-6 text-center bg-gray-50 text-gray-900 font-sans">
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
        <h2 className="text-3xl font-extrabold text-red-600 mb-2">
          A Critical Error Occurred!
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          {error?.message || "A critical global error has occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-brand-accent hover:bg-brand-primary text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
