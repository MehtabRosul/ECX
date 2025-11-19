"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Determine icon based on variant
        let IconComponent = null;
        if (variant === "success") {
          IconComponent = CheckCircle;
        } else if (variant === "destructive") {
          IconComponent = AlertCircle;
        } else if (variant === "info") {
          IconComponent = Info;
        }

        return (
          <Toast key={id} {...props} variant={variant}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle>
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}