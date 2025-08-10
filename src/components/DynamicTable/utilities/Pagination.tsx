import { TablePagination } from "@/components/DataTable/TablePagination";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useTableContext } from "../table.context";
import type { MetadataPagination } from "@/domain/graphql";

/*------ components ------*/

export const GraphPaginationWrapper = () => {
  const { tablePagination, metaPagination, disableNext, disablePrevius, setPage } = useGraphPagination();

  const { pageIndex = 0, pageSize = 0 } = tablePagination || {};
  const { totalItems } = metaPagination;

  const totalPages = useMemo(() => Math.ceil(totalItems ?? 0 / pageSize), [totalItems, pageSize]);

  const goToPage = (page: number) => {
    const newPageIndex = page - pageIndex;
    setPage(newPageIndex); // `setPage` asume que recibe desplazamiento relativo (+1 / -1)
  };

  if (!tablePagination || !metaPagination) return null;

  return (
    <TablePagination
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalItems={totalItems || 0}
      disableNext={disableNext}
      disablePrevious={disablePrevius}
      disableFirst={pageIndex <= 1}
      disableLast={pageIndex >= totalPages / pageSize}
      onNext={() => setPage(1)}
      onPrevious={() => setPage(-1)}
      onFirst={() => setPage(1 - pageIndex)}
      onLast={() => setPage((metaPagination?.totalPages ?? 0) - 1)}
      onSelectPage={page => goToPage(page)}
    />
  );
};

export const Paginate = () => {
  const { tablePagination, metaPagination, disableNext, disablePrevius, setPage } = useGraphPagination();

  if (!tablePagination || !metaPagination) return null;

  return (
    <>
      <p className='font-medium'>
        {(tablePagination.pageIndex - 1) * tablePagination.pageSize + 1}-{tablePagination.pageSize * tablePagination.pageIndex} de {metaPagination.totalItems}
      </p>

      <div className='inline-flex items-center gap-2 [&>svg]:cursor-pointer'>
        <ArrowLeft className={cn('h-4 w-4 text-muted transition-colors', { 'pointer-events-none text-muted-light_C7': disablePrevius })} onClick={() => setPage(-1)} />
        <ArrowLeft className={cn('-rotate-180 h-4 w-4 text-muted transition-colors', { 'pointer-events-none text-muted-light_C7': disableNext })} onClick={() => setPage(1)} />
      </div>
    </>
  );
};

/*------ hooks ------*/

const useGraphPagination = () => {
  // hooks
  const [table] = useTableContext(state => state.table);
  const [metaPagination] = useTableContext(state => state.metaPagination as MetadataPagination);
  const [tablePagination] = useTableContext(state => state.table?.getState().pagination);
  useTableContext(state => state.pagination);

  const disableNext = tablePagination?.pageIndex == metaPagination?.totalPages || (metaPagination?.totalPages ?? 0) < 2;
  const disablePrevius = tablePagination?.pageIndex == 1;

  // functions
  const setPage = (direction: number) => {
    if (tablePagination && metaPagination) {
      const pageIndex = tablePagination.pageIndex + direction;
      table?.setPagination({ pageIndex, pageSize: tablePagination.pageSize });
    }
  };

  return { tablePagination, metaPagination, disableNext, disablePrevius, setPage };
};
