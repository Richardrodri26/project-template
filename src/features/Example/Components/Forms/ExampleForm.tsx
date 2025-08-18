import { useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { createExampleSchema, updateExampleSchema, type CreateExampleSchemaType, type UpdateExampleSchemaType } from '../../schema';
import type { FormMode } from '@/interfaces/FormTypes';
import type { IExternalState } from '@/interfaces/ExternalState';
import { useAlert } from '@/components/PromiseAlert';
import { useAppForm } from '@/components/TanstackForm';
import { zodFormValidator } from '@/components/TanstackForm/validators/zodValidators';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CredenzaClose, CredenzaFooter } from '@/components/credenza';

interface ExampleFormProps {
  defaultValues?: Partial<UpdateExampleSchemaType>;
  type: FormMode;
  externalState: IExternalState<boolean>;
}

export const ExampleForm = ({ type, defaultValues, externalState }: ExampleFormProps) => {
 
  // CREA los metodos para crear y actualizar

  const queryClient = useQueryClient();
  const alert = useAlert();

  const form = useAppForm({
    validators: zodFormValidator(type === 'create' ? createExampleSchema : updateExampleSchema),
    defaultValues:
      defaultValues ??
      ({
        name: '',
      } as CreateExampleSchemaType),
    onSubmit: async ({ value }) => {
      if (type === 'create') {
        const data = await createItem(value as CreateExampleSchemaType);
        if (data) {
          const resAlert = await alert({
            title: 'Ejemplo creada exitosamente.',
            descriptionClassName: 'text-center',
            body: `
          Ya está disponible en el sistema para usar.
        `,
            status: 'success',
            cancelButtonText: 'Cerrar',
            showCancelButton: false,
            showActionButton: true,
            actionButtonText: 'Finalizar',
          });
          if (resAlert) {
            queryClient.invalidateQueries({ queryKey: ['getExampleData'] });
            externalState.setter(false);
          }
        }
      }
      if (type === 'update') {
        const res = await updateItem(value as UpdateExampleSchemaType);
        if (res) {
          const resAlert = await alert({
            title: 'ejemplo actualizado con éxito',
            descriptionClassName: 'text-center',
            body: `
          El ejemplo ha sido actualizado exitosamente y ya está disponible en el sistema.
        `,
            status: 'success',
            cancelButtonText: 'Cerrar',
            showCancelButton: false,
            showActionButton: true,
            actionButtonText: 'Finalizar',
          });
          if (resAlert) {
            queryClient.invalidateQueries({ queryKey: ['getExampleData'] });
            externalState.setter(false);
          }
        }
      }
    },
  });

  return (
    <form
      className='flex flex-col gap-2.5'
      onSubmit={e => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.AppForm>
        <ScrollArea className='mr-1 max-h-[500px] px-6'>
        

          <form.FormRow>
            <form.AppField name='name' children={fieldApi => <fieldApi.TextFieldForm label='Nombre del ejemplo' placeholder='Escriba el nombre del ejemplo' />} />
          </form.FormRow>
        </ScrollArea>

        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button type='button' variant='destructive' size={'sm'}>
              Cancelar
            </Button>
          </CredenzaClose>
          <form.SubscribeButton variants={{ size: 'sm' }} label='Confirmar' icon={<Check />} />
        </CredenzaFooter>
      </form.AppForm>
    </form>
  );
};
