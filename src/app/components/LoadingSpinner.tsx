import { Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

type Props = {
  size?: number;
  className?: string;
};

export const LoadingSpinner = ({ size = 12, className }: Props) => {
  const sizeClass = `w-${size} h-${size}`;

  return (
    <div className={cn("flex h-full items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin", sizeClass)} />
    </div>
  );
};
