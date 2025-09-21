import { ResponsiveTable } from '../DataTable/ResponsiveTable';
import { useTableContext } from './table.context';
import { extractCardFields } from '../DataTable/ResponsiveTable/utils';

/*-------- components --------*/

function ContextDataTable({ className, containerClassName }: { className?: string; containerClassName?: string }) {
  const [table] = useTableContext(state => state.table);
  const [isLoading] = useTableContext(state => state.isLoading);

  const [data] = useTableContext(state => state.data);
  const [actionComponent] = useTableContext(state => state.actionComponent);
  const cardFields = extractCardFields(table?.getAllColumns() ?? [], true)

  // Determinar dinámicamente el campo principal y secundario usando cardFields


  if (!table) return <>Sin provider tonoto 💀</>;

  return <ResponsiveTable
    actionComponent={actionComponent}
    id={''}
    data={data}
    cardFields={cardFields}
    table={table}
    columns={table.getAllFlatColumns()}
    containerClassName={containerClassName}
    className={className}
    isLoading={isLoading}
    
  />;
  // return <DataTable table={table} columns={table.getAllFlatColumns()} containerClassName={containerClassName} className={className} isLoading={isLoading} />;
}

export default ContextDataTable;
