import { cn } from "@/lib/utils";

interface RevealItemProps extends React.ComponentProps<"div"> {
  delay?: number;
}

export function RevealItem({ delay = 0, className, style, ...props }: RevealItemProps) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={cn(
        "motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-safe:group-data-[shown=false]/reveal:translate-y-2 motion-safe:group-data-[shown=false]/reveal:opacity-0",
        "[@media(scripting:none)]:group-data-[shown=false]/reveal:translate-y-0 [@media(scripting:none)]:group-data-[shown=false]/reveal:opacity-100",
        className,
      )}
      {...props}
    />
  );
}
