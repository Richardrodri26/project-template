import { useState } from 'react';
import type { UpdateExampleSchemaType } from '../../schema';
import type { IExternalState } from '@/interfaces/ExternalState';
import type { FormMode } from '@/interfaces/FormTypes';
import { ExampleForm } from '../Forms/ExampleForm';
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/credenza';

interface IExampleModalFormProps {
  children?: React.ReactNode;
  asChild?: boolean;
  externalState?: IExternalState<boolean>;
  formMode: FormMode;
  defaultValues?: Partial<UpdateExampleSchemaType>;
}

export const ExampleModalForm = ({ asChild = true, externalState, children, formMode, defaultValues }: IExampleModalFormProps) => {
  const [defaultIsOpen, setDefaultIsOpen] = useState(false);

  const { setter, state } = externalState ? externalState : { state: defaultIsOpen, setter: setDefaultIsOpen };

  const titleByType = formMode === 'create' ? 'Creación de un ejemplo' : 'Modificación de un ejemplo';

  return (
    <Credenza open={state} onOpenChange={setter}>
      {children ? <CredenzaTrigger asChild={asChild}>{children}</CredenzaTrigger> : null}
      <CredenzaContent className='max-w-5xl'>
        <CredenzaHeader>
          <CredenzaTitle>{titleByType}</CredenzaTitle>
          <CredenzaDescription className='sr-only'>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</CredenzaDescription>
        </CredenzaHeader>

        <ExampleForm externalState={{ setter, state }} type={formMode} defaultValues={defaultValues} />
      </CredenzaContent>
    </Credenza>
  );
};

