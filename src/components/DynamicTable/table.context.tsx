import { usePersistentTableState } from "@/hooks/usePersistentTableState";
import { useShallowEffect } from "@/hooks/useShallowEffect";
import { type TableOptions, type Table, type ColumnSort, type PaginationState, type RowSelectionState, type VisibilityState, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { type ReactNode, useEffect } from "react";
import { useOrderAndVisibilityColumns, useSortingGrahpCase, useRowSelectionTable, useFilteringGrahpCase, usePaginationGrahpCase } from "./cases/useGraphqlTable";
import type { dateFilterValue } from "./utilities/tableUtilityTypes";
import createCustomerStore from "@/lib/customeContext";


/*------ config ------*/
type dataTable = Record<string, any>;
export type basicFilterConfig<T = dataTable> = { [K in keyof T]: { id: K; value: T[K] } }[keyof T]; // for single textField
export type customFilterConfig<T = dataTable> = { [K in keyof T]: { id: K; value: { data: T[K]; type: 'number' | (string & {}) } } }[keyof T]; // for single textField
export type betweenFilterConfig<T = dataTable> = { id: keyof T; value: dateFilterValue }; // for dates or amount fields
export type twoFilterConfig<T = dataTable> = { id: keyof T; value: [basicFilterConfig<T>, basicFilterConfig<T>] }; // for dates or amount fields

type tableOptions<T> = Pick<TableOptions<T>, 'columns'> & { data?: T[]; metaPagination?: any; leftPinningList?: Array<keyof T>; tableKey?: string };
export type FilterState<T> = Array<basicFilterConfig<T> | twoFilterConfig<T> | betweenFilterConfig<T> | customFilterConfig<T>>;

type tableStateType<T = dataTable> = {
  table?: Table<T>;
  sorting: ColumnSort[];
  filters: FilterState<T>;
  data?: T[];
  metaPagination?: any;
  filtersMenu?: boolean;
  secundaryView?: boolean;
  pagination: PaginationState;
  checkData?: RowSelectionState;
  enableMultiRowSelection: boolean;
  isLoading: boolean;
  order?: string[];
  columnVisibility?: VisibilityState;
  actionComponent?: (item: T) => ReactNode;
};

type dataTableProps<T = dataTable> = tableOptions<T> & {
  children: ReactNode;
  order?: string[];
  columnVisibility?: VisibilityState;
  sorting?: (ColumnSort & { id: keyof T })[];
  filters?: FilterState<T>;
  pagination?: PaginationState;
  enableMultiRowSelection?: boolean;
  leftPinningList?: Array<keyof T>;
  tableKey?: string;

  actionComponent?: (item: T) => ReactNode;
};

export const { Provider, useSelectorContext: useTableContext } = createCustomerStore<tableStateType<dataTable>>({
  sorting: [],
  filters: [],
  order: [],
  columnVisibility: {},
  pagination: { pageIndex: 1, pageSize: 50 },
  filtersMenu: false,
  secundaryView: false,
  enableMultiRowSelection: true,
  isLoading: false,
});

/*------ context ------*/

export function SsrTableProvider<T extends dataTable = dataTable>({ children, pagination = { pageIndex: 1, pageSize: 10 }, metaPagination = {}, enableMultiRowSelection = true, actionComponent, ...res }: dataTableProps<T>) {
  const tableKey = res.tableKey;
  const defFilters = res.filters ?? [];
  const defSorting = res.sorting ?? [];
  const defOrder = res.order ?? [];
  const defColumnVisibility = res.columnVisibility ?? {};

  const { filters, sorting, order, columnVisibility } = usePersistentTableState<T>(tableKey, { filters: defFilters, sorting: defSorting, order: defOrder, columnVisibility: defColumnVisibility });

  return (
    <Provider defaultValue={{ actionComponent, sorting, filtersMenu: false, secundaryView: false, pagination, metaPagination, filters, enableMultiRowSelection, order, columnVisibility } as tableStateType<dataTable>}>
      {children}
      <SsrUseCases {...res} />
    </Provider>
  );
}

function SsrUseCases<T = dataTable>({ data, leftPinningList, columns, tableKey, ...props }: tableOptions<T>) {
  // hooks
  const [tableData, setContext] = useTableContext(s => (s.data ?? data) as T[]);
  const [enableMultiRowSelection] = useTableContext(s => s.enableMultiRowSelection);
  const { setFilters, setSorting: setPersistentSorting, setOrder, setColumnVisibility } = usePersistentTableState<dataTable>(tableKey);

  // cases
  const { order, columnVisibility, onOrderChange, onVisibilityChange } = useOrderAndVisibilityColumns();
  const { sorting, setSorting } = useSortingGrahpCase();
  const { rowSelection, onRowSelectionChange } = useRowSelectionTable();
  const { columnFilters, setFiltering } = useFilteringGrahpCase();
  const { pagination, setPagination } = usePaginationGrahpCase();

  // effects
  useEffect(() => {
    if (setFilters) setFilters(columnFilters);
  }, [columnFilters]);

  useEffect(() => {
    if (setPersistentSorting) setPersistentSorting(sorting);
  }, [sorting]);

  useEffect(() => {
    if (setOrder) setOrder(order);
  }, [order]);

  useEffect(() => {
    if (setColumnVisibility) setColumnVisibility(columnVisibility);
  }, [columnVisibility]);

  // table configuration
  const table = useReactTable<T>({
    columns,
    data: tableData || [],

    onSortingChange: setSorting,
    onColumnOrderChange: onOrderChange,
    onColumnFiltersChange: setFiltering,
    onColumnVisibilityChange: onVisibilityChange,

    onRowSelectionChange: onRowSelectionChange,
    onPaginationChange: setPagination,

    state: { sorting, columnFilters, pagination, rowSelection, columnPinning: { left: leftPinningList as string[] }, columnVisibility: columnVisibility ?? {}, columnOrder: order ?? [] },
    getCoreRowModel: getCoreRowModel(),

    manualSorting: true,
    manualFiltering: true,
    debugTable: true,
    enableMultiSort: false,
    autoResetPageIndex: false,
    enableMultiRowSelection,
    ...props,
  });

  //settingData
  useShallowEffect(() => {
    const newTable = Object.assign({}, table) as Table<dataTable>;
    setContext(draft => {
      draft.data = (tableData ?? []) as dataTable[];
      draft.table = newTable;
    });
  }, [tableData, rowSelection, order, columnVisibility]);

  return null;
}
