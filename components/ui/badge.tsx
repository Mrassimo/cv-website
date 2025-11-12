import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-8 rounded-card border border-overlay px-12 py-8 text-caption font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-accent/10 text-accent hover:bg-accent/20",
        secondary:
          "bg-warm-cards dark:bg-warm-cards-dark text-secondary dark:text-secondary-dark hover:bg-warm-cards/80",
        outline:
          "text-primary dark:text-primary-dark border-overlay hover:bg-accent/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
