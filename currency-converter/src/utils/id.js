export function uid(prefix = "id") {
if (typeof crypto !== "undefined" && crypto.randomUUID) {
return crypto.randomUUID();
}
return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}