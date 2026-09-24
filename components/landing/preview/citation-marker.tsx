export function CitationMarker({ id }: { id: number }) {
  return (
    <sup
      aria-label={`Source ${id}`}
      className="mx-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary -translate-y-1 text-[10px] leading-none font-medium text-primary-foreground"
    >
      {id}
    </sup>
  );
}
