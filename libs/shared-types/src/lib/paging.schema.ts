import { z } from 'zod';

export const PagingSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

export const Operator = z.enum([
  '$and',
  '$or',
  '$not',
  '$eq',
  '$ne',
  '$in',
  '$lt',
  '$lte',
  '$gt',
  '$gte',
  '$between',
  '$null',
  '$notNull',
]);

export const filter = z.object({
  op: Operator,
  value: z.union([z.string(), z.number()]),
});
