interface TooltipValueProps {
  label: string;
  value: string;
}

export function TooltipValue({ label, value }: TooltipValueProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 leading-none">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium text-foreground tabular-nums">{value}</span>
    </div>
  );
}
