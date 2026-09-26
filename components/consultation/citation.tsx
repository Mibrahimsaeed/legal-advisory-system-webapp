export function Citation({ number }: { number: number }) {
  return (
    <span
      aria-label={`Source ${number}`}
      className="mx-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-primary/40 bg-primary/5 px-1 align-baseline text-[10px] leading-none font-medium text-primary"
    >
      {number}
    </span>
  );
}
