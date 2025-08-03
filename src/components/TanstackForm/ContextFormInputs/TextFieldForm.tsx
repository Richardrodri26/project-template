"use client"

import { TextField, type TextFieldProps } from "@/components/FormInputs/Textfield"
import { useFieldContext } from "../form-context"


export function TextFieldForm(props: TextFieldProps) {
  const field = useFieldContext<string>()
const hasError = !!field.state.meta.errors?.length
const message = hasError ? field?.state?.meta?.errors?.[0]?.message : props.description
  return (
    <TextField
      {...props}
        description={message}
      value={field.state.value}
      onChange={(e) => {
        props.onChange?.(e)
        field.handleChange(e.target.value)
      }}
    />
  )
}
