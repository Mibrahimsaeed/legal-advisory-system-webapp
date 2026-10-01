import { CrownIcon } from "lucide-react";
import { LinkButton } from "@/components/common/link-button";
import { ROUTES } from "@/lib/constants/routes";

export function ViewPlansButton() {
  return (
    <LinkButton
      href={ROUTES.upgrade}
      variant="outline"
      aria-label="View plans"
      className="size-8 gap-2 px-0 text-sm shadow-sm sm:w-auto sm:px-3.5"
    >
      <CrownIcon aria-hidden />
      <span className="hidden sm:inline">View plans</span>
    </LinkButton>
  );
}
