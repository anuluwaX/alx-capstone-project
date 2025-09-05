// src/components/ConversionResult.jsx
import React from "react";

export default function ConversionResult({
  convertedAmount,
  toCurrency,
  rate,
  fromCurrency,
  loading,
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Result
      </label>
      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 min-h-[48px] flex items-center">
        {loading ? (
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Loading...
          </span>
        ) : convertedAmount != null ? (
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {convertedAmount.toFixed(2)} {toCurrency}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Enter an amount to convert
          </span>
        )}
      </div>
      {rate && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </p>
      )}
    </div>
  );
}
