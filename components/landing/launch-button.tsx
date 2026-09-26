"use client";

import { LinkButton } from "@/components/common/link-button";
import { useLaunchHref } from "@/hooks/use-launch-href";

type LaunchButtonProps = Omit<React.ComponentProps<typeof LinkButton>, "href">;

export function LaunchButton(props: LaunchButtonProps) {
  return <LinkButton href={useLaunchHref()} {...props} />;
}
