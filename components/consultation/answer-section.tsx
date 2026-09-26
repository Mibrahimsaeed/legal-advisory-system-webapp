interface AnswerSectionProps {
  index: string;
  title: string;
  children: React.ReactNode;
}

export function AnswerSection({ index, title, children }: AnswerSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-muted-foreground">{index}</span>
        <span className="font-heading text-xl font-semibold">{title}</span>
      </h3>
      <div className="flex flex-col gap-3 pl-0 sm:pl-8">{children}</div>
    </section>
  );
}
