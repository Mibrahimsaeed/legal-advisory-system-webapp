import { THINKING_STEPS } from "@/lib/constants/consultation";

const STEP_DELAY_MS = 330;

export function ThinkingState() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Researching</p>
      <ol className="flex flex-col gap-2">
        {THINKING_STEPS.map((step, index) => (
          <li
            key={step}
            style={{ animationDelay: `${index * STEP_DELAY_MS}ms`, animationFillMode: "both" }}
            className="flex items-center gap-2.5 text-sm text-muted-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-1 motion-safe:duration-500"
          >
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
