"use client"

import { RadioGroupField, type RadioGroupFieldProps } from "@/components/FormInputs/RadioGroupField"
import { useFieldContext } from "../form-context"


export function RadioGroupFieldForm(
  props: RadioGroupFieldProps
) {
  const field = useFieldContext<string>()
  const hasError = !!field.state.meta.errors?.length
const message = hasError ? field?.state?.meta?.errors?.[0]?.message : props.description

  return (
    <RadioGroupField
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
