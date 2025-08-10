"use client";

import type { FC } from "react";
import { Badge } from "@/app/components/ui/badge";

type Props = {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  removeLabel?: boolean;
};

export const FormWithLabel: FC<Props> = ({
  label,
  required = false,
  removeLabel = false,
  children,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {!removeLabel && (
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground text-xs">{label}</span>
          {required && (
            <Badge
              variant="destructive"
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
