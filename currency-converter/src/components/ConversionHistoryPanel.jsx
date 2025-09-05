// src/components/ConversionHistoryPanel.jsx
import React from "react";
import Button from "./Button";
import { SecondaryButton } from "./SecondaryButton";

export default function ConversionHistoryPanel({
  history,
  onClearHistory,
  onSelectConversion,
  onRemoveOne,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Conversion History
        </h2>
        {history.length > 0 && (
          <SecondaryButton onClick={onClearHistory}>
            Clear All
          </SecondaryButton>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No conversions yet.
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <button
                className="text-left flex-1 text-sm text-gray-800 dark:text-gray-200"
                onClick={() => onSelectConversion(item)}
              >
                {item.amount} {item.fromCurrency} → {item.convertedAmount.toFixed(2)}{" "}
                {item.toCurrency}
              </button>
              <SecondaryButton onClick={() => onRemoveOne(item.id)}>
                ✕
              </SecondaryButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
