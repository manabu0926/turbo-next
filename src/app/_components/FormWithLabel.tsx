"use client";

import type { FC } from "react";
import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/app/_lib/utils";

type Props = {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  removeLabel?: boolean;
  orientation?: "horizontal" | "vertical";
};

export const FormWithLabel: FC<Props> = ({
  label,
  required = false,
  removeLabel = false,
  children,
  orientation = "vertical",
}) => {
  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-shrink-0 flex-row gap-2"
          : "flex-col gap-1",
      )}
    >
      {!removeLabel && (
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground text-gray-600 text-sm">
            {label}
          </span>
          {required && (
            <Badge
              variant="solid"
              color="destructive"
              className="h-5 px-2 text-white text-xs"
            >
              必須
            </Badge>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
