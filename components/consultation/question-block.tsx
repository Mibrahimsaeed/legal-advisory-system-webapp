export function QuestionBlock({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-primary pl-4">
      <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Question</p>
      <p className="font-heading text-2xl leading-snug font-medium">{text}</p>
    </div>
  );
}
