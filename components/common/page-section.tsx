import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

interface PageSectionProps extends React.ComponentProps<"section"> {
  muted?: boolean;
}

export function PageSection({
  muted = false,
  className,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section
      className={cn(
        "scroll-mt-16 py-20 sm:py-28",
        muted && "border-y bg-muted/50",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
