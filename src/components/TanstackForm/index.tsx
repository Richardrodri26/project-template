import { Button, type ButtonVariants } from '@/components/ui/button';
import { createFormHook } from '@tanstack/react-form';
import { cn } from '@/lib/utils';
import { fieldContext, formContext, useFormContext } from './form-context';
import { CheckboxFieldForm } from './ContextFormInputs/CheckboxFieldForm';
import { RadioGroupFieldForm } from './ContextFormInputs/RadioGroupFieldForm';
import { SelectFieldForm } from './ContextFormInputs/SelectFieldForm';
import { SwitchFieldForm } from './ContextFormInputs/SwitchFieldForm';
import { TextAreaFieldForm } from './ContextFormInputs/TextAreaFieldForm';
import { TextFieldForm } from './ContextFormInputs/TextFieldForm';

//#region config

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextFieldForm,
    SelectFieldForm,
    RadioGroupFieldForm,
    SwitchFieldForm,
    CheckboxFieldForm,
    TextAreaFieldForm,
  },
  formComponents: {
    SubscribeButton,
    FormRow,
  },
});

//#region components

function SubscribeButton({ label, className, icon, variants }: { label: string; className?: string; icon?: React.ReactNode; variants?: ButtonVariants }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={state => {
      return [state.isSubmitting, state.isValid]
    }}>
      {([isSubmitting, isValid]) => (
        <Button variant={variants?.variant} size={variants?.size} disabled={isSubmitting || !isValid} type='submit' className={className}>
          {label}
          {icon || null}
        </Button>
      )}
    </form.Subscribe>
  );
}

interface IFormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function FormRow({ children, className, ...props }: IFormRowProps) {
  return (
    <div className={cn('mx-0.5 flex gap-3 px-0.5 [&>*]:flex-1', className)} {...props}>
      {children}
    </div>
  );
}
