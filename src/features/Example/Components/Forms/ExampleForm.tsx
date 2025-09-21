import { useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { createExampleSchema, updateExampleSchema, type CreateExampleSchemaType, type UpdateExampleSchemaType } from '../../schema';
import type { FormMode } from '@/interfaces/FormTypes';
import type { IExternalState } from '@/interfaces/ExternalState';
import { useAlert } from '@/components/PromiseAlert';
import { useAppForm } from '@/components/TanstackForm';
import { zodFormValidator } from '@/components/TanstackForm/validators/zodValidators';
import { ScrollArea } from '@/components/ui/scroll-area';
// ...existing code...
import { Button } from '@/components/ui/button';
import { CredenzaClose, CredenzaFooter } from '@/components/credenza';
import { useCreateExample } from '../../hooks/useCreateExample';
import { useUpdateExample } from '../../hooks/useUpdateExample';
import type { CreateCardFullMutationVariables, UpdateCardsMutationVariables } from '@/domain/graphql';

interface ExampleFormProps {
  defaultValues?: Partial<UpdateExampleSchemaType>;
  type: FormMode;
  externalState: IExternalState<boolean>;
}

export const ExampleForm = ({ type, defaultValues, externalState }: ExampleFormProps) => {
 
  // CREA los metodos para crear y actualizar

  const queryClient = useQueryClient();
  const alert = useAlert();
  const createMutation = useCreateExample();
  const updateMutation = useUpdateExample();

  // conversion helpers: map simple form values to GraphQL input shapes
  const toCreateVariables = (value: CreateExampleSchemaType): CreateCardFullMutationVariables => {
    return {
      input: {
        card: {
          title: value.name,
          description: value.description ?? '',
          isActive: true,
        },
        cardAddress: [],
        cardEmail: [],
        cardPhone: [],
        cardSocial: [],
        cardWeb: [],
        imageProfileId: '',
      },
    };
  };

  const toUpdateVariables = (value: UpdateExampleSchemaType): UpdateCardsMutationVariables => {
    return {
      updateInput: {
        id: value.id,
        title: value.name,
        description: value.description ?? null,
      },
    };
  };

  const form = useAppForm({
    validators: zodFormValidator(type === 'create' ? createExampleSchema : updateExampleSchema),
    defaultValues:
      defaultValues ??
      ({
        name: '',
        description: '',
      } as CreateExampleSchemaType),
      onSubmit: async ({ value }) => {
        if (type === 'create') {
          // adapt form value to GraphQL variables shape
          const variables = toCreateVariables(value as CreateExampleSchemaType);
          const data = await createMutation.mutateAsync(variables);
          if (data) {
            // invalidate query and close modal immediately after success
            queryClient.refetchQueries({ queryKey: ['getExampleData'] });
            externalState.setter(false);
            // still show feedback alert (non-blocking for closing)
            void alert({
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
          }
        }
        if (type === 'update') {
          const variables = toUpdateVariables(value as UpdateExampleSchemaType);
          const res = await updateMutation.mutateAsync(variables);
          if (res) {
            // invalidate query and close modal immediately after success
            queryClient.refetchQueries({ queryKey: ['getExampleData'] });
            externalState.setter(false);
            // still show feedback alert (non-blocking for closing)
            void alert({
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
          <form.FormRow>
            <form.AppField
              name='description'
              children={fieldApi => (
                <fieldApi.TextAreaFieldForm label='Descripción' placeholder='Escriba una descripción opcional' maxLength={500} description='Breve resumen del ejemplo (opcional)' />
              )}
            />
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
