import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/app/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        outline: "",
        ghost: "border-transparent",
      },
      color: {
        default: "",
        primary: "",
        warning: "",
        destructive: "",
        gray: "",
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: "solid",
        color: "default",
        className:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
      },
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/80",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "bg-warning text-warning-foreground [a&]:hover:bg-warning/80",
      },
      {
        variant: "solid",
        color: "destructive",
        className:
          "bg-destructive text-white [a&]:hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      },
      {
        variant: "solid",
        color: "gray",
        className:
          "bg-muted/90 text-muted-foreground [a&]:hover:bg-muted/70 dark:bg-muted dark:[a&]:hover:bg-muted/80",
      },
      // Outline variants
      {
        variant: "outline",
        color: "default",
        className:
          "border-input text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground dark:bg-input/30",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary text-primary [a&]:hover:bg-primary/10 dark:[a&]:hover:bg-primary/20",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-warning text-warning [a&]:hover:bg-warning/10 dark:[a&]:hover:bg-warning/20",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "border-destructive text-destructive [a&]:hover:bg-destructive/10 dark:[a&]:hover:bg-destructive/20",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "border-muted-foreground/70 text-muted-foreground [a&]:hover:bg-muted/50 dark:[a&]:hover:bg-muted/30",
      },
      // Ghost variants
      {
        variant: "ghost",
        color: "default",
        className:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground dark:[a&]:hover:bg-accent/50",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary [a&]:hover:bg-primary/10 dark:[a&]:hover:bg-primary/20",
      },
      {
        variant: "ghost",
        color: "warning",
        className:
          "text-warning [a&]:hover:bg-warning/10 dark:[a&]:hover:bg-warning/20",
      },
      {
        variant: "ghost",
        color: "destructive",
        className:
          "text-destructive [a&]:hover:bg-destructive/10 dark:[a&]:hover:bg-destructive/20",
      },
      {
        variant: "ghost",
        color: "gray",
        className:
          "text-muted-foreground [a&]:hover:bg-muted/50 dark:[a&]:hover:bg-muted/60",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
    },
  },
);

function Badge({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
}

import { X } from "lucide-react";

// 削除可能なBadgeコンポーネント
function DismissibleBadge({
  children,
  onDismiss,
  className,
  variant = "outline",
  color = "primary",
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    onDismiss?: () => void;
  }) {
  return (
    <Badge
      variant={variant}
      color={color}
      className={cn("group pr-1", className)}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="ml-0.5 cursor-pointer rounded-sm hover:bg-muted/50 focus:outline-none dark:hover:bg-muted/30"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </span>
    </Badge>
  );
}

export { Badge, DismissibleBadge, badgeVariants };
