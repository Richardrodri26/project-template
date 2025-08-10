import { z } from 'zod';

export const paginationSchema = z
  .object({
    pageIndex: z.preprocess(val => (val === null || val === undefined ? 0 : Number(val)), z.number().min(0)),
    pageSize: z.preprocess(val => (val === null || val === undefined ? 1 : Number(val)), z.number().min(1)),
  })
  .default({ pageIndex: 0, pageSize: 1 });

export const datesFilterSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export type dateFilterSchemaType = z.infer<typeof datesFilterSchema>;
