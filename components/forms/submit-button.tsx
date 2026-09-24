import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

export function SubmitButton({
  loading = false,
  disabled,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" disabled={disabled || loading} {...props}>
      {loading && <LoaderCircleIcon className="animate-spin" />}
      {children}
    </Button>
  );
}
