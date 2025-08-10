import { useTableQueryVariables } from '@/components/DynamicTable/cases/useGraphqlTable';
import type { FindCardOrderBy } from '@/domain/graphql';
import { getExampleData } from '@/domain/useCases/Example/getExampleData';
import { useShallowEffect } from '@/hooks/useShallowEffect';
import type { WithQueryOptions } from '@/interfaces/TanstackQueryTypes';
import { useQuery } from '@tanstack/react-query';


type responseType = Awaited<ReturnType<typeof getExampleData>>;

interface IUseGetExampleTable extends WithQueryOptions<responseType> {}

export const useGetExampleTable = ({ queryOptions }: IUseGetExampleTable) => {
  const { filters, pagination, sorting, setContext } = useTableQueryVariables<FindCardOrderBy>();
  const queryData = useQuery({
    queryKey: ['getExampleData', filters, pagination, sorting],
    queryFn: async () =>
      await getExampleData({
        orderBy: sorting,
        pagination: pagination,
        where: filters,
      }),
    ...queryOptions,
  });

  useShallowEffect(() => {
    setContext(draft => {
      if (queryData.data) {
        draft.data = queryData.data.Cards;
        draft.metaPagination = queryData.data.CardsCount;
      }
      draft.isLoading = queryData.isLoading;
    });
  }, [queryData.data, queryData.isLoading, queryData.isFetching]);

  return queryData;
};
