import { useMutation } from '@tanstack/react-query';
import { createExampleData } from '@/domain/useCases/Example/createExampleData';
import type { CreateCardFullMutation, CreateCardFullMutationVariables } from '@/domain/graphql';

export const useCreateExample = () => {
  const mutation = useMutation<CreateCardFullMutation, unknown, CreateCardFullMutationVariables>({
    mutationFn: (variables: CreateCardFullMutationVariables) => createExampleData(variables),
  });

  return mutation;
};
