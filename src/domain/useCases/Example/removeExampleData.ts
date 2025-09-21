import { appFetcher } from '@/domain/api/api.config';
import { RemoveCardsDocument, type RemoveCardsMutation, type RemoveCardsMutationVariables } from '@/domain/graphql';

/**
 * Ejecuta la mutation RemoveCards en el backend.
 */
export const removeExampleData = async (variables: RemoveCardsMutationVariables) => {
  const data = await appFetcher<RemoveCardsMutation>(RemoveCardsDocument, variables);

  return data;
};
