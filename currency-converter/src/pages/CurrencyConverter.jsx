// src/pages/CurrencyConverter.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { CURRENCIES } from "../constants/currencies";
import { useExchangeRates } from "../hooks/useExchangeRates";

import CurrencySelector from "../components/CurrencySelector";
import AmountInput from "../components/AmountInput";
import ConversionResult from "../components/ConversionResult";
import ErrorDisplay from "../components/ErrorDisplay";
import FavoritesPanel from "../components/FavoritesPanel";
import ConversionHistoryPanel from "../components/ConversionHistoryPanel";
import Button from "../components/Button";
import { SecondaryButton } from "../components/SecondaryButton";
import { formatRate } from "../utils/format";
import { uid } from "../utils/id";
import { loadFavorites, loadHistory, saveFavorites, saveHistory } from "../utils/storage";

function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [amount, setAmount] = useState("1");
  const debouncedAmount = useDebouncedValue(amount, 250);

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [history, setHistory] = useState(() => loadHistory());
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const [amountError, setAmountError] = useState("");

  const {
    exchangeRates,
    error,
    loading,
    lastUpdated,
    fetchExchangeRates,
    clearError,
  } = useExchangeRates(fromCurrency);

  useEffect(() => saveHistory(history), [history]);
  useEffect(() => saveFavorites(favorites), [favorites]);

  const validateAmount = useCallback((val) => {
    const num = Number(val);
    if (!val || Number.isNaN(num) || num <= 0) {
      return "Please enter a valid amount greater than zero";
    }
    return "";
  }, []);

  const rate = useMemo(
    () => exchangeRates?.[toCurrency] ?? null,
    [exchangeRates, toCurrency]
  );

  const convertCurrency = useCallback(() => {
    const err = validateAmount(debouncedAmount);
    setAmountError(err);
    if (err) {
      setConvertedAmount(null);
      return;
    }
    const numAmount = Number(debouncedAmount);
    if (fromCurrency === toCurrency) {
      setConvertedAmount(numAmount);
      return;
    }
    if (!rate) {
      setConvertedAmount(null);
      return;
    }
    const result = numAmount * rate;
    setConvertedAmount(result);

    const conversion = {
      id: uid("conv"),
      fromCurrency,
      toCurrency,
      amount: numAmount,
      convertedAmount: result,
      rate,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [conversion, ...prev.slice(0, 19)]);
  }, [debouncedAmount, fromCurrency, toCurrency, rate, validateAmount]);

  useEffect(() => {
    if (rate && debouncedAmount) {
      convertCurrency();
    }
  }, [rate, debouncedAmount, fromCurrency, toCurrency, convertCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const addFavorite = (from, to, nickname) => {
    const exists = favorites.some(
      (f) => f.fromCurrency === from && f.toCurrency === to
    );
    if (exists) return;
    const newFavorite = {
      id: uid("fav"),
      fromCurrency: from,
      toCurrency: to,
      nickname: nickname || null,
      createdAt: new Date().toISOString(),
    };
    setFavorites((prev) => [newFavorite, ...prev]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const selectPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  const selectFromHistory = (conversion) => {
    setFromCurrency(conversion.fromCurrency);
    setToCurrency(conversion.toCurrency);
    setAmount(String(conversion.amount));
  };

  const removeHistoryItem = (id) =>
    setHistory((prev) => prev.filter((h) => h.id !== id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 xl:grid-cols-4 gap-8">
      <div className="xl:col-span-3 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <ErrorDisplay
            error={error}
            onRetry={fetchExchangeRates}
            onDismiss={clearError}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CurrencySelector
                currencies={CURRENCIES}
                value={fromCurrency}
                onChange={setFromCurrency}
                disabled={loading}
                label="From"
              />
              <AmountInput
                value={amount}
                onChange={setAmount}
                error={amountError}
                disabled={loading}
              />
            </div>
            <div className="space-y-4">
              <CurrencySelector
                currencies={CURRENCIES}
                value={toCurrency}
                onChange={setToCurrency}
                disabled={loading}
                label="To"
              />
              <ConversionResult
                convertedAmount={convertedAmount}
                toCurrency={toCurrency}
                rate={rate}
                fromCurrency={fromCurrency}
                loading={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <Button
                onClick={fetchExchangeRates}
                disabled={loading}
                aria-label="Refresh rates"
              >
                {loading ? "Refreshing…" : "Refresh"}
              </Button>
              <SecondaryButton
                onClick={swapCurrencies}
                disabled={loading}
                aria-label="Swap currencies"
                title="Swap currencies"
              >
                🔄 Swap
              </SecondaryButton>
            </div>

            {rate && lastUpdated && (
              <div className="text-right p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  1 {fromCurrency} = {formatRate(rate)} {toCurrency}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Last updated: {new Date(lastUpdated).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <FavoritesPanel
          favorites={favorites}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
          onSelectPair={selectPair}
          currentPair={{ fromCurrency, toCurrency }}
        />
        <ConversionHistoryPanel
          history={history}
          onClearHistory={() => setHistory([])}
          onSelectConversion={selectFromHistory}
          onRemoveOne={removeHistoryItem}
        />
      </div>
    </div>
  );
}
