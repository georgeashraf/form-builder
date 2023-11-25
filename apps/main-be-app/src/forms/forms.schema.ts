import { z } from 'zod';

export const Form = z.object({
  id: z.number(),
  key: z.string().uuid(),
  name: z.string().min(1).max(255),
  formId: z.number(),
  uiSchema: z.object({}),
  dataSchema: z.object({}),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
});

export type Form = z.infer<typeof Form>;
