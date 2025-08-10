import type { FilterState } from '@/components/DynamicTable/table.context';
import { useGeneral } from '@/store/generalStore.store';
import type { ColumnSort, VisibilityState } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

type TableState<T> = {
  filters: FilterState<T>;
  sorting: ColumnSort[];
  order: string[] | undefined;
  columnVisibility: VisibilityState | undefined;
};

export interface CustomStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem?: (key: string) => void; // opcional
}

export type PersistConfig = {
  storage?: CustomStorage; // por defecto localStorage
};

const initialState = { filters: [], sorting: [], order: [], columnVisibility: {} };

export function usePersistentTableState<T>(tableKey?: string, defaultState: Partial<TableState<T>> = initialState, customStorage?: CustomStorage) {
  if (!Boolean(tableKey)) return { ...defaultState };

  const storage = customStorage || localStorage;
  const appUserInfo = useGeneral(state => state.appUserInfo);

  const keys = useMemo(() => {
    if (appUserInfo) {
      return {
        filters: `${appUserInfo?.user?.id}_tableFilters_${tableKey}`,
        sorting: `${appUserInfo?.user?.id}_tableSorting_${tableKey}`,
        order: `${appUserInfo?.user?.id}_tableOrder_${tableKey}`,
        columnVisibility: `${appUserInfo?.user?.id}_tableColumnVisibility_${tableKey}`,
      };
    }
  }, [appUserInfo]);

  // Filters
  const [filters, setFilters] = useState<FilterState<T>>(() => {
    if (!keys) return defaultState.filters;
    const stored = storage.getItem(keys.filters);
    return stored ? JSON.parse(stored) : defaultState.filters || [];
  });

  // Sorting
  const [sorting, setSorting] = useState<ColumnSort[]>(() => {
    if (!keys) return defaultState.sorting;
    const stored = storage.getItem(keys.sorting);
    return stored ? JSON.parse(stored) : defaultState.sorting || [];
  });

  // Order
  const [order, setOrder] = useState<string[] | undefined>(() => {
    if (!keys) return defaultState.order;
    const stored = storage.getItem(keys.order);
    return stored ? JSON.parse(stored) : defaultState.order || [];
  });

  // Column Visibility
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState | undefined>(() => {
    if (!keys) return defaultState.columnVisibility;
    const stored = storage.getItem(keys.columnVisibility);
    return stored ? JSON.parse(stored) : defaultState.columnVisibility || {};
  });

  // Effects para persistir cambios automáticamente
  useEffect(() => {
    if (keys) {
      storage.setItem(keys.filters, JSON.stringify(filters));
    }
  }, [keys, filters, storage]);

  useEffect(() => {
    if (keys) storage.setItem(keys.sorting, JSON.stringify(sorting));
  }, [keys, sorting, storage]);

  useEffect(() => {
    if (keys) storage.setItem(keys.order, JSON.stringify(order));
  }, [keys, order, storage]);

  useEffect(() => {
    if (keys) storage.setItem(keys.columnVisibility, JSON.stringify(columnVisibility));
  }, [keys, columnVisibility, storage]);

  // Reset general del estado de tabla
  const resetTableState = useCallback(() => {
    if (keys) {
      Object.values(keys).forEach(key => storage.removeItem && storage.removeItem(key));

      setFilters(defaultState.filters || []);
      setSorting(defaultState.sorting || []);
      setOrder(defaultState.order || []);
      setColumnVisibility(defaultState.columnVisibility || {});
    }
  }, [keys, defaultState]);

  return {
    filters,
    setFilters,
    sorting,
    setSorting,
    order,
    setOrder,
    columnVisibility,
    setColumnVisibility,
    resetTableState,
  };
}
