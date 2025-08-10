import { datesFilterSchema, type dateFilterSchemaType } from '@/constants/schemas';
import type { StringFilter } from '@/domain/graphql';
import { type IdIdentifier } from '@tanstack/react-table';
import type { AccessorKeyColumnDefBase, GroupColumnDef } from '@tanstack/react-table';
import { type UseQueryStatesKeysMap, parseAsArrayOf, parseAsBoolean, parseAsJson, parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { toast } from 'sonner';

type columnArg = GroupColumnDef<any, unknown>[] | ((AccessorKeyColumnDefBase<any, string> & Partial<IdIdentifier<unknown, string>>) | (AccessorKeyColumnDefBase<any, number> & Partial<IdIdentifier<unknown, number>>))[];

/**
 * hook to get string filters from columns
 * @param columns
 * @returns
 */
export function useGetStringFilters<T extends Record<string, string | string[] | boolean>>(columns: columnArg) {
  const columnKeys = useMemo(() => {
    const queryStateMap: UseQueryStatesKeysMap = {};
    columns.forEach((column, firstIndex) => {
      if (isGroupedColumn(column)) {
        column.columns?.forEach((subColumn, index) => {
          if (subColumn.header && typeof subColumn.header != 'string') {
            if (subColumn.id && subColumn.meta?.filterType) {
              queryStateMap[subColumn.id] = parsers[subColumn.meta?.filterType!];
            } else {
              toast.error('La columna N° ' + index + ' no tiene un id o un tipo de filtro definido');
            }
          }
        });
      } else {
        if (column.header && typeof column.header != 'string') {
          if (column.id && column.meta?.filterType) {
            queryStateMap[column.id] = parsers[column.meta?.filterType!];
          } else {
            toast.error('La columna N° ' + firstIndex + ' no tiene un id o un tipo de filtro definido');
          }
        }
      }
    });
    return queryStateMap;
  }, []);

  const [queryStateMap] = useQueryStates(columnKeys);

  const whereFilters = useMemo(() => {
    const where: Record<string, StringFilter> = {};

    Object.keys(queryStateMap).forEach(key => {
      const value = queryStateMap[key];
      if (!value || value === null) return;
      where[key] = queryStateMap[key];
    });

    return where as T;
  }, [queryStateMap]);

  return { queryStateMap, whereFilters };
}

function isGroupedColumn(column: object | Array<any>): column is GroupColumnDef<any, unknown> {
  return !('length' in column) && column.hasOwnProperty('columns');
}

const parsers = {
  ['TextFilter']: parseAsString,
  ['StateFilter']: parseAsArrayOf(parseAsString),
  ['DateFilter']: parseAsJson<dateFilterSchemaType>(value => datesFilterSchema.parse(value)),
  ['BooleanFilter']: parseAsBoolean,
  ['NumberFilter']: parseAsString,
};
