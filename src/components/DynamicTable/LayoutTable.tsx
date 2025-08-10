import type { User } from '@/domain/graphql';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { DataTable } from '../DataTable';
import { ResponsiveTable } from '../DataTable/ResponsiveTable';
import type { CardAction } from '../DataTable/ResponsiveTable/ResponsiveTable.interfaces';
import { useTableContext } from './table.context';

/*-------- components --------*/

function ContextDataTable({ className, containerClassName }: { className?: string; containerClassName?: string }) {
  const [table] = useTableContext(state => state.table);
  const [isLoading] = useTableContext(state => state.isLoading);

  if (!table) return <>Sin provider tonoto 💀</>;

   // Acciones para las cards (igual que antes)
  const cardActions: CardAction[] = [
    {
      label: "Ver detalles",
      icon: <Eye className="h-4 w-4" />,
      onClick: handleView,
    },
    {
      label: "Editar",
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEdit,
    },
    {
      label: "Eliminar",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleDelete,
      variant: "destructive",
      show: (user) => user.status !== "Activo",
    },
  ]

  // Handlers
  function handleView(user: User) {
    console.log("Ver usuario:", user)
  }

  function handleEdit(user: User) {
    console.log("Editar usuario:", user)
  }

  function handleDelete(user: User) {
    console.log("Eliminar usuario:", user)
  }

  function handleRowClick(user: User) {
    console.log("Click en fila:", user)
  }


  return <ResponsiveTable cardFields={[]} cardActions={cardActions} id={''} table={table} columns={table.getAllFlatColumns()} containerClassName={containerClassName} className={className} isLoading={isLoading} />;
  // return <DataTable table={table} columns={table.getAllFlatColumns()} containerClassName={containerClassName} className={className} isLoading={isLoading} />;
}

export default ContextDataTable;
