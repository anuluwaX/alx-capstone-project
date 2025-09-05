export function formatNumber(value, currencyCode) {
if (value == null || Number.isNaN(value)) return "--";
try {
if (currencyCode) {
return new Intl.NumberFormat(undefined, {
style: "currency",
currency: currencyCode,
currencyDisplay: "narrowSymbol",
maximumFractionDigits: 2,
}).format(value);
}
return new Intl.NumberFormat(undefined, {
maximumFractionDigits: 6,
}).format(value);
} catch {
// Fallback if code not supported in runtime
return Number(value).toLocaleString(undefined, { maximumFractionDigits: 6 });
}
}


export function formatRate(rate) {
if (rate == null || Number.isNaN(rate)) return "--";
return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(rate);
}