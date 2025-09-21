import { environments } from '@/lib/environments';
import { type DocumentNode } from 'graphql';
import { type OperationVariables } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { toast } from 'sonner';

export const publicGraph = new GraphQLClient(environments().VITE_URL_BACKEND_API + 'graphql');

export async function appFetcher<T>(query: DocumentNode, variables?: OperationVariables) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlZjFkYWExLTA4OWUtNGZkYi1hZTQ3LTk0YTA2YThkNzYyMiIsImhhc0F1dGhvcml6ZWQiOnRydWUsImlhdCI6MTc1ODQ4MjczNywiZXhwIjoxNzU4NTY5MTM3fQ.hOc9IeaSa65JaBCUvmYHb6Ztufe76lyd6iWSx9TRvC8';

  if (token) {
    publicGraph.setHeader('Authorization', 'Bearer ' + token);
  }

  try {
    const response: T = await publicGraph.request<T>(query, variables);
    return response;
  } catch (error) {
    const reqRes = JSON.parse(JSON.stringify(error));
    toast.error(reqRes.response.errors?.[0]?.message || '¡Oops, hubo un error!');
    return Promise.reject({ name: reqRes?.response?.errors?.[0]?.message });
  }
}
