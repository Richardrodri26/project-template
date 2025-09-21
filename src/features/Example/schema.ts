import z from "zod";



export const createExampleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export type CreateExampleSchemaType = z.infer<typeof createExampleSchema>

export const updateExampleSchema = createExampleSchema.extend({
  id: z.string(),
})

export type UpdateExampleSchemaType = z.infer<typeof updateExampleSchema>