"use client"

import { TextAreaField, type TextAreaFieldProps } from "@/components/FormInputs/TextAreaField"
import { useFieldContext } from "../form-context"


export function TextAreaFieldForm(props: Omit<TextAreaFieldProps, "value" | "onChange">) {
  const field = useFieldContext<string>()
  const hasError = !!field.state.meta.errors?.length
const message = hasError ? field?.state?.meta?.errors?.[0]?.message : props.description

  return (
    <TextAreaField
      {...props}
        description={message}
      value={field.state.value}
      onChange={(e) => {
        field.handleChange(e.target.value)
      }}
    />
  )
}
