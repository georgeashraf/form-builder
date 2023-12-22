import { z } from 'zod';
import { SchemaProperty, UISchema } from './types';

const uiSchemaSchema: z.ZodType<UISchema> = z.lazy(() =>
  z.object({
    key: z.string(),
    type: z.string(),
    name: z.string(),
    required: z.boolean().optional(),
    label: z.string().optional(),
    scope: z.string(),
    placeholder: z.string().optional(),
    elements: z.array(uiSchemaSchema),
  })
);

const types = z.enum([
  'object',
  'array',
  'string',
  'number',
  'boolean',
  'null',
]);
const dataSchemaProperty: z.ZodType<SchemaProperty> = z.lazy(() =>
  z.record(
    z.string(),
    z.object({
      type: types.or(z.array(types)),
      description: z.string().optional(),
      properties: dataSchemaProperty.optional(),
      items: z.object({
        type: types.or(z.array(types)),
      }),
      minItems: z.number().optional(),
      maxItems: z.number().optional(),
      uniqueItems: z.boolean().optional(),
      required: z.array(z.string()).optional(),
      enum: z.array(types).optional(),
      pattern: z.string().optional(),
      // multipleOf?: number;
      // maximum?: number;
      // exclusiveMaximum?: number;
      // minimum?: number;
      // exclusiveMinimum?: number;
      // maxLength?: number;
      // minLenght?: number;
      // dependentRequired?: {
      //   [key: string]: string[];
      // };
    })
  )
);
