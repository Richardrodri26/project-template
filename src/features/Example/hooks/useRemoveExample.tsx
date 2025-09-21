import { useMutation } from '@tanstack/react-query';
import { removeExampleData } from '@/domain/useCases/Example/removeExampleData';
import type { RemoveCardsMutation, RemoveCardsMutationVariables } from '@/domain/graphql';

export const useRemoveExample = () => {
  const mutation = useMutation<RemoveCardsMutation, unknown, RemoveCardsMutationVariables>({
    mutationFn: (variables: RemoveCardsMutationVariables) => removeExampleData(variables),
  });

  return mutation;
};
