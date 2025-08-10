import { functionalUpdate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { useTableContext } from '../table.context';
import type { ColumnFiltersState, OnChangeFn, PaginationState, RowSelectionState, SortingState, VisibilityState } from '@tanstack/react-table';
import { ACTION_COLUMN_ID } from '@/constants/TableConstants';
import { OrderTypes, type DateFilter, type NumberFilter, type Pagination, type StringFilter } from '@/domain/graphql';
import { useShallowEffect } from '@/hooks/useShallowEffect';

/**
 * utils hook than returns the sorting value and sorting function
 * -- this sorting is for mixin structure in graphql --
 * @returns
 */
export const useSortingGrahpCase = () => {
  // hooks
  const [sorting, setContext] = useTableContext(s => s.sorting);

  // sorting function. Single sorting
  const setSorting: OnChangeFn<SortingState> = updaterOrValue => {
    const newSort = functionalUpdate(updaterOrValue, sorting)[0];

    if (sorting.length === 0) {
      setContext(draft => {
        draft.sorting = [newSort];
      });
      return;
    }


    // const newSortingState = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
    const newSorting = sorting.reduce((accu, sort) => {
      if (sort.id === newSort.id) {
        switch (true) {
          case newSort.desc && !sort.desc:
            accu.push(newSort);
            break;
          case !newSort.desc && sort.desc:
            accu.push(newSort);
            break;
          default:
            break;
        }
        return accu;
      }
      accu.push(newSort);
      return accu;
    }, [] as SortingState);

    setContext(draft => {
      draft.sorting = newSorting;
    });
  };

  return { sorting, setSorting };
};

/**
 * utils hook than returns the filtering value and filtering function
 * -- this filtering is for mixin structure in graphql --
 * @returns
 */
export const useFilteringGrahpCase = () => {
  // hooks
  const [columnFilters, setContext] = useTableContext(s => s.filters);

  // filtering function. working on it 🚧
  const setFiltering: OnChangeFn<ColumnFiltersState> = useCallback(
    updaterOrValue => {
      const newFilt = functionalUpdate(updaterOrValue, columnFilters);
      setContext(draft => {
        draft.filters = newFilt as any[];
      });
    },
    [columnFilters],
  );

  return { columnFilters, setFiltering };
};

/**
 * utils hook than returns the pagination value and pagination function
 * -- this pagination is for mixin structure in graphql --
 * @returns
 */
export const usePaginationGrahpCase = () => {
  // hooks
  const [pagination, setContext] = useTableContext(s => s.pagination);

  // pagination function.
  const setPagination: OnChangeFn<PaginationState> = updaterOrValue => {
    const newPaginate = functionalUpdate(updaterOrValue, pagination);
    setContext(draft => {
      draft.pagination = newPaginate;
    });
  };

  return { pagination, setPagination };
};

/**
 * hook than feedback the current query with pagination, sorting and filtering from the current table
 * @returns
 */
export const useTableQueryVariables = <T extends object = {}>() => {
  const [currentPagination, setContext] = useTableContext(s => s.pagination);
  const [currentSorting] = useTableContext(s => s.sorting);
  const [currentFilters] = useTableContext(s => s.filters);

  const pagination = useMemo<Pagination>(() => {
    const { pageIndex, pageSize } = currentPagination;
    return { skip: (pageIndex - 1) * pageSize, take: pageSize };
  }, [currentPagination]);

  const sorting = useMemo(() => {
    console.log('currentSorting :>> ', currentSorting);

    return currentSorting.map(sort => {
      const order = sort.desc ? OrderTypes.Desc : OrderTypes.Asc;
      return buildNestedObject(sort.id, order);
    }) as [Record<keyof T, OrderTypes>];
  }, [currentSorting]);

  const filters = useMemo(() => {
    return currentFilters?.reduce(
      (acc, current) => {
        switch (true) {
          case typeof current.value == 'string': {
            if (current.id.includes('&')) {
              acc['_or'] = [groupOrFilters(current.id.split('&'), current.value)];
              return acc;
            }

            const filt: StringFilter = { _contains: current.value };

            const nestedFilter = buildNestedFilter(current.id, filt);
            Object.assign(acc, nestedFilter);

            return acc;
          }

          case typeof current.value == 'object' && ('minor' in current.value || 'major' in current.value): {
            if (current.value.major && current.value.minor) {
              const filt: DateFilter = {
                _between: [current.value.major, current.value.minor],
              };
              acc[current.id] = filt;
            }
            return acc;
          }

          case Array.isArray(current.value): {
            acc[current.id] = current.value;
            return acc;
          }

          case typeof current.value === 'boolean': {
            acc[current.id] = {
              _eq: current.value ? 1 : 0,
            };
            return acc;
          }

          case typeof current.value === 'number': {
            // acc[current.id] = {
            //   _eq: current.value,
            // };

            const filt: NumberFilter = { _eq: current.value };
            const nestedFilter = buildNestedFilter(current.id, filt);
            Object.assign(acc, nestedFilter);
            return acc;
          }

          case typeof current.value === 'object' && current.value.type === 'number': {
            // acc[current.id] = {
            //   _eq: current.value.data,
            // };

            const filt = {
              _eq: current.value.data,
            };
            const nestedFilter = buildNestedFilter(current.id, filt);
            Object.assign(acc, nestedFilter);
            return acc;
          }

          case typeof current.value === 'object' && current.value.type === 'dayOfTheWeek': {
            acc[current.id] = {
              _eq: current.value.data,
            };

            return acc;
          }
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }, [currentFilters]);

  return { pagination, sorting, filters, setContext };
};

/**
 * Hook that manage the row selection state
 * @returns
 */
export const useRowSelectionTable = () => {
  const [checkData, setContext] = useTableContext(state => state.checkData);

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = updaterOrValue => {
    const newRowSelection = functionalUpdate(updaterOrValue, checkData || {});

    setContext(draft => {
      draft.checkData = newRowSelection;
    });
  };

  // const memoizedFunc = useCallback(onRowSelectionChange, [checkData])

  return {
    rowSelection: checkData || {},
    onRowSelectionChange: onRowSelectionChange,
  };
};

/**
 * Hook that manage loading table state
 * @param isLoading
 */
export const useLoadingTable = (isLoading: boolean) => {
  const [_, setContext] = useTableContext(state => state.isLoading);

  useEffect(() => {
    setContext(state => {
      state.isLoading = isLoading;
    });
  }, [isLoading]);
};

export const useOrderAndVisibilityColumns = () => {
  const [order, setContext] = useTableContext(s => s.order);
  const [columnVisibility] = useTableContext(s => s.columnVisibility);
  const [table] = useTableContext(s => s.table);
  // const [state] = useTableContext(s => s.table?.getState());

  useShallowEffect(() => {
    if (table && (order?.length ?? 0) === 0) {
      const allColumns =
        table
          .getAllColumns()
          ?.map(column => column.id)
          .filter(id => id !== ACTION_COLUMN_ID) ?? [];

      setContext(draft => {
        draft.order = allColumns ?? [];
      });
    }

    if (table && Object.keys(columnVisibility ?? {}).length === 0) {
      const allColumns = table.getAllColumns()?.reduce((acc, column) => {
        acc[column.id] = true;
        return acc;
      }, {} as VisibilityState);

      setContext(draft => {
        draft.columnVisibility = allColumns ?? {};
      });
    }
  }, [table]);

  const onVisibilityChange: OnChangeFn<VisibilityState> = updaterOrValue => {
    const newVisibilityState = functionalUpdate(updaterOrValue, columnVisibility ?? {});

    setContext(draft => {
      draft.columnVisibility = newVisibilityState;
    });
  };

  const onOrderChange: OnChangeFn<string[]> = updaterOrValue => {
    const newOrderState = functionalUpdate(updaterOrValue, order ?? []);

    setContext(draft => {
      draft.order = newOrderState;
    });
  };

  return {
    onVisibilityChange,
    onOrderChange,
    order,
    columnVisibility,
  };
};

//#region functions

function groupOrFilters(ids: string[], value: string) {
  const currentId = ids.splice(0, 1);
  let acc: Record<string, any> = {
    [currentId[0]]: {
      _contains: value,
    },
  };
  if (ids.length) {
    acc['_or'] = [groupOrFilters(ids, value)];
  }
  return acc;
}

function buildNestedFilter(path: string, filt: any) {
  const keys = path.split('.');

  return keys.reduceRight((acc, key) => ({ [key]: acc }), filt);
}

function buildNestedObject(path: string, value: unknown): Record<string, any> {
  const keys = path.split('.');

  return keys.reduceRight((acc, key) => ({ [key]: acc }), value as any);
}
