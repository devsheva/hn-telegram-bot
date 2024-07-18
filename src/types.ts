import {
  Context,
  Conversation,
  ConversationFlavor,
  SessionFlavor,
  z,
} from '@/deps.ts'

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

const storySchema = z.number()

export const storiesSchema = z.array(storySchema)

export type TopStories = z.infer<typeof storiesSchema>

export interface SessionData {
  preferences: string[]
}

export type PreferencesContext =
  & Context
  & SessionFlavor<SessionData>
  & ConversationFlavor

export type ConversationContext = Conversation<PreferencesContext>

const safetyRatingSchema = z.object({
  category: z.enum([
    'HARM_CATEGORY_UNSPECIFIED',
    'HARM_CATEGORY_DEROGATORY',
    'HARM_CATEGORY_TOXICITY',
    'HARM_CATEGORY_VIOLENCE',
    'HARM_CATEGORY_SEXUAL',
    'HARM_CATEGORY_MEDICAL',
    'HARM_CATEGORY_DANGEROUS',
    'HARM_CATEGORY_HARASSMENT',
    'HARM_CATEGORY_HATE_SPEECH',
    'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    'HARM_CATEGORY_DANGEROUS_CONTENT',
  ]),
  probability: z.enum([
    'HIGH',
    'MEDIUM',
    'LOW',
    'NEGLIGIBLE',
    'HARM_PROBABILITY_UNSPECIFIED',
  ]),
  blocked: z.boolean().optional(),
})

const citationMetadataSchema = z.object({
  citationSources: z.array(
    z.object({
      'startIndex': z.number().int().optional(),
      'endIndex': z.number().int().optional(),
      'uri': z.string().optional(),
      'license': z.string().optional(),
    }),
  ),
})

const contentSchema = z.object({
  parts: z.array(
    z.object({
      text: z.string().optional(),
      inlineData: z.object({
        mimeType: z.string(),
        data: z.string().base64(),
      }).optional(),
    }),
  ),
  role: z.enum([
    'user',
    'model',
  ]).optional(),
})

const generationConfigSchema = z.object({
  stopSequences: z.array(z.string()).optional(),
  candidateCount: z.number().int().optional(),
  maxOutputTokens: z.number().int().optional(),
  temperature: z.number().int().optional(),
  topP: z.number().int().optional(),
  responseMimeType: z.enum([
    'application/json',
    'text/plain',
  ]).optional().default('application/json'),
  responseSchema: z.object({}).optional(),
  topK: z.number().int().optional(),
})

export const responseSchema = {
  type: 'object',
  properties: {
    storyIds: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
}
const requestContentSchema = z.object({
  contents: z.array(contentSchema),
  generationConfig: generationConfigSchema,
})

export type RequestContent = z.infer<typeof requestContentSchema>

const candidateSchema = z.object({
  content: contentSchema,
  finishReason: z.enum(
    [
      'FINISH_REASON_UNSPECIFIED',
      'STOP',
      'MAX_TOKENS',
      'SAFETY',
      'RECITATION',
      'OTHER',
    ],
  ).default('FINISH_REASON_UNSPECIFIED'),
  safetyRatings: z.array(safetyRatingSchema),
  citationMetadata: citationMetadataSchema.optional(),
  tokenCount: z.number().int().optional(),
  index: z.number().int().optional(),
})
const promptFeedbackSchema = z.object({
  blockReason: z.enum([
    'BLOCK_REASON_UNSPECIFIED',
    'SAFETY',
    'OTHER',
  ]).optional(),
  safetyRatings: z.array(safetyRatingSchema),
})

const usageMetadataSchema = z.object({
  promptTokenCount: z.number(),
  candidatesTokenCount: z.number(),
  totalTokenCount: z.number(),
})

const generateContentResponseSchema = z.object({
  candidates: z.array(
    candidateSchema,
  ),
  promptFeedback: promptFeedbackSchema.optional(),
  usageMetadata: usageMetadataSchema,
})

export const filteredContentSchema = generateContentResponseSchema.pick(
  {
    candidates: true,
  },
)
