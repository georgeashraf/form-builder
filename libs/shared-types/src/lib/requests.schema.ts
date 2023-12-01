import { z } from 'zod';
import { filter, PagingSchema } from './paging.schema';

export const RequestModelSchema = z.object({
  id: z.number(),
  key: z.string().uuid(),
  label: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  description: z.string().min(0),
  creator: z.string().uuid(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
});
export const CreateRequestSchema = RequestModelSchema.omit({
  id: true,
  key: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});
export const RequestRelations = z.object({
  forms: z.array(
    z.object({
      id: z.number(),
      key: z.string().uuid(),
      name: z.string().min(1).max(255),
      requestId: z.number(),
      uiSchema: z.object({}),
      dataSchema: z.object({}),
      createdAt: z.date(),
      updatedAt: z.date(),
      publishedAt: z.date(),
    })
  ),
});
export const RequestWithRelations = RequestModelSchema.merge(RequestRelations);
export const RequestListingQuery = z
  .object({
    pagination: PagingSchema.optional(),
    filters: z.record(filter).optional(),
    selects: z
      .array(
        z.enum([
          'key',
          'label',
          'name',
          'description',
          'creator',
          'isPublished',
        ])
      )
      .optional(),
    includes: z.array(z.enum(['forms'])).optional(),
  })

export const requestRelationsMap = new Map<string, string>([['forms', 'form']]);

export type RequestModel = z.infer<typeof RequestModelSchema>;
export type CreateRequestType = z.infer<typeof CreateRequestSchema>;
export type RequestRelations = z.infer<typeof RequestRelations>;

export type RequestColumns = keyof RequestModel;
export type RequestIncludes = keyof RequestRelations;
export type RequestQueryType = z.infer<typeof RequestListingQuery>;
