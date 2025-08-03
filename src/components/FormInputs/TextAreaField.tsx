"use client"

import { useId } from "react"
import { Textarea, type TextareaProps } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useCharacterLimit } from "@/hooks/use-character-limit"

export interface TextAreaFieldProps extends TextareaProps {
  label: string
  maxLength: number
  description?: string
  wrapperClassName?: string
}

export function TextAreaField({
  label,
  maxLength,
  className,
  wrapperClassName,
  description,
  ...props
}: TextAreaFieldProps) {
  const id = useId()
  const descriptionId = `${id}-description`
  const charCountId = `${id}-charcount`

  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength })

  return (
    <div className={cn("*:not-first:mt-2", wrapperClassName)}>
      <Label htmlFor={id}>{label}</Label>
      
      <Textarea
        id={id}
        value={value}
        maxLength={limit}
        onChange={(e) => {
          handleChange(e)
          props.onChange?.(e)
        }}
        aria-describedby={
          description
            ? `${descriptionId} ${charCountId}`
            : charCountId
        }
        className={className}
        {...props}
      />
      <p
        id={charCountId}
        className="text-muted-foreground mt-2 text-right text-xs"
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">{limit - characterCount}</span> characters left
      </p>

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