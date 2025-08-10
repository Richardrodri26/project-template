import { paginationSchema } from '@/constants/schemas';
import { type PaginationState } from '@tanstack/react-table';
import { parseAsJson, useQueryState } from 'nuqs';
import { useEffect, useMemo } from 'react';

export const useGetTablePagination = (tableKey: string) => {
  // hooks
  const [paginationState, setPaginationState] = useQueryState(
    tableKey,
    parseAsJson<PaginationState>(value => paginationSchema.parse(value || {})),
  );

  // pagination query adaptation
  const queryPagination = useMemo(() => ({ skip: (paginationState?.pageIndex || 0) * (paginationState?.pageSize || 0), take: paginationState?.pageSize || 5 }), [paginationState?.pageIndex, paginationState?.pageSize]);

  const resetPagination = () => {
    setPaginationState({ pageIndex: 0, pageSize: 5 });
  };

  useEffect(() => {
    return () => {
      setPaginationState(null);
    };
  }, []);

  return { queryPagination, setPaginationState, resetPagination };
};
