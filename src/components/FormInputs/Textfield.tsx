import { useId, type InputHTMLAttributes,  } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  description?: string
}

export function TextField({
  label,
  leftIcon,
  rightIcon,
  className = "",
  description,
  ...inputProps
}: TextFieldProps) {
  const id = useId()

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {leftIcon && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            {leftIcon}
          </div>
        )}
        <Input
          id={id}
          className={`peer ${leftIcon ? "ps-9" : ""} ${rightIcon ? "pe-9" : ""} ${className}`}
          {...inputProps}
        />
        {rightIcon && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            {rightIcon}
          </div>
        )}
      </div>

      {description && (
        <p
          id={`${id}-description`}
          className={'text-sm mt-1'}
          role="status"
          aria-live="polite"
        >
          {description}
        </p>
      )}
    </div>
  )
}
