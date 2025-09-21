import { appFetcher } from '@/domain/api/api.config';
import { CreateCardFullDocument, type CreateCardFullMutation, type CreateCardFullMutationVariables } from '@/domain/graphql';

export const createExampleData = async (variables: CreateCardFullMutationVariables) => {
	const data = await appFetcher<CreateCardFullMutation>(CreateCardFullDocument, variables);

	return data;
};

