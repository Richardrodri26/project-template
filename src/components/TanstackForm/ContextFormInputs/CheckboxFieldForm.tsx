"use client"

import { CheckBoxField, type CheckBoxFieldProps } from "@/components/FormInputs/CheckBoxField"
import { useFieldContext } from "../form-context"


export function CheckboxFieldForm(props: CheckBoxFieldProps) {
  const field = useFieldContext<boolean>()
const hasError = !!field.state.meta.errors?.length
const message = hasError ? field?.state?.meta?.errors?.[0]?.message : props.description

  return (
    <CheckBoxField
      {...props}
      description={message}
      checked={field.state.value}
      onCheckedChange={(value) => {
        props.onCheckedChange?.(value)
        const valueToSend = typeof value === "string" ? false : value
        field.handleChange(valueToSend)
      }}
    />
  )
}
