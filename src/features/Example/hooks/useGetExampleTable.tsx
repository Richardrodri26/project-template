import { useShallowEffect } from '@/hooks/useShallowEffect';
import type { WithQueryOptions } from '@/interfaces/TanstackQueryTypes';
import { useTableQueryVariables } from '@lib/SsrTable/cases/useGraphqlTable';
import { useQuery } from '@tanstack/react-query';

// esta funcion deberia venir de @domain/use-cases/Settings/WorkingHours/getExampleData

const getDataTable = (data: any) => {
  return {
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@example.com',
      },
    ],
    metaPagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
    },
  }
};

type responseType = Awaited<ReturnType<typeof getDataTable>>;

interface IUseGetExampleTable extends WithQueryOptions<responseType> {}

export const useGetExampleTable = ({ queryOptions }: IUseGetExampleTable) => {
  const { filters, pagination, sorting, setContext } = useTableQueryVariables<FindWorkingHoursOrderBy>();
  const queryData = useQuery({
    queryKey: ['getWorkingHours', filters, pagination, sorting],
    queryFn: async () =>
      await getWorkingHours({
        orderBy: sorting,
        pagination: pagination,
        where: filters,
      }),
    ...queryOptions,
  });

  useShallowEffect(() => {
    setContext(draft => {
      if (queryData.data) {
        draft.data = queryData.data.WorkingHours;
        draft.metaPagination = formatPaginationNewToOld(queryData.data.paginationWorkingHours);
      }
      draft.isLoading = queryData.isLoading;
    });
  }, [queryData.data, queryData.isLoading, queryData.isFetching]);

  return queryData;
};
