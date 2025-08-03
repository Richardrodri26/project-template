"use client"

import { SwitchField, type SwitchFieldProps } from "@/components/FormInputs/SwitchField"
import { useFieldContext } from "../form-context"


export function SwitchFieldForm(props: SwitchFieldProps) {
  const field = useFieldContext<boolean>()
  const hasError = !!field.state.meta.errors?.length
const message = hasError ? field?.state?.meta?.errors?.[0]?.message : props.description

  return (
    <SwitchField
      {...props}
        description={message}
      checked={field.state.value}
      onCheckedChange={(value) => {
        props.onCheckedChange?.(value)
        field.handleChange(value)
      }}
    />
  )
}
