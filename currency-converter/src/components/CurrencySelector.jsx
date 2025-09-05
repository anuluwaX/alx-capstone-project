// src/components/CurrencySelector.jsx
import React from "react";

export default function CurrencySelector({ currencies, value, onChange, disabled, label }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
          dark:bg-gray-900 dark:text-gray-100 text-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} — {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
