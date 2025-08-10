import { environments } from '@/lib/environments';
import { type DocumentNode } from 'graphql';
import { type OperationVariables } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { toast } from 'sonner';

export const publicGraph = new GraphQLClient(environments().VITE_URL_BACKEND_API + 'graphql');

export async function appFetcher<T>(query: DocumentNode, variables?: OperationVariables) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3ZGM1ZDliLTNlNzItNDhjZS1iNTNmLWUxOTNmN2QyMWQ0YiIsImhhc0F1dGhvcml6ZWQiOnRydWUsImlhdCI6MTc1NDg2MTY3MSwiZXhwIjoxNzU0OTQ4MDcxfQ.HfzlMtZRKkT3Ft5r_0HtwfVeqWS1Fm2iBGZ-Wwb9IN8';

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
