import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

interface PageSectionProps extends React.ComponentProps<"section"> {
  muted?: boolean;
  primary?: boolean;
}

export function PageSection({
  muted = false,
  primary = false,
  className,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section
      className={cn(
        "flex min-h-[100svh] scroll-mt-20 items-center py-20 sm:py-28",
        muted && "border-y bg-muted/50",
        primary && "bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
