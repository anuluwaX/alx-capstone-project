// src/components/SecondaryButton.jsx
import React from "react";

export function SecondaryButton({ children, onClick, disabled, ariaLabel, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={`px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm shadow-sm 
        hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition`}
    >
      {children}
    </button>
  );
}
