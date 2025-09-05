// src/components/AmountInput.jsx
import React from "react";

export default function AmountInput({ value, onChange, error, disabled }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Amount
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2 rounded-lg border text-sm
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700"}
          dark:bg-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
