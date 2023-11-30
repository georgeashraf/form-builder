import { z } from 'zod';

export const FormModelSchema = z.object({
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

export const CreateFormSchema = FormModelSchema.omit({
  id: true,
  key: true,
  requestId: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
}).merge(z.object({ requestKey: z.string().uuid() }));
export const FormRelationsSchema = z.object({
  request: z.object({
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
  }),
});
export const FormWithRelationsSchema =
  FormModelSchema.merge(FormRelationsSchema);

export type FormModelType = z.infer<typeof FormModelSchema>;
export type CreateFormModelType = z.infer<typeof CreateFormSchema>;
export type FormRelationsType = z.infer<typeof FormRelationsSchema>;

export type FormColumnsType = keyof FormModelType;
export type FormIncludesType = keyof FormRelationsType;
