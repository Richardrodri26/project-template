import { type UseQueryOptions } from '@tanstack/react-query';

export interface WithQueryOptions<TData = unknown> {
  queryOptions?: Omit<UseQueryOptions<TData, unknown, TData, any>, 'queryKey' | 'queryFn'>;
}
