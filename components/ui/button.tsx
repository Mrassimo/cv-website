import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-8 rounded-card font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-hover-accent hover:shadow-card-hover",
        secondary: "bg-warm-cards dark:bg-warm-cards-dark text-primary dark:text-primary-dark border border-overlay hover:bg-warm-cards/80 dark:hover:bg-warm-cards-dark/80 hover:shadow-card-hover",
        ghost: "text-secondary dark:text-secondary-dark hover:text-accent hover:bg-accent/10",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "px-24 py-12",
        sm: "px-16 py-8 text-caption",
        lg: "px-32 py-16",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
