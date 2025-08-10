import type { TC } from "@/interfaces/ReactComps";
import { cn } from "@/lib/utils";
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { useTableContext } from "../table.context";
import type { orderProps } from "./tableUtilityTypes";
import { Button } from "@/components/ui/button";

type sortOptionWrapperProps = { isSorted: boolean; children: React.ReactNode; onClick: () => void };

/*------ components ------*/

export const OrderTh: TC<orderProps> = ({ id }) => {
  // hooks
  const { isSorted, changeFn } = useOrderTh(id);

  return (
    <div className='mb-2 flex flex-col border-navy-light-hover border-b pb-2 font-light text-sm' style={{ '--border-x-image': '16px' } as React.CSSProperties}>
      <SortOptionWrapper isSorted={isSorted === 'asc'} onClick={() => changeFn(false)}>
        <ArrowUpWideNarrow /> Ordenar ascendente
      </SortOptionWrapper>

      <SortOptionWrapper isSorted={isSorted === 'desc'} onClick={() => changeFn(true)}>
        <ArrowDownWideNarrow /> Ordenar descendente
      </SortOptionWrapper>
    </div>
  );
};

const SortOptionWrapper: TC<sortOptionWrapperProps> = ({ isSorted, children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={cn('dark:!text-blue w-full justify-start text-start text-sm', {
        'bg-navy-normal text-white': isSorted,
      })}
      variant={'ghost'}
    >
      {children}
    </Button>
    // <p
    //   onClick={onClick}
    //   className={cn('flex cursor-pointer items-center gap-1 py-1 transition-all hover:[border-image:conic-gradient(#F2F2F2_0_0)_fill_0//0_var(--border-x-image)]', {
    //     '[border-image:conic-gradient(#D5EBFB_0_0)_fill_0//0_var(--border-x-image)] hover:fill-white hover:text-white hover:[border-image:conic-gradient(#b91c1c_0_0)_fill_0//0_var(--border-x-image)]': isSorted,
    //   })}
    // >
    //   {children}
    // </p>
  );
};

/*------ controller ------*/

export const useOrderTh = (id: string) => {
  // hooks
  const [columnConfig, setTableContext] = useTableContext(state => state.table?.getColumn(id)!);
  useTableContext(state => state.table?.getState());
  useTableContext(state => state.sorting);

  const isSorted = columnConfig.getIsSorted(); // if the current column is being ordered

  // functions
  const changeFn = (desc?: boolean) => {
    columnConfig.toggleSorting(desc);
  };

  const clearSorting = () => {
    // columnConfig.clearSorting();
    setTableContext(draft => {
      draft.sorting = draft?.sorting?.filter(x => x.id !== columnConfig.id);
    });
  };

  return { isSorted, changeFn, clearSorting };
};
