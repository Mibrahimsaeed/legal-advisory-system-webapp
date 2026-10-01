const numberFormat = new Intl.NumberFormat("en-US");
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatPKR = (value: number) => `PKR ${numberFormat.format(value)}`;

export const formatCompactPKR = (value: number) =>
  value >= 1000 ? `${numberFormat.format(Math.round(value / 1000))}k` : numberFormat.format(value);

export const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export const formatDate = (isoDate: string) => dateFormat.format(new Date(isoDate));
