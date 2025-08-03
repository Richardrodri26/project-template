import { useId } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { CheckboxProps } from "@radix-ui/react-checkbox"

export interface CheckBoxFieldProps extends CheckboxProps {
  label: string
  sublabel?: string
  description?: string
  wrapperClassName?: string
}

export function CheckBoxField({
  label,
  sublabel,
  description,
  className,
  wrapperClassName,
  ...props
}: CheckBoxFieldProps) {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className={cn("flex items-start gap-2", wrapperClassName)}>
      <Checkbox
        id={id}
        aria-describedby={description ? descriptionId : undefined}
        className={className}
        {...props}
      />
      <div className="grid grow gap-2">
        <Label htmlFor={id}>
          {label}
          {sublabel && (
            <span className="text-muted-foreground text-xs leading-[inherit] font-normal ms-1">
              ({sublabel})
            </span>
          )}
        </Label>
        {description && (
          <p id={descriptionId} className="text-muted-foreground text-xs">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
