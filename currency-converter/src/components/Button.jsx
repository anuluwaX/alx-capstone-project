// src/components/Button.jsx
import React from "react";

export default function Button({ children, onClick, disabled, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm 
        hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition`}
    >
      {children}
    </button>
  );
}
