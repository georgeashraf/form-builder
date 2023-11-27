import { z } from 'zod';
import { FormModel } from './forms.schema';

export const RequestModel = z.object({
  id: z.number(),
  key: z.string().uuid(),
  label: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  description: z.string().nullable(),
  creator: z.string().uuid(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
});
export const CreateRequest = RequestModel.omit({
  id: true,
  key: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});
export const RequestRelations = z.object({ forms: z.array(FormModel) });
export const RequestWithRelations = RequestModel.merge(RequestRelations);

export type RequestModel = z.infer<typeof RequestModel>;
export type CreateRequest = z.infer<typeof CreateRequest>;
export type RequestRelations = z.infer<typeof RequestRelations>;

export type RequestColumns = keyof Request;
export type RequestIncludes = keyof RequestRelations;
