"use client"

import { SelectField, type SelectFieldProps } from "@/components/FormInputs/SelectField"
import { useFieldContext } from "../form-context"

export function SelectFieldForm(props: SelectFieldProps) {
  const field = useFieldContext<string>()
  const hasError = !!field.state.meta.errors?.length
const message = hasError ? field?.state?.meta?.errors?.[0]?.message : props.description

  return (
    <SelectField
      {...props}
      description={message}
      value={field.state.value}
      onValueChange={(value) => {
        props.onValueChange?.(value)
        field.handleChange(value)
      }}
    />
  )
}
