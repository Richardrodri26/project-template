import { TableRowDropDownToggle } from "@/components/DataTable/TableToggle";
import { useAlert } from "@/components/PromiseAlert";
import type { Cards } from "@/domain/graphql";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { ExampleModalForm } from "../Modals/ExampleFormModal";
import { updateExampleSchema, type UpdateExampleSchemaType } from '../../schema';


export const CardGridActions = ({ data }: { data: Cards }) => {
  // const { mutateAsync: disableAction, isPending: isPendingAction } = useDisabledAnsHolidayItem();
  // const { mutateAsync: removeAction, isPending: isPendingRemoveAction } = useRemoveAnsHolidayItem();
  const [openEditModal, setOpenEditModal] = useState(false);

  const alert = useAlert();

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  // const handleDisableItem = async () => {
  //   const titleToShow = true ? '¿Deseas inactivar este dia festivo?' : '¿Deseas activar este dia festivo?';
  //   const bodyToShow = true
  //     ? 'Al inactivar, este dia festivo dejará de estar disponible para nuevos registros, pero se mantendrá en el historial donde ya ha sido utilizado.'
  //     : 'Al activarlo, este dia festivo estará disponible para nuevos registros';

  //   const resAlert = await alert({
  //     title: titleToShow,
  //     body: bodyToShow,
  //     status: 'info',
  //     showCancelButton: true,
  //     cancelButtonText: 'Cancelar',
  //     actionButtonText: 'Confirmar',
  //   });

  //   if (resAlert) {
  //     const currentStatus = data?.isActive ?? false;
  //     await disableAction({ status: !currentStatus, data: data });
  //   }
  // };

  // const handleRemoveItem = async () => {
  //   const resAlert = await alert({
  //     title: '¿Deseas eliminar este dia festivo?',
  //     body: 'Al eliminar, este dia festivo dejará de estar disponible para nuevos registros',
  //     status: 'info',
  //     showCancelButton: true,
  //     cancelButtonText: 'Cancelar',
  //     actionButtonText: 'Confirmar',
  //   });

  //   if (resAlert) {
  //     await removeAction(data.id);
  //   }
  // };

  const defaultValues: Partial<UpdateExampleSchemaType> = {
    id: String(data.id),
    name: String(data.description),
  };

  return (
    <>
      <TableRowDropDownToggle>
        {Item => {
          return (
            <>
              <Item onClick={handleOpenEditModal}>
                <EditIcon className='fill-tundora' /> Modificar
              </Item>

              {/* <Item onClick={handleDisableItem} disabled={isPendingAction}>
                {data.status ? <BlockIcon className='size-5 fill-tundora' /> : <ReplayIcon className='size-5 fill-tundora' />}
                {data.status ? 'Inactivar' : 'Activar'}
              </Item>

              <Item onClick={handleRemoveItem} disabled={isPendingRemoveAction}>
                <DeleteIcon className='fill-tundora' /> Eliminar
              </Item> */}
            </>
          );
        }}
      </TableRowDropDownToggle>

      <ExampleModalForm defaultValues={defaultValues} formMode='update' externalState={{ state: openEditModal, setter: setOpenEditModal }}></ExampleModalForm>
    </>
  );
};
