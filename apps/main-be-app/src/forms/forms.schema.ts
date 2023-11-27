import { z } from 'zod';
import { RequestModel } from '../requests/requests.schema';

export const FormModel = z.object({
  id: z.number(),
  key: z.string().uuid(),
  name: z.string().min(1).max(255),
  requestId: z.number(),
  uiSchema: z.object({}),
  dataSchema: z.object({}),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
});

export const CreateForm = FormModel.omit({
  id: true,
  key: true,
  requestId: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
}).merge(z.object({ requestKey: z.string().uuid() }));
export const FormRelations = z.object({ request: RequestModel });
export const FormWithRelations = FormModel.merge(FormRelations);

export type FormModel = z.infer<typeof FormModel>;
export type CreateFormModel = z.infer<typeof CreateForm>;
export type FormRelations = z.infer<typeof FormRelations>;

export type FormColumns = keyof FormModel;
export type FormIncludes = keyof FormRelations;
