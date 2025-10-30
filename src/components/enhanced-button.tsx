'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:shadow-destructive/40",
        outline:
          "border border-input bg-background shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20 hover:shadow-secondary/40",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-lg shadow-primary/5 hover:shadow-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
  animated?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animated = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (animated) {
      return (
        <motion.div
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          >
            <span className="relative z-10">{children}</span>
            <motion.span 
              className="absolute inset-0 z-0 bg-gradient-to-r from-white/20 to-white/5 opacity-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Comp>
        </motion.div>
      )
    }
    
    return (
      <motion.div
        whileHover={{ 
          scale: 1.03,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </motion.div>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, buttonVariants }