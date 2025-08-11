"use client";

import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

type Props = {
  children: ReactNode;
  renderContent: () => ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
};

export const SimpleTooltip = ({
  children,
  renderContent,
  className,
  side,
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={className} side={side}>
        {renderContent()}
      </TooltipContent>
    </Tooltip>
  );
};
