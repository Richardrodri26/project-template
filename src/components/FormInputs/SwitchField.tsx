import { useId } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type { SwitchProps } from "@radix-ui/react-switch"

export interface SwitchFieldProps extends SwitchProps {
  label?: string         // Visible label
  srLabel?: string       // Screen-reader only label
  description?: string
  wrapperClassName?: string
}

export function SwitchField({
  label,
  srLabel,
  description,
  className,
  wrapperClassName,
  ...props
}: SwitchFieldProps) {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className={cn("inline-flex items-center gap-2", wrapperClassName)}>
      <Switch
        id={id}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "data-[state=unchecked]:border-input data-[state=unchecked]:[&_span]:bg-input data-[state=unchecked]:bg-transparent [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5",
          className
        )}
        {...props}
      />
      <div>
        {(label || srLabel) && (
        <Label htmlFor={id} className={srLabel && !label ? "sr-only" : ""}>
          {label || srLabel}
        </Label>
      )}
      {description && (
        <p
          id={descriptionId}
          className="text-sm mt-1 ms-2"
          role="status"
          aria-live="polite"
        >
          {description}
        </p>
      )}
      </div>
    </div>
  )
}