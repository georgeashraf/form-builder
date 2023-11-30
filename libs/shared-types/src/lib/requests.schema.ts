import { z } from 'zod';
import { FormModelSchema } from './forms.schema';

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
export const RequestRelations = z.object({ forms: z.array(FormModelSchema) });
export const RequestWithRelations = RequestModelSchema.merge(RequestRelations);

export type RequestModel = z.infer<typeof RequestModelSchema>;
export type CreateRequestType = z.infer<typeof CreateRequestSchema>;
export type RequestRelations = z.infer<typeof RequestRelations>;

export type RequestColumns = keyof Request;
export type RequestIncludes = keyof RequestRelations;
