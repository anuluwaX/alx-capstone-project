// src/components/ErrorDisplay.jsx
import React from "react";
import Button from "./Button";
import { SecondaryButton } from "./SecondaryButton";

export default function ErrorDisplay({ error, onRetry, onDismiss }) {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700">
      <p className="text-sm text-red-700 dark:text-red-300 mb-2">{error}</p>
      <div className="flex gap-2">
        {onRetry && (
          <Button onClick={onRetry}>
            Retry
          </Button>
        )}
        {onDismiss && (
          <SecondaryButton onClick={onDismiss}>
            Dismiss
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}
