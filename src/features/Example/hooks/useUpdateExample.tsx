import { useMutation } from '@tanstack/react-query';
import { updateExampleData } from '@/domain/useCases/Example/updateExampleData';
import type { UpdateCardsMutation, UpdateCardsMutationVariables } from '@/domain/graphql';

/**
 * Hook que expone la mutation para actualizar los datos de ejemplo.
 * Uso: const mutation = useUpdateExample(); mutation.mutate(variables);
 */
export const useUpdateExample = () => {
	const mutation = useMutation<UpdateCardsMutation, unknown, UpdateCardsMutationVariables>({
		mutationFn: (variables: UpdateCardsMutationVariables) => updateExampleData(variables),
	});

	return mutation;
};

