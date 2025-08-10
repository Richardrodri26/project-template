import type { TC } from "@/interfaces/ReactComps";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTableContext } from "../table.context";
import type { filterProps } from "./tableUtilityTypes";
import { SearchWithDebounce } from "@/components/SearchWithDebounce";

export const NumberFilter: TC<filterProps> = ({ id = '' }) => {
  // hooks de contexto de tabla
  const [columnConfig, setTableContext] = useTableContext(state => state.table?.getColumn(id)!);
  // estado local para mensaje de error
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <p className='mb-1.5 font-medium text-sm text-tundora leading-5'>Escriba un número</p>
      <SearchWithDebounce
        // pasamos atributos al input para tipo numérico
        // inputProps={{ type: 'number', step: '1', min: '0' }}
        inputType='number'
        step={1}
        min={0}
        defaultValue={((columnConfig.getFilterValue() as any)?.data?.toString() ?? '') as string}
        callBack={value => {
          const text = String(value ?? '');

          if (text === '') {
            // limpiar filtro y error
            columnConfig.setFilterValue(undefined);
            setError(null);
          } else if (/^\d+$/.test(text)) {
            // valor válido: actualizar filtro y reiniciar paginación
            columnConfig.setFilterValue({
              data: Number(text),
              type: 'number',
            });
            setError(null);
            setTableContext(draft => {
              draft.pagination = {
                pageSize: draft?.pagination?.pageSize ?? 10,
                pageIndex: 1,
              };
            });
          } else {
            // valor no entero: mostrar error y NO actualizar filtro
            setError('Por favor, ingrese solo números enteros.');
          }
        }}
        className='w-full rounded-none font-medium text-med'
        iconLeft={<Search size={16} />}
      />

      {error && <p className='mt-1 text-red-500 text-sm'>{error}</p>}
    </>
  );
};
