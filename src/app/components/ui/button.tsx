import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/app/lib/utils";
import { SimpleTooltip } from "../SimpleTooltip";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        solid: "shadow-sm hover:shadow-md",
        outline: "border bg-background shadow-xs",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      color: {
        default: "",
        primary: "",
        warning: "",
        destructive: "",
        gray: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: "solid",
        color: "default",
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-secondary/50",
      },
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-primary/25 focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-primary/70 dark:hover:shadow-lg dark:hover:shadow-primary/20",
      },
      {
        variant: "solid",
        color: "warning",
        className:
          "bg-warning text-warning-foreground hover:bg-warning/80 hover:shadow-warning/25 focus-visible:border-warning focus-visible:ring-warning/50 dark:hover:bg-warning/70 dark:hover:shadow-lg dark:hover:shadow-warning/20",
      },
      {
        variant: "solid",
        color: "destructive",
        className:
          "bg-destructive text-white hover:bg-destructive/80 hover:shadow-destructive/25 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 dark:hover:bg-destructive/50 dark:hover:shadow-lg dark:hover:shadow-destructive/20",
      },
      {
        variant: "solid",
        color: "gray",
        className:
          "bg-muted/90 text-muted-foreground hover:bg-muted/70 focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-muted dark:hover:bg-muted/60 dark:hover:shadow-md",
      },
      // Outline variants
      {
        variant: "outline",
        color: "default",
        className:
          "border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/90 focus-visible:border-primary focus-visible:ring-primary/50",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-warning text-warning hover:bg-warning hover:text-warning-foreground dark:hover:bg-warning/90 focus-visible:border-warning focus-visible:ring-warning/50",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "border-destructive text-destructive hover:bg-destructive hover:text-white dark:hover:bg-destructive/90 focus-visible:border-destructive focus-visible:ring-destructive/50",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "border-muted-foreground/70 text-muted-foreground hover:bg-muted hover:text-muted-foreground hover:border-muted-foreground dark:hover:bg-muted/50 focus-visible:border-muted-foreground focus-visible:ring-muted-foreground/50",
      },
      // Ghost variants
      {
        variant: "ghost",
        color: "default",
        className:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/30 focus-visible:border-primary focus-visible:ring-primary/50",
      },
      {
        variant: "ghost",
        color: "warning",
        className:
          "text-warning hover:bg-warning/20 hover:text-warning dark:hover:bg-warning/30 focus-visible:border-warning focus-visible:ring-warning/50",
      },
      {
        variant: "ghost",
        color: "destructive",
        className:
          "text-destructive hover:bg-destructive/20 hover:text-destructive dark:hover:bg-destructive/30 focus-visible:border-destructive focus-visible:ring-destructive/50",
      },
      {
        variant: "ghost",
        color: "gray",
        className:
          "text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:hover:bg-muted/60 focus-visible:border-muted-foreground focus-visible:ring-muted-foreground/50",
      },
      // Link variants
      {
        variant: "link",
        color: "default",
        className:
          "text-foreground focus-visible:border-ring focus-visible:ring-ring/50",
      },
      {
        variant: "link",
        color: "primary",
        className:
          "text-primary focus-visible:border-primary focus-visible:ring-primary/50",
      },
      {
        variant: "link",
        color: "warning",
        className:
          "text-warning focus-visible:border-warning focus-visible:ring-warning/50",
      },
      {
        variant: "link",
        color: "destructive",
        className:
          "text-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
      },
      {
        variant: "link",
        color: "gray",
        className:
          "text-muted-foreground focus-visible:border-muted-foreground focus-visible:ring-muted-foreground/50",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  color,
  size,
  asChild = false,
  tooltipText,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    tooltipText?: string;
  }) {
  const Comp = asChild ? Slot : "button";

  return tooltipText ? (
    <SimpleTooltip
      renderContent={() => <span className="text-xs">{tooltipText}</span>}
    >
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, color, size, className }))}
        {...props}
      />
    </SimpleTooltip>
  ) : (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, color, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
