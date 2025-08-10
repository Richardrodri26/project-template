import { SearchWithDebounce } from "@/components/SearchWithDebounce";
import { useMemo } from "react";
import { useTableContext, type basicFilterConfig } from "../table.context";

/*------ config ------*/

type quickSearchProps<T extends Record<string, any>> = { keys: Array<keyof T> };

/*------ components ------*/

export function QuickSearchFilter<T extends Record<string, any>>({ keys, ...res }: quickSearchProps<T>) {
  // hooks
  const [columnFilters = [], setContext] = useTableContext(s => s.filters);

  const defaultValue = useMemo(() => {
    return columnFilters.find(column => column.id === keys[0])?.value as string;
  }, []);

  // functions
  const setSearch = (value: any) => {
    const filters = new Map(columnFilters.map(col => [col.id, col]));
    filters.set(keys.join('&'), { id: keys.join('&'), value });

    const newFilters = Array.from(filters.values()) as basicFilterConfig[];

    setContext(draft => {
      draft.filters = newFilters;
      draft.pagination!.pageIndex = 1;
    });
  };

  return (
    <SearchWithDebounce
      defaultValue={defaultValue}
      containerClass='bg-concrete md:w-[410px]'
      callBack={value => {
        setSearch(value);
      }}
      {...res}
    />
  );
}
