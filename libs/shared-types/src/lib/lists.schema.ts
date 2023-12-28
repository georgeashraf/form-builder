import { z } from 'zod';
import { filter, PagingSchema } from './paging.schema';

export const ListModelSchema = z.object({
  id: z.number(),
  key: z.string().uuid(),
  group: z.string().min(1).max(255),
  label: z.string().max(255).optional(),
  value: z.string().max(255).optional(),
  jsonValue: z
    .array(
      z.object({
        label: z.string().min(1).max(255),
        value: z.string().min(1).max(255),
      })
    )
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateListSchema = ListModelSchema.omit({
  id: true,
  key: true,
  createdAt: true,
  updatedAt: true,
});

export const ListListingQuery = z.object({
  pagination: PagingSchema.optional(),
  filters: z.record(filter).optional(),
  selects: z
    .array(
      z.enum([
        'key',
        'label',
        'value',
        'group',
        'jsonValue',
        'createdAt',
        'updatedAt',
      ])
    )
    .optional(),
  includes: z.array(z.enum([''])).optional(),
});

export type ListQueryType = z.infer<typeof ListListingQuery>;
export type ListModelType = z.infer<typeof ListModelSchema>;
export type CreateListType = z.infer<typeof CreateListSchema>;
export type ListColumnsType = keyof ListModelType;
