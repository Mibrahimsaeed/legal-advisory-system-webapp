import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & { large?: boolean };

export function LinkButton({
  variant,
  size,
  large = false,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size }),
        large && "h-11 gap-2 rounded-lg px-5 text-sm",
        className,
      )}
      {...props}
    />
  );
}
