import { formatNumber, formatPercent } from "@/lib/admin/format";
import type { LabelledValue } from "@/lib/store/features/admin/admin.types";

export function ShareBars({ items }: { items: LabelledValue[] }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <ul className="flex flex-col gap-4">
      {items.map(({ label, value }) => {
        const share = total ? value / total : 0;
        return (
          <li key={label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{label}</span>
              <span className="text-muted-foreground tabular-nums">
                {formatNumber(value)} · {formatPercent(share)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
              <div className="h-full min-w-1 rounded-full bg-primary" style={{ width: `${share * 100}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
