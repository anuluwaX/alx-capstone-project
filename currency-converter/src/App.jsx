// src/App.jsx
import React, { useEffect, useState } from "react";
import CurrencyConverter from "./pages/CurrencyConverter";
import ThemeToggle from "./components/ThemeToggle";
import { loadTheme, saveTheme } from "./utils/storage";

export default function App() {
  const [isDark, setIsDark] = useState(() => loadTheme());

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    saveTheme(isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          💱 Currency Converter
        </h1>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
      </header>

      {/* Main */}
      <main className="flex-1 w-full">
        <CurrencyConverter />
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
        <p>Built with React & Tailwind</p>
      </footer>
    </div>
  );
}
