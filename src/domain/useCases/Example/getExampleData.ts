import { appFetcher } from "@/domain/api/api.config";
import { CardsDocument, type Cards, type FindCardOrderBy, type FindCardWhere, type MetadataPagination, type Pagination } from "@/domain/graphql";

export const getExampleData = async (variables: {
  orderBy?: Array<FindCardOrderBy> | FindCardOrderBy;
  where?: FindCardWhere;
  pagination?: Pagination;
}) => {
  const data = await appFetcher<{ Cards: Cards[]; CardsCount: MetadataPagination }>(CardsDocument, variables);

  return data;
};
