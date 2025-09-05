// src/components/ThemeToggle.jsx
import React from "react";

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm shadow-sm
        hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
