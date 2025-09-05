// src/components/FavoritesPanel.jsx
import React, { useState } from "react";
import Button from "./Button";
import { SecondaryButton } from "./SecondaryButton";

export default function FavoritesPanel({
  favorites,
  onAddFavorite,
  onRemoveFavorite,
  onSelectPair,
  currentPair,
}) {
  const [nickname, setNickname] = useState("");

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Favorites
      </h2>

      {/* Add current pair */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Optional nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
        />
        <Button
          onClick={() => {
            onAddFavorite(currentPair.fromCurrency, currentPair.toCurrency, nickname);
            setNickname("");
          }}
        >
          Add
        </Button>
      </div>

      {/* Favorites list */}
      {favorites.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No favorites yet.</p>
      ) : (
        <div className="space-y-2">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <button
                className="text-left flex-1 text-sm text-gray-800 dark:text-gray-200"
                onClick={() => onSelectPair(favorite.fromCurrency, favorite.toCurrency)}
              >
                {favorite.nickname
                  ? `${favorite.nickname} (${favorite.fromCurrency} → ${favorite.toCurrency})`
                  : `${favorite.fromCurrency} → ${favorite.toCurrency}`}
              </button>
              <SecondaryButton onClick={() => onRemoveFavorite(favorite.id)}>
                ✕
              </SecondaryButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
