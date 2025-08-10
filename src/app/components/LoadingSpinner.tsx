import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Props = VariantProps<typeof spinnerVariants> & {
  className?: string;
};

export const LoadingSpinner = ({ size, className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center text-primary",
        className,
      )}
    >
      <Loader2 className={spinnerVariants({ size })} />
    </div>
  );
};
