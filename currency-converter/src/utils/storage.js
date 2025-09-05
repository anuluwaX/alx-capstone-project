const LS_KEYS = {
favorites: "cc_favorites_v1",
history: "cc_history_v1",
theme: "cc_theme_v1",
};


export function loadFavorites() {
try {
return JSON.parse(localStorage.getItem(LS_KEYS.favorites)) || [];
} catch {
return [];
}
}
export function saveFavorites(favs) {
try {
localStorage.setItem(LS_KEYS.favorites, JSON.stringify(favs));
} catch {}
}


export function loadHistory() {
try {
return JSON.parse(localStorage.getItem(LS_KEYS.history)) || [];
} catch {
return [];
}
}
export function saveHistory(hist) {
try {
localStorage.setItem(LS_KEYS.history, JSON.stringify(hist));
} catch {}
}


export function loadTheme() {
try {
return JSON.parse(localStorage.getItem(LS_KEYS.theme)) ?? false;
} catch {
return false;
}
}
export function saveTheme(isDark) {
try {
localStorage.setItem(LS_KEYS.theme, JSON.stringify(isDark));
} catch {}
}