import { appFetcher } from '@/domain/api/api.config';
import { UpdateCardsDocument, type UpdateCardsMutation, type UpdateCardsMutationVariables } from '@/domain/graphql';

/**
 * Ejecuta la mutation UpdateCards en el backend y devuelve el resultado.
 * @param variables - variables para la mutation (updateInput)
 */
export const updateExampleData = async (variables: UpdateCardsMutationVariables) => {
	const data = await appFetcher<{ updateCards: UpdateCardsMutation['updateCards'] }>(UpdateCardsDocument, variables);

	return data;
};



