import { useId } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SelectProps } from "@radix-ui/react-select"

interface Option {
  label: string
  value: string
  icon?: React.ReactNode
}

export interface SelectFieldProps extends SelectProps {
  label: string
  placeholder?: string
  options: Option[]
  description?: string
}

export function SelectField({
  label,
  placeholder = "Select an option",
  options,
  defaultValue,
  value,
  onValueChange,
  disabled,
  description,
  ...props
}: SelectFieldProps) {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      
      <Select
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        <SelectTrigger
          id={id}
          className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
          {options.map(({ label, value, icon }) => (
            <SelectItem key={value} value={value}>
              {icon && <>{icon}</>}
              <span className="truncate">{label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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