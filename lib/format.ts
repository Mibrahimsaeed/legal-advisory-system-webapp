const DAY_MS = 86_400_000;

export function formatRelativeDay(isoDate: string, now = Date.now()) {
  const days = Math.floor((now - new Date(isoDate).getTime()) / DAY_MS);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function getInitials(fullName: string) {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
