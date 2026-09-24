import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
  className,
}: SectionHeadingProps) {
  const subtle = inverted ? "text-primary-foreground/70" : "text-muted-foreground";

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("text-xs font-medium tracking-[0.18em] uppercase", subtle)}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn("text-base leading-7 sm:text-lg", subtle)}>{description}</p>
      )}
    </div>
  );
}
