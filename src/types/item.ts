import { z } from '@deps'

export const itemSchema = z.object({
  id: z.number(),
  deleted: z.optional(z.boolean()),
  type: z.optional(z.string()),
  by: z.optional(z.string()),
  time: z.optional(z.number()),
  text: z.optional(z.string()),
  dead: z.optional(z.boolean()),
  parent: z.optional(z.number()),
  poll: z.optional(z.unknown()),
  kids: z.optional(z.unknown()),
  url: z.optional(z.string()),
  score: z.optional(z.number()),
  title: z.optional(z.string()),
  parts: z.optional(z.unknown()),
  descendants: z.optional(z.number()),
}).nullable()

export type Item = z.infer<typeof itemSchema>
