import type { ReactNode } from "react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { SimpleTooltip } from "./SimpleTooltip";

type Props = {
  variant?: "primary" | "default";
  icon: ReactNode;
  size: number;
  tooltipText: string;
  onClick: () => void;
  className?: string;
};

export const IconButton = ({
  variant = "default",
  icon,
  size,
  tooltipText,
  onClick,
  className,
}: Props) => {
  return (
    <SimpleTooltip
      renderContent={() => <span className="text-xs">{tooltipText}</span>}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={cn(
          `rounded border bg-white bg-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 h-${size} w-${size} ${className || ""}`,
          variant === "primary" &&
            "bg-blue-500 text-white hover:bg-blue-700 hover:text-white",
        )}
      >
        {icon}
      </Button>
    </SimpleTooltip>
  );
};
