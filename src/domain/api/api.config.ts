import { environments } from '@/lib/environments';
import { type DocumentNode } from 'graphql';
import { type OperationVariables } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { toast } from 'sonner';

export const publicGraph = new GraphQLClient(environments().VITE_URL_BACKEND_API + 'graphql');

export async function appFetcher<T>(query: DocumentNode, variables?: OperationVariables) {
  const token = '';

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
