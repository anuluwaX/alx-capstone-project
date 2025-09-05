// src/hooks/useExchangeRates.js
import { useEffect, useState, useCallback } from "react";

// Public APIs (choose one or fallback)
const PRIMARY_ENDPOINT = "https://api.exchangerate.host/latest";
const FALLBACK_ENDPOINT = "https://open.er-api.com/v6/latest";

export function useExchangeRates(baseCurrency) {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchExchangeRates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let res = await fetch(`${PRIMARY_ENDPOINT}?base=${baseCurrency}`);
      if (!res.ok) throw new Error("Primary API failed");
      let data = await res.json();

      if (!data.rates) throw new Error("Invalid response from primary API");
      setExchangeRates(data.rates);
      setLastUpdated(Date.now());
    } catch (e1) {
      try {
        // Try fallback API
        let res = await fetch(`${FALLBACK_ENDPOINT}/${baseCurrency}`);
        if (!res.ok) throw new Error("Fallback API failed");
        let data = await res.json();

        if (!data.rates) throw new Error("Invalid response from fallback API");
        setExchangeRates(data.rates);
        setLastUpdated(Date.now());
      } catch (e2) {
        console.error("Exchange rate fetch error:", e2);
        setError("Failed to fetch exchange rates. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => {
    if (baseCurrency) fetchExchangeRates();
  }, [baseCurrency, fetchExchangeRates]);

  return { exchangeRates, error, loading, lastUpdated, fetchExchangeRates, clearError: () => setError("") };
}
