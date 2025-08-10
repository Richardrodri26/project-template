import { SearchWithDebounce } from "@/components/SearchWithDebounce";
import type { TC } from "@/interfaces/ReactComps";
import { Search } from "lucide-react";
import { useTableContext } from "../table.context";
import type { filterProps } from "./tableUtilityTypes";

/*------ components ------*/

export const TextFilter: TC<filterProps> = ({ id = '' }) => {
  // hooks
  const [columnConfig, setTableContext] = useTableContext(state => state.table?.getColumn(id)!);

  return (
    <>
      <p className='mb-1.5 font-medium text-sm text-tundora leading-5'>Escriba un carácter</p>

      <SearchWithDebounce
        defaultValue={(columnConfig.getFilterValue() ?? '') as string}
        callBack={value => {
          columnConfig.setFilterValue(value);
          setTableContext(draft => {
            draft.pagination = {
              pageSize: draft?.pagination?.pageSize ?? 10,
              pageIndex: 1,
            };
          });
        }}
        className='w-full rounded-none font-medium text-med'
        iconLeft={<Search size={16} />}
      />
    </>
  );
};
