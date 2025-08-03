import type { FormValidators, FormValidateOrFn, FormAsyncValidateOrFn } from '@tanstack/react-form';
import type { ZodType } from 'zod';

type TFormValidators<TFormData> = FormValidators<
  TFormData | Partial<TFormData>,
  FormValidateOrFn<TFormData | Partial<TFormData>> | undefined,
  FormValidateOrFn<TFormData | Partial<TFormData>> | undefined,
  FormAsyncValidateOrFn<TFormData | Partial<TFormData>> | undefined,
  FormValidateOrFn<TFormData | Partial<TFormData>> | undefined,
  FormAsyncValidateOrFn<TFormData | Partial<TFormData>> | undefined,
  FormValidateOrFn<TFormData | Partial<TFormData>> | undefined,
  FormAsyncValidateOrFn<TFormData | Partial<TFormData>> | undefined
>;

/**
 * Crea un validador onBlur reutilizable:
 * - Aplica `schema.safeParse` al objeto completo.
 * - Devuelve errores solo para campos `isDirty`.
 * La firma `FormValidateFn<TFormData>` ya incluye el tipo correcto de `formApi`.
 */
export function zodFormValidator<TFormData extends Record<string, unknown>>(schema: ZodType<TFormData>): TFormValidators<TFormData> {
  const formValidator = ({ value, formApi }: { value: TFormData | Partial<TFormData>; formApi: any }) => {
    const result = schema.safeParse(value);
    if (result.success) return null;

    const fieldErrors = result.error.flatten().fieldErrors;
    const errors: Record<string, { message: string }> = {};

    for (const key of Object.keys(value) as Array<keyof TFormData>) {
      const info = formApi.getFieldInfo(key as string);
      if (info.instance?.state.meta.isDirty) {
        const issues = fieldErrors[key as keyof typeof fieldErrors];
        if (issues?.length) errors[key as string] = { message: issues[0] };
      }
    }

    return { fields: errors };
  };

  const onSubmitValidator = ({ value }: { value: TFormData | Partial<TFormData> }) => {
    const result = schema.safeParse(value);
    if (result.success) return null;

    const fieldErrors = result.error.flatten().fieldErrors;
    const errors: Record<string, { message: string }> = {};

    for (const key of Object.keys(fieldErrors) as Array<keyof TFormData>) {
      const issues = fieldErrors[key];
      if (issues?.length) errors[key as string] = { message: issues[0] };
    }

    return { fields: errors };
  };

  return { onSubmit: onSubmitValidator, onChange: formValidator };
}
