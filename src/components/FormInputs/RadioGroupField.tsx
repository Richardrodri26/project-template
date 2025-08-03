import { useId } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { RadioGroupProps } from "@radix-ui/react-radio-group"

interface RadioOption {
  value: string
  label: string
  sublabel?: string
  description?: string
}

export interface RadioGroupFieldProps extends RadioGroupProps {
  label?: string
  description?: string
  options: RadioOption[]
}

export function RadioGroupField({
  label,
  description,
  options,
  defaultValue,
  value,
  onValueChange,
  ...props
}: RadioGroupFieldProps) {
  const baseId = useId()
  const descriptionId = `${baseId}-description`

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className="gap-6"
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        {options.map((option, index) => {
          const inputId = `${baseId}-${index}`
          const optionDescriptionId = `${inputId}-description`

          return (
            <div className="flex items-start gap-2" key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={inputId}
                aria-describedby={option.description ? optionDescriptionId : undefined}
              />
              <div className="grid grow gap-2">
                <Label htmlFor={inputId}>
                  {option.label}
                  {option.sublabel && (
                    <span className="text-muted-foreground text-xs leading-[inherit] font-normal ms-1">
                      ({option.sublabel})
                    </span>
                  )}
                </Label>
                {option.description && (
                  <p
                    id={optionDescriptionId}
                    className="text-muted-foreground text-xs"
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </RadioGroup>

      {description && (
        <p
          id={descriptionId}
          className="text-sm mt-1"
          role="status"
          aria-live="polite"
        >
          {description}
        </p>
      )}
    </div>
  )
}