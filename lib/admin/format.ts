const numberFormat = new Intl.NumberFormat("en-US");
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatPKR = (value: number) => `PKR ${numberFormat.format(value)}`;

export const formatCompactPKR = (value: number) =>
  value >= 1000 ? `${numberFormat.format(Math.round(value / 1000))}k` : numberFormat.format(value);

export const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export const formatDate = (isoDate: string) => dateFormat.format(new Date(isoDate));

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const dayLabelFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const BYTE_UNITS = ["B", "KB", "MB", "GB"] as const;

export const formatDateTime = (isoDate: string) => dateTimeFormat.format(new Date(isoDate));

// Backend day buckets are plain YYYY-MM-DD dates in UTC.
export const formatDayLabel = (date: string) => dayLabelFormat.format(new Date(`${date}T00:00:00Z`));

export function formatBytes(bytes: number) {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < BYTE_UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${unit ? value.toFixed(1) : value} ${BYTE_UNITS[unit]}`;
}

// Real data often has zero paid or active users, so ratios must not divide by zero.
export const safeRatio = (numerator: number, denominator: number) => (denominator ? numerator / denominator : 0);
